from abc import ABC, abstractmethod

from typing import Optional, Dict


class BaseExtractor(ABC):
    pass


class MetaExtractor(BaseExtractor):
    @abstractmethod
    def parse(self, filename: str) -> Optional[Dict[str, str]]:
        """Extract semantic information from a given publication.

        Returns `None` if publication cannot be parsed,
        returns a dict otherwise
        """


class SemanticExtractor(BaseExtractor):
    @abstractmethod
    def parse(self, meta_info: Dict[str, str]) -> Optional[Dict[str, str]]:
        """Similar to `MetaExtractor`."""
