import React, { Component } from 'react';

export class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'isShow': false
    }

    this.showInfo = this.showInfo.bind(this);
  }

  showInfo() {
    this.setState({ isShow: !this.state.isShow })
  }

  render() {

    const { book } = this.props

    const previewLong = this.state.isShow && (
      <div>
        <div className="show-btn" onClick={this.showInfo}>&larr; back</div>
        <div>
          <div className="title">{book.volumeInfo.title}</div>
          <div className="description">
            {(book.volumeInfo.description != null) ? book.volumeInfo.description.substring(0, 300) + '...' : ''}
          </div>
          <div>
            <a target="_blank" href={book.volumeInfo.previewLink}>preview link (in new tab) &rarr;</a>
          </div>
        </div>
      </div>
    )

    const previewShort = !this.state.isShow && (
      <div className="short">
        <div>
          {book.saleInfo.saleability}
        </div>
        <div onClick={this.showInfo} className="thumbnail" style={{
          'background': (typeof book.volumeInfo.imageLinks !== 'undefined') ? 'url(' + book.volumeInfo.imageLinks.smallThumbnail.replace('http://', 'https://') + ') no-repeat' : ''
        }}></div>
        <div className="title">
          {(book.volumeInfo.title.length > 80) ? book.volumeInfo.title.substring(0, 80) + '...' : book.volumeInfo.title}
        </div>
        <div className="authors">
          {(typeof book.volumeInfo.authors !== 'undefined') ? book.volumeInfo.authors.join(', ') : ''}
        </div>
      </div>
    )

    const body = previewShort || previewLong

    return (
      <div className="book" key={book.id}>
        {body}
      </div>
    );
  }

}

export default Book