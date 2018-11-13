from typing import Optional


class SemanticPublication:
    """Store semantic information of publication."""
    def __init__(self) -> None:
        self.doi: Optional[int] = None
        self.title: Optional[str] = None

    @classmethod
    def from_url(cls, url: str) -> 'SemanticPublication':
        """Factory method."""
        # TODO: actually parse information
        tmp = cls()

        tmp.doi = 123
        tmp.title = 'My awesome publication'

        return tmp

    def __str__(self) -> str:
        return f'"{self.title}" ({self.doi})'
