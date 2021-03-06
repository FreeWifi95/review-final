import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.props.handleSearchClick(this.state.input);
    }
  }

  render() {
    return (
      <div id={styles.searchBox}>
        <div>
          <div>
            <svg id={styles.serachIcon} viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" ><path d="m10.4 18.2c-4.2-.6-7.2-4.5-6.6-8.8.6-4.2 4.5-7.2 8.8-6.6 4.2.6 7.2 4.5 6.6 8.8-.6 4.2-4.6 7.2-8.8 6.6m12.6 3.8-5-5c1.4-1.4 2.3-3.1 2.6-5.2.7-5.1-2.8-9.7-7.8-10.5-5-.7-9.7 2.8-10.5 7.9-.7 5.1 2.8 9.7 7.8 10.5 2.5.4 4.9-.3 6.7-1.7v.1l5 5c .3.3.8.3 1.1 0s .4-.8.1-1.1" fillRule="evenodd" /></svg>
          </div>
          <input id={styles.input} type="text" placeholder="Search reviews"
            onKeyUp={this.handleSubmit}
           onChange={this.handleInputChange.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Search;


