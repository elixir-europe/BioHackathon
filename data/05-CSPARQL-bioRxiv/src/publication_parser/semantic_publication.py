from typing import Dict, Any

from .extractors import get_extractors


def do_extraction(type_: str, func_input: Any) -> Dict[str, str]:
    data: Dict[str, str] = {}
    for ExtrClass in get_extractors(type_=type_):
        print(
            f'[{ExtrClass.__name__}] Extracting {type_}-information...',
            end=' ', flush=True)

        # extract information
        extr = ExtrClass()
        res = extr.parse(func_input)

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
    return data


class SemanticPublication:
    """Store semantic information of publication."""

    def __init__(self, attributes: Dict[str, str]) -> None:
        self.attributes = attributes

    @classmethod
    def from_url(cls, url: str) -> 'SemanticPublication':
        """Factory method."""
        meta_data = do_extraction('meta', url)
        semantic_data = do_extraction('semantic', meta_data)

        # TODO: handle key intersection
        data = {**meta_data, **semantic_data}
        pub = cls(data)

        if not pub.is_valid:
            raise RuntimeError('Invalid publication (has no DOI)')

        return pub

    @property
    def is_valid(self) -> bool:
        """A publication must have a DOI."""
        return 'doi' in self.attributes

    def __getattr__(self, name: str) -> str:
        return self.attributes[name]

    def __str__(self) -> str:
        return f'<{self.doi}>'
