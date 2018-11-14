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

            # extract information
            extr = ExtrClass()
            res = extr.parse(url)

            # check success
            if res is None:
                print('No information extracted!')
                continue
            print('Success!')

            # check for key overlaps
            key_overlap = set(res.keys()) & set(data.keys())
            if len(key_overlap) > 0:
                print('[Warning] The following keys will be overridden:')
                for k in key_overlap:
                    print(f' > {k}')

            # update data
            data.update(res)

        return cls(data)

    def __getattr__(self, name: str) -> str:
        return self.attributes[name]

    def __str__(self) -> str:
        return f'"{self.title}" ({self.doi})'
