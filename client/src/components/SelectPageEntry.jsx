import React from 'react';
import PropTypes from 'prop-types';
import styles from './App.css';

class SelectPageEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const style = {
      backgroundColor: this.props.currentPage === this.props.num ? '#edefed' : 'rgb(255, 255, 255)',
    };
    return (
      <div className={styles.btnBorder} style={style} >
        <a href="#" onClick={() => this.props.handlePageNumChange(this.props.num)}>{this.props.num}</a>
      </div>
    );
  }
}

SelectPageEntry.propTypes = {
  num: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
};


export default SelectPageEntry;

