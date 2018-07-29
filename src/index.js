import React, { Component } from 'react';
import { render } from 'react-dom';

import { SearchField } from './SearchField'
import { BooksList } from './BooksList'

import './style.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'suggestion': [],
      'searchString': 'lord of the rings'
    }

    this.localSubmit = this.localSubmit.bind(this);
  }

  localSubmit(search) {
    this.state.searchString = search
    this.fetchData()
  }

  componentDidMount() {
    // initial data?
  }

  fetchData = () => {
    if (this.state.searchString.length < 3) {
      alert('too short string')
      return
    }

    const apiUrl = 'https://www.googleapis.com/books/v1/volumes'

    const params = {
      'q': encodeURIComponent(this.state.searchString),
      'orderBy': 'relevance',
      'maxResults': 20,
      'key': 'xxxxxxxxxxxxxxxxxx' // @TODO: hide API-KEY ?...
    }
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    fetch(apiUrl + '?q=' + queryString, {
      method: 'GET',
      dataType: 'JSON',
      headers: {
        'Content-Type': 'application/json',
        'charset': 'utf-8',
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {

        console.log((Array.isArray(data.items)))

        this.setState({
          suggestion: (Array.isArray(data.items)) ? data.items : []
          })
      })
      .catch((error) => {
        alert('API-loading error')
        console.log(error)
      })
  }

  render() {

    const list = this.state.suggestion.length ? (
      <BooksList suggestion={this.state.suggestion} />
    ) : (
      <div className="empty">list is empty</div>
    )

    return (
      <div>
        <h1>
          Search in <a href="https://developers.google.com/books/" target="_blank">
            Google Books APIs
          </a>
        </h1>
        <SearchField localSubmit={this.localSubmit} />
        {list}
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
