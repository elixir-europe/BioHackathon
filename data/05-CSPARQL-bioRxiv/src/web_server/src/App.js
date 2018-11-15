import React, { Component } from 'react';
import './App.css';
import Builder from './Builder';

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "{{ query if query is not none }}",
      advancedQuery: "",
      advance: true,
      queryList: [["Title", ""]],
    };
    this.addQueryList = this.addQueryList.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateQueryList = this.updateQueryList.bind(this);
    this.removeQueryList = this.removeQueryList.bind(this);
    this.updateAdvancedQuery = this.updateAdvancedQuery.bind(this);
  }

  updateQueryList(index, type, content) {
    let queryList = this.state.queryList
    if (type === "type") {
      queryList[index][0] = content
    } else {
      queryList[index][1] = content
    }
    this.setState({queryList})
    this.updateAdvancedQuery();
  }

  removeQueryList(index) {
    this.setState({queryList: this.state.queryList.filter((n, i) => i !== index)});
    this.updateAdvancedQuery();
  }

  addQueryList() {
    this.setState({queryList: this.state.queryList.concat([["Title", ""]]) });
    this.updateAdvancedQuery();
  }

  updateValue(value) {
    this.setState({query: value});
  }

  updateAdvancedQuery() {
    let advancedQuery = this.state.queryList.filter(item => item[1] !== "").map(query => `${query[0]}:${query[1]}`).join(" ") ;
    this.setState({advancedQuery});
  }

  render() {
    return (
      <div className="App">
        <form className="form-group row" action="/query">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => this.setState({advance: !this.state.advance})}>Advanced</button>
            </div>
            <input type="text" className="form-control" name="q" placeholder="" aria-label="search field" disabled={this.state.advance} aria-describedby="button-addon1" value={this.state.advance ?  this.state.advancedQuery :this.state.query} onChange={event => this.updateValue(event.target.value)} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit" id="button-addon1"><i className="fa fa-search"></i></button>
            </div>
          </div>
          { this.state.advance && <Builder queryList={this.state.queryList} addQueryList={this.addQueryList} removeQueryList={this.removeQueryList} updateQueryList={this.updateQueryList} /> }
        </form>
      </div>
    );
  }
}

export default App;
