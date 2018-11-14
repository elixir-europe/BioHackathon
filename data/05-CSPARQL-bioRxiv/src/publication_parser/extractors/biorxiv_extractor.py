import re
from datetime import datetime
from typing import Optional, Dict

import requests
from lxml import html

from ontology_handler.operators import CONFIG
from . import MetaExtractor


class HighWireHTMLParser:

    def __init__(self) -> None:
        self.acknowledgement_xpath = '//div[contains(@class, "ack")]/p'
        self.abstract_xpath = '//div[@id="abstract-1"]'
        self.author_meta_name = 'citation_author'
        self.author_xpath = './meta[contains(@name, "citation_author")]'
        self.body_root_xpath = './/div[contains(@class, "fulltext-view")]'
        self.dateformat = '%Y-%m-%d'
        self.doi_xpath = 'head/meta[@name="citation_doi"]/@content'
        self.first_page_xpath = 'head/meta[@name="citation_firstpage"]/@content'
        self.headers_xpath = './h2|./h3|./h4|./h5|./h6|./h7|./h8'
        self.institution_meta_name = 'citation_author_institution'
        self.issue_xpath = 'head/meta[@name="citation_issue"]/@content'
        self.journal_issn_print_xpath = 'head/meta[@name="citation_issn"][2]/@content'
        self.journal_issn_paper_xpath = 'head/meta[@name="citation_issn"][1]/@content'
        self.journal_title_xpath = 'head/meta[@name="citation_journal_title"]/@content'
        self.journal_id_xpath = 'head/meta[@name="citation_journal_abbrev"]/@content'
        self.keywords_xpath = '//a[@class="kwd-search"]'
        self.last_page_xpath = 'head/meta[@name="citation_lastpage"]/@content'
        self.paragraphs_xpath = './p'
        self.publisher_xpath = 'head/meta[@name="DC.Publisher"]/@content'
        self.publication_date_xpath = 'head/meta[@name="DC.Date"]/@content'
        self.pubmed_id_xpath = 'head/meta[@name="citation_pmid"]/@content'
        self.section_class_to_skip = 'section-nav'
        self.section_xpath = './div[contains(@class, "section")]'
        self.title_xpath = 'head/title'
        self.volume_xpath = 'head/meta[@name="citation_volume"]/@content'
        self.xpath_sections_to_ignore = ['div[@class="contributors"]', 'div[@class="section abstract"]',
                                         'div[@class="section ack"]',
                                         'div[@class="section fn-group"]', 'div[@class="section ref-list"]',
                                         'div[@class="section acknowledgement"]']

        self.extracted_dict = {}

    def parse(self, html_content) -> Optional[Dict[str, str]]:
        self.parsed_html = html.fromstring(html_content)
        self.build_paper_metadata()
        self.build_journal_metadata()
        self.build_body()
        self.build_acknowledgement()
        self.build_references()
        return self.extracted_dict

    @staticmethod
    def get_names(author_complete_names):
        """
        Extract given names and surname from a single string

        :param author_complete_names: the string containing surname and given names
        :type author_complete_names:  str
        :return: a tuple of two strings: given_names and surname
        :rtype: tuple
        """
        given_names = " ".join(author_complete_names.split()[:-1]).strip()
        surname = " ".join(author_complete_names.split()[-1:]).strip()
        return given_names, surname

    def text_from_xpath(self, xpath):
        nodes = self.parsed_html.xpath(xpath)
        return get_text_from_all_nodes(nodes)

    def build_paper_metadata(self):
        self.extracted_dict['title'] = self.text_from_xpath(self.title_xpath) or None
        self.extracted_dict['pubmed_id'] = self.text_from_xpath(self.pubmed_id_xpath) or None
        self.extracted_dict['doi'] = self.text_from_xpath(self.doi_xpath) or None
        self.extracted_dict['abstract'] = self.text_from_xpath(self.abstract_xpath) or None
        self.extracted_dict['volume'] = self.text_from_xpath(self.volume_xpath) or None
        self.extracted_dict['issue'] = self.text_from_xpath(self.issue_xpath) or None
        self.extracted_dict['first_page'] = self.text_from_xpath(self.first_page_xpath) or None
        self.extracted_dict['last_page'] = self.text_from_xpath(self.last_page_xpath) or None
        publication_date_string = self.text_from_xpath(self.publication_date_xpath) or None
        try:
            publication_date = datetime.strptime(publication_date_string, self.dateformat)
        except (ValueError, TypeError):
            publication_date = None
        if publication_date is not None:
            self.extracted_dict['publication_date'] = publication_date
            self.extracted_dict['year'] = str(publication_date.year)
        head_node = self.parsed_html.find('head')
        self.build_authors(head_node)
        self.build_keywords()

    def build_authors(self, head_root):
        author = None
        affiliations = []
        authors = []
        affiliation_label = None
        for child in head_root.xpath(self.author_xpath):
            if child.get('name') == self.author_meta_name:
                if author is not None:
                    author['affiliations'] = affiliations
                    authors.append(author)
                author = {}
                author_complete_names = child.get('content')
                author['given_names'], author['surname'] = self.get_names(author_complete_names)
                if not author['surname'] and not author['given_names']:
                    author['surname'] = author_complete_names
                affiliations = []
                affiliation_label = None
            if child.get('name') == self.institution_meta_name:
                new_affilation_label = child.get('content')
                if new_affilation_label != affiliation_label:
                    affiliation_label = new_affilation_label
                    affiliations.append(affiliation_label)
        if author is not None:
            author['affiliations'] = affiliations
            authors.append(author)
        self.extracted_dict['authors'] = authors

    def build_keywords(self):
        self.extracted_dict['keywords'] = []
        for keyword_node in self.parsed_html.xpath(self.keywords_xpath):
            keyword = get_text_from_element(keyword_node, True)
            self.extracted_dict['keywords'].append(keyword)

    def build_journal_metadata(self):
        pass

    def build_body(self):
        pass

    def build_acknowledgement(self):
        pass

    def build_references(self):
        pass


def get_text_from_element(element, strip_spaces=False, separator=''):
    if element is None:
        return None
    result = ''
    for text in element.itertext():
        text = text.strip()
        result += text
        result += separator
    result = result.strip()
    if strip_spaces:
        result = re.sub('\s+', ' ', result)
    return result


def get_text_from_all_nodes(nodes):
    text = ""
    for node in nodes or []:
        if hasattr(node, 'is_attribute') and node.is_attribute:
            text += str(node)
        else:
            text += get_text_from_element(node, separator=' ')
        text += ' '
    text = re.sub(r"(\s)+", ' ', text)
    return text.strip()


class BiorxivBasicExtractor(MetaExtractor):

    def __init__(self) -> None:
        self.base_url = CONFIG['biorxiv']['base_url']
        self.user_agent = CONFIG['biorxiv']['user_agent']
        self.parser = HighWireHTMLParser()

    def parse(self, url: str) -> Optional[Dict[str, str]]:
        if not url.startswith(self.base_url):
            return None
        headers = {'User-Agent': self.user_agent,
                   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                   'Accept-Language': 'en-US,en;q=0.5', 'Accept-Encoding': 'gzip, deflate'}
        r = requests.get(url, stream=True, verify=False, headers=headers)
        if not r.ok:
            print(f"request to biorxiv failed with status {r.status_code}")
            print(r.reason)
            return None
        # html retrieved, we parse it
        html_content = r.content
        return self.parser.parse(html_content)
