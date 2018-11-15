from flask import Flask, render_template, request
from flask_paginate import Pagination, get_page_parameter

from web_server.sparql_wrapper import execute_query, get_total_papers, get_properties


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html', data=None, query=None)


@app.route('/query', methods=['POST', 'GET'])
def query():
    res = execute_query(request.args)
    page = request.args.get(get_page_parameter(), type=int, default=1)
    pagination = Pagination(
        page=page, found=len(res), total=get_total_papers(),
        record_name='papers', format_total=True, format_number=True,
        search=True, bs_version=4)
    return render_template(
        'index.html', data=res, properties=get_properties(),
        query=request.args.get('q'), pagination=pagination)


if __name__ == '__main__':
    app.run(debug=True)
