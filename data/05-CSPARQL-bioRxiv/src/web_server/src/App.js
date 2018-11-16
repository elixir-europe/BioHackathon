import React, { Component } from 'react';
import Builder from './Builder';
import * as QueryString from 'query-string';

class App extends Component {
  constructor(props) {
    super();
    const searchItems = props.searchItems;

    const parsed = QueryString.parse(location.search);
    const query = parsed["q"] !== undefined ? parsed["q"] : "";
    let queryList = query.split(" ").map(item => {
      let items = item.split(":");
      if (searchItems.indexOf(items[0]) < 0) {
          items[0] = searchItems[0];
      }
      if (items[1] === undefined) {
          items[1] = "";
      }
      return items;
    });
    if (queryList.length === 0) {
      queryList = [[searchItems[0], ""]]; // Initialize with a default item.
    }

    this.state = {
      query,
      advance: true,
      queryList,
      searchItems
    };
    this.addQueryList = this.addQueryList.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateQueryList = this.updateQueryList.bind(this);
    this.removeQueryList = this.removeQueryList.bind(this);
    this.updateAdvancedQuery = this.updateAdvancedQuery.bind(this);
  }

  updateQueryList(index, type, content) {
    let queryList = this.state.queryList;
    if (type === "type") {
      queryList[index][0] = content;
    } else {
      queryList[index][1] = content;
    }
    this.setState({queryList});
    this.updateAdvancedQuery(queryList);
  }

  removeQueryList(index) {
    const queryList = this.state.queryList.filter((n, i) => i !== index);
    this.setState({queryList});
    this.updateAdvancedQuery(queryList);
  }

  addQueryList() {
    const queryList = this.state.queryList.concat([[this.props.searchItems[0], ""]]);
    this.setState({queryList});
    this.updateAdvancedQuery(queryList);
  }

  updateValue(value) {
    this.setState({query: value});
  }

  updateAdvancedQuery(queryList) {
    const advancedQuery = queryList.filter(item => item[1] !== "").map(query => `${query[0]}:${query[1]}`).join(" ");
    this.setState({query: advancedQuery});
  }

  render() {
    return (
      <div className="App">
        <form className="form-group row" action="/query">
          <div className="input-group mb-3">
            <input type="text" className="form-control" name="q" placeholder="use keywords such as: 'doi:10.1000/182'" aria-label="search field"  aria-describedby="button" value={this.state.query} onChange={event => this.updateValue(event.target.value)} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit" id="button"><i className="fa fa-search"></i></button>
            </div>
          </div>
          { this.state.advance && <Builder queryList={this.state.queryList} addQueryList={this.addQueryList} removeQueryList={this.removeQueryList} updateQueryList={this.updateQueryList} searchItems={this.props.searchItems} /> }
        </form>
      </div>
    );
  }
}


export default App;
