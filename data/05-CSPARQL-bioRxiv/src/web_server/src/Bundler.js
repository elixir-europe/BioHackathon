import React, { Component } from 'react';

const search_items = ["hasTitle", "hasAuthors", "hasYear", "hasUrl", "hasDOI", "hasAbstract"];

class Builder extends Component {
  render() {
    return (
      <div className="input-group mb-3 row">
        <div className="mx-auto my-auto">
        {this.props.queryList.map((query, index) => {
            return (
                <div className="d-flex" key={index}>
                    <select className="custom-select form-control" id="inputGroupSelect01" value={query[0]} style={{width: "300px"}} onChange={event => this.props.updateQueryList(index, "type", event.target.value)}>
                        {search_items.map((search_item, search_item_index) => 
                            <option key={search_item_index} value={search_item}>{search_item}</option>
                        )}
                    </select>
                    <input type="text" className="form-control" style={{width: "400px"}} name="q" value={query[1]} onChange={ event => this.props.updateQueryList(index, "text", event.target.value)} />
                    { index !== 0 && <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => this.props.removeQueryList(index)}>-</button>}
                    { (index === this.props.queryList.length - 1) && <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => this.props.addQueryList()}>+</button>}
                </div>
            )
        })}
        </div>
      </div>
    );
  }
}

export default Builder;
