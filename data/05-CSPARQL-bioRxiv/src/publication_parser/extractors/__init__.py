from typing import Iterator, Type

from .base_extractor import BaseExtractor


def get_extractors() -> Iterator[Type[BaseExtractor]]:
    for cls in BaseExtractor.__subclasses__():
        yield cls
