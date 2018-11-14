from typing import Dict

from .extractors import get_extractors


class SemanticPublication:
    """Store semantic information of publication."""
    def __init__(self, attributes: Dict[str, str]) -> None:
        self.attributes = attributes

    @classmethod
    def from_url(cls, url: str) -> 'SemanticPublication':
        """Factory method."""
        data = {}
        for ExtrClass in get_extractors():
            print(
                f'[{ExtrClass.__name__}] Extracting information...',
                end=' ', flush=True)

            extr = ExtrClass()
            res = extr.parse(url)

            if res is None:
                print('Failure!')
                continue
            print('Success!')

            data.update(res)

        return cls(data)

    def __getattr__(self, name: str) -> str:
        return self.attributes[name]

    def __str__(self) -> str:
        return f'"{self.title}" ({self.doi})'
