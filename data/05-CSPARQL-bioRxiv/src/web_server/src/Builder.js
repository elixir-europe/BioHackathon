import React, { Component } from 'react';

class Builder extends Component {
    render() {
        return (
          <div className="input-group mb-3 row">
            <div className="mx-auto my-auto">
              <h5>Query Interface</h5>
              {this.props.queryList.map((query, index) => {
                return (
                    <div className="d-flex" key={index}>
                        <select className="custom-select form-control" id="inputGroupSelect01" value={query[0]} onChange={event => this.props.updateQueryList(index, "type", event.target.value)}>
                            {this.props.searchItems.map((search_item, search_item_index) =>
                                <option key={search_item_index} value={search_item}>{search_item}</option>
                            )}
                        </select>
                        <input type="text" className="form-control search-query" value={query[1]} onChange={ event => this.props.updateQueryList(index, "text", event.target.value)} />
                        { index !== 0 && <button className="btn btn-outline-secondary" type="button" id="button" onClick={() => this.props.removeQueryList(index)}><i className="fa fa-minus"></i></button>}
                        { (index === this.props.queryList.length - 1) && <button className="btn btn-outline-secondary" type="button" id="button" onClick={() => this.props.addQueryList()}><i className="fa fa-plus"></i></button>}
                    </div>
                )
              })}
            </div>
          </div>
        );
      }
}

export default Builder;
