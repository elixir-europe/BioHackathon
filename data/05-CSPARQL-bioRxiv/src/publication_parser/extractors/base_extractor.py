import os
import random
from abc import ABC, abstractmethod

from typing import Optional, Dict


class BaseExtractor(ABC):
    @abstractmethod
    def parse(self, filename: str) -> Optional[Dict[str, str]]:
        """Extract semantic information from a given publication.

        Returns `None` if publication cannot be parsed,
        returns a dict otherwise
        """


class DummyExtractor(BaseExtractor):
    def parse(self, filename: str) -> Optional[Dict[str, str]]:
        return {
            'title': os.path.basename(filename),
            'doi': random.randint(0, 9999),
            'author': 'Mr. Cool',
            'year': random.randint(1600, 2019),
            'abstract': 'blabla',
            'url': 'example.org'
        }
