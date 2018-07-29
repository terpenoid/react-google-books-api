import React, { Component } from 'react';

export class SearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.localSubmit(this.state.search);
  }

  handleChange(event) {
    const text = event.target.value;
    this.setState({ 'search': text });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="search terms" value={this.props.value} onChange={this.handleChange} />
          <button>search</button>
        </form>
      </div>
    );
  }

}