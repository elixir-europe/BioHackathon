from typing import Iterator, Type

from .base_extractor import BaseExtractor, MetaExtractor, SemanticExtractor
from .biorxiv_extractor import BiorxivBasicExtractor
from .edam_extractor import EdamExtractor

__all__ = [BiorxivBasicExtractor, EdamExtractor]


def get_extractors(type_: str) -> Iterator[Type[BaseExtractor]]:
    if type_ == 'meta':
        for cls in MetaExtractor.__subclasses__():
            yield cls
    elif type_ == 'semantic':
        for cls in SemanticExtractor.__subclasses__():
            yield cls
    else:
        raise RuntimeError(f'Invalid extractor type: "{type_}"')
