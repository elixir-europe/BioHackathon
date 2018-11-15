import os

from flask import Flask, render_template, request, jsonify
from flask_paginate import Pagination, get_page_parameter

from web_server.sparql_wrapper import (
    execute_query,
    get_total_papers,
    get_properties)


class ScriptNameStripper(Flask):
    def __call__(self, environ, start_response):
        environ['SCRIPT_NAME'] = ''
        return (super(ScriptNameStripper, self)
                .__call__(environ, start_response))


app = ScriptNameStripper(__name__)


@app.route('/')
def index():
    properties = get_properties()
    return render_template(
        'index.html', properties=properties,
        data=None, query=None)


@app.route('/api/v1/property')
def get_property():
    return jsonify(get_properties())


@app.route('/query', methods=['POST', 'GET'])
def query():
    res = execute_query(request.args)
    page = request.args.get(get_page_parameter(), type=int, default=1)
    pagination = Pagination(
        page=page, found=len(res), total=get_total_papers(),
        record_name='papers', format_total=True, format_number=True,
        search=True, bs_version=4)
    res = list(res)[(int(page) * 10 - 10):(int(page) * 10)]
    return render_template(
        'index.html', data=res, properties=get_properties(),
        query=request.args.get('q'), pagination=pagination)


if __name__ == '__main__':
    host = os.environ.get('FLASK_HOST', '127.0.0.1')
    app.run(host=host, debug=True)
