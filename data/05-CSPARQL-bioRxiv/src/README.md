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

### Twitter Stream Listener

A json file needs to be created for the twitter credentials with the structure below in the src directory. <br>

```json
{"ckey": "QQQ", "csecret": "ZZZ", "atoken": "YYY", "asecret": "XXX"}
```

Then, the stream listener can be started by typing the following command.

```bash
$ poetry run python publication_fetcher/twitter_stream.py
```

### Web-Server (query interface)

```bash
$ cd web_server
$ npm install
$ npm run-script build
```

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

Empty graph:
```bash
isql> sparql clear graph <graph_name>;
```
