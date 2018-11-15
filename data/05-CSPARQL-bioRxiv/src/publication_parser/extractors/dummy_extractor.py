from typing import Optional, Dict

from .base_extractor import SemanticExtractor


class DummyExtractor(SemanticExtractor):
    def parse(self, meta_info: Dict[str, str]) -> Optional[Dict[str, str]]:
        return {
            'dummy': [
                {'value': 4, 'uri': 8},
                {'value': 15, 'uri': 16}
            ]
        }
