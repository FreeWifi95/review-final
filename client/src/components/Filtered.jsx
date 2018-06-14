import React from 'react';
import PropTypes from 'prop-types';
import ReviewListEntry from './ReviewListEntry.jsx';
import SelectPage from './SelectPage.jsx';
import styles from './App.css';

class Filtered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const length = this.props.reviewList.length;
    const word = this.props.word;
    return (
      <div>
        <div id={styles.searchSummaryDiv}>
          <div id= {styles.summary}>
            {length} guests have mentioned "<span id={styles.searchWord}>{word}</span>"
            <button id = {styles.back} onClick={this.props.handleBackClick}>
            Back to all reviews
            </button>
          </div>

          <div className={styles.clears} />
        </div>
        <div>

          {this.props.reviewList.map((review, index) => (
            <div key={index} className={styles.reviewDiv}>
              <ReviewListEntry
                review={review}
                key={index}
                userList={this.props.userList}
                handleFlagClick={this.props.handleFlagClick}
                handlePageNumChange={this.props.handlePageNumChange}
              />
            </div>
          ))
          }
        </div>
      </div>
    );
  }
}
Filtered.propTypes = {
  userList: PropTypes.shape({
    id: PropTypes.number,
    photo: PropTypes.string,
    user_name: PropTypes.string,
  }),
  handleFlagClick: PropTypes.func.isRequired,
  handlePageNumChange: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
};
export default Filtered;
