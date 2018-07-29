import React, { Component } from 'react';
import Book from './Book';

export class BooksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'forSaleFilter': ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.filterBooks = this.filterBooks.bind(this);
  }

  handleChange(event) {
    this.setState({ forSaleFilter: event.target.value })
  }

  filterBooks(saleability) {
    return this.state.forSaleFilter && saleability === this.state.forSaleFilter || !this.state.forSaleFilter
  }

  render() {

    return (
      <div>

        <h2>Searching results:</h2>

        <select onChange={this.handleChange}>
          <option value="">any</option>
          <option value="FOR_SALE">for sale</option>
          <option value="FOR_PREORDER">for preorder</option>
          <option value="NOT_FOR_SALE">not for sale</option>
        </select>

        <div>
          {this.props.suggestion.filter(book => this.filterBooks(book.saleInfo.saleability)).map(function (book) {
            // @TODO: `key=id+etag` as tmp-solution for `one book in several results` case.
            return (
              <Book key={book.id + book.etag} book={book} />
            );
          })}
        </div>

      </div>
    )
  }
}
