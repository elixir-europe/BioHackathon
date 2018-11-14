from typing import Iterator, Type

from .base_extractor import BaseExtractor
from .biorxiv_extractor import BiorxivBasicExtractor

__all__ = [BiorxivBasicExtractor]


def get_extractors() -> Iterator[Type[BaseExtractor]]:
    for cls in BaseExtractor.__subclasses__():
        yield cls
