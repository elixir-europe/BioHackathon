from ontology_handler import add_entity
from publication_parser import SemanticPublication


def main() -> None:
    """Main entry point."""
    pub = SemanticPublication.from_url("https://www.biorxiv.org/content/early/2018/11/13/444828")
    add_entity(pub)


if __name__ == '__main__':
    main()
