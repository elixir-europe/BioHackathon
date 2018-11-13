from publication_parser import SemanticPublication
from ontology_handler import add_entity


def main() -> None:
    """Main entry point."""
    pub = SemanticPublication.from_url('i/dont/exists.tex')
    add_entity(pub)


if __name__ == '__main__':
    main()
