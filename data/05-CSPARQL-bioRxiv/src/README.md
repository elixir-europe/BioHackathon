# Manual

## Setup

### Installation

```bash
$ pip install poetry  # if not already done
$ poetry install
```

### Tests

```bash
$ poetry run flake8 --exclude=README.md
```

## Usage

### Web-Server (query interface)

```bash
$ poetry run python web_server/run.py
```

### Publication Parser (automatic ontology updates)

```bash
$ poetry run python main.py
```

### Ontology-Server

```bash
$ virtuoso-t -f  # in folder with virtuoso.ini
```

Don't forget to set the correct UPDATE-permissions.
