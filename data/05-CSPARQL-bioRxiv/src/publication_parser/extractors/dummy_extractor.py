import random

from typing import Optional, Dict

from .base_extractor import SemanticExtractor


class DummyExtractor(SemanticExtractor):
    def parse(self, meta_info: Dict[str, str]) -> Optional[Dict[str, str]]:
        return {
            'title': random.choice(list(meta_info.keys())),
            'doi': str(random.randint(0, 9999)),
            'author': 'Mr. Cool',
            'year': str(random.randint(1600, 2019)),
            'abstract': random.choice(list(meta_info.values())),
            'url': 'example.org'
        }
