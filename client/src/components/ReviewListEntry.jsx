import React from 'react';
import PropTypes from 'prop-types';
import UserEntry from './UserEntry.jsx';
import Star from './Star.jsx';
import styles from './App.css';

class ReviewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  getDateFormat(str) {
    const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthNum = parseInt(str.split('-')[1]);
    const month = months[monthNum - 1];
    const year = parseInt(str.split('-')[0]);
    return `${month} ${year}`;
  }

  render() {
    const date = this.getDateFormat(this.props.review.created_at);
    const starArr = '0'.repeat(this.props.review.overall_rating).split('');
    return (
      <div>
        <svg viewBox="0 0 24 24" className={styles.flag} onClick={this.props.handleFlagClick} >
          <path d="m22.39 5.8-.27-.64a207.86 207.86 0 0 0 -2.17-4.87.5.5 0 0 0 -.84-.11 7.23 7.23 0 0 1 -.41.44c-.34.34-.72.67-1.13.99-1.17.87-2.38 1.39-3.57 1.39-1.21 0-2-.13-3.31-.48l-.4-.11c-1.1-.29-1.82-.41-2.79-.41a6.35 6.35 0 0 0 -1.19.12c-.87.17-1.79.49-2.72.93-.48.23-.93.47-1.35.71l-.11.07-.17-.49a.5.5 0 1 0 -.94.33l7 20a .5.5 0 0 0 .94-.33l-2.99-8.53a21.75 21.75 0 0 1 1.77-.84c.73-.31 1.44-.56 2.1-.72.61-.16 1.16-.24 1.64-.24.87 0 1.52.11 2.54.38l.4.11c1.39.37 2.26.52 3.57.52 2.85 0 5.29-1.79 5.97-3.84a.5.5 0 0 0 0-.32c-.32-.97-.87-2.36-1.58-4.04zm-4.39 7.2c-1.21 0-2-.13-3.31-.48l-.4-.11c-1.1-.29-1.82-.41-2.79-.41-.57 0-1.2.09-1.89.27a16.01 16.01 0 0 0 -2.24.77c-.53.22-1.04.46-1.51.7l-.21.11-3.17-9.06c.08-.05.17-.1.28-.17.39-.23.82-.46 1.27-.67.86-.4 1.7-.7 2.48-.85.35-.06.68-.1.99-.1.87 0 1.52.11 2.54.38l.4.11c1.38.36 2.25.51 3.56.51 1.44 0 2.85-.6 4.18-1.6.43-.33.83-.67 1.18-1.02a227.9 227.9 0 0 1 1.85 4.18l.27.63c.67 1.57 1.17 2.86 1.49 3.79-.62 1.6-2.62 3.02-4.97 3.02z" fillRule="evenodd" />
        </svg>


        <UserEntry
          date={date}
          user_id={this.props.review.user_id}
        />


        <div className={styles.review_star}>
          {starArr.map((star, index) => <Star key={index} />)}
        </div>
        <div className={styles.comment}>{this.props.review.comment}</div>
        <br />
      </div>
    );
  }
}
ReviewListEntry.propTypes = {
  review: PropTypes.shape({
    comment: PropTypes.string,
    created_at: PropTypes.string,
    house_id: PropTypes.number,
    id: PropTypes.number,
    overall_rating: PropTypes.number,
    pageNum: PropTypes.number,
    rating_accuracy: PropTypes.number,
    rating_check_in: PropTypes.number,
    rating_cleanliness: PropTypes.number,
    rating_communication: PropTypes.number,
    rating_location: PropTypes.number,
    rating_value: PropTypes.number,
    user_id: PropTypes.number,
  }).isRequired,
};
export default ReviewListEntry;

/*
propTypes: {
  myObject: PropTypes.shape({
    text: PropTypes.string,
    numbers: PropTypes.arrayOf(PropTypes.number)
  });
}??
*/
