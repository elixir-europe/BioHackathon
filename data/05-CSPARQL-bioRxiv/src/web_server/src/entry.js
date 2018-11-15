import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

fetch("/api/v1/property").then(function(response) { return response.json(); }).then(function(json)
    {
        ReactDOM.render(<App searchItems={json}/>, document.getElementById('search-bar'));
    }
)
