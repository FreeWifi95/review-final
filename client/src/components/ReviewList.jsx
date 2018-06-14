import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';
import PropTypes from 'prop-types';
import styles from './App.css';

const ReviewList = props => (

  <div>

    <div>

      {props.reviewList.map((review, index) =>
    (
      <div key={index} className= {styles.reviewDiv}>
        <ReviewListEntry
          review={review}
          key={index}
          handleFlagClick={props.handleFlagClick}
         // getTargetUser={props.getTargetUser}
        />
      </div>
    ))
    }
    </div>
  </div>
);
ReviewList.propTypes = {
  handleFlagClick: PropTypes.func.isRequired,
  reviewList: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
};
export default ReviewList;

