# coding: utf-8

"""
Listens to the twitter data stream
"""

import json
import re

import requests
from tweepy import Stream, OAuthHandler
from tweepy.streaming import StreamListener
from ontology_handler import add_entity
from publication_parser import SemanticPublication

keys = json.loads(open('./twitter_credentials.json').read())


class Listener(StreamListener):
    """
    Listener class for the twitter stream
    """

    def on_data(self, data):
        try:
            json_data = json.loads(data)
            tweet_txt = json_data["text"]
            url = find_url(tweet_txt)
            if url:
                # print(url)
                first_url = url[0].split(' ')[0]
                valid_url = is_valid_url(first_url)
                if valid_url:
                    print(valid_url)
                    # print(json_data)
                    pub = SemanticPublication.from_url(valid_url)
                    add_entity(pub)
            return True
        except Exception as exp:
            print(type(exp))
            return True

    def on_error(self, status):
        print(status)


def find_url(string):
    """
    Finds and returns the first url contained
    """
    url = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\), ]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', string)
    return url


def is_valid_url(url):
    """
    Returns the redirected url if the url is valid
    Returns false otherwise.
    """
    try:
        request = requests.head(url, allow_redirects=True)
        if request.status_code == 200:
            return request.url
        else:
            return False
    except Exception as exp:
        print(type(exp))
        return False


auth = OAuthHandler(keys['ckey'], keys['csecret'])
auth.set_access_token(keys['atoken'], keys['asecret'])

auth = OAuthHandler(keys['ckey'], keys['csecret'])
auth.set_access_token(keys['atoken'], keys['asecret'])

twitter_stream = Stream(auth, Listener())
# twitterStream.filter(track=["publication", "paper"])
# TODO: use a dict here
# 324784754: anilbey's id
# 2360241721: phy_papers
# 2820113721: ChIP_seq
# 1949132852: biorxivpreprint
twitter_stream.filter(follow=["324784754", "2360241721", "2820113721", "1949132852"])
