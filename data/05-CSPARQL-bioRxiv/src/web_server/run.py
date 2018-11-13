from flask import Flask, render_template, request

from sparql_wrapper import execute_query


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html', data=None)


@app.route('/query', methods=['POST'])
def query():
    res = execute_query(request.form)
    return render_template('index.html', data=res)


if __name__ == '__main__':
    app.run(debug=True)
