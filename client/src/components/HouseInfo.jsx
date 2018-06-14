import React from 'react';
import PropTypes from 'prop-types';
import Star from './Star.jsx';
import styles from './App.css';

class HouseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  makeCategoryArr(num) {
    return '0'.repeat(num).split('');
  }

  render() {
    const houseInfoObj = this.props.houseInfo;
    const ratingAccuracy = this.makeCategoryArr(this.props.houseInfo.rating_accuracy);
    const ratingCommunication = this.makeCategoryArr(this.props.houseInfo.rating_communication);
    const ratingCleanliness = this.makeCategoryArr(this.props.houseInfo.rating_cleanliness);
    const ratingLocation = this.makeCategoryArr(this.props.houseInfo.rating_location);
    const ratingCheckin = this.makeCategoryArr(this.props.houseInfo.rating_check_in);
    const ratingValue = this.makeCategoryArr(this.props.houseInfo.rating_value);
    return (
      <div>
        <div className={styles.allhouseInfo}>
          <div className={styles.houseInfo}>
          <div className={styles.houseInfo_category}><span>Accuracy</span>
            {ratingAccuracy.map((star, index) => (
              <span key={index} className={styles.starSpan}>
                <Star />
              </span>
                ))
              }
          </div>
          <div className={styles.houseInfo_category}><span>Communication</span>
            {ratingCommunication.map((star, index) => (
              <span key={index} className={styles.starSpan}>
                <Star />
              </span>
                ))
              }
          </div>
          <div className={styles.houseInfo_category}><span>Cleanliness</span>
            {ratingCleanliness.map((star, index) => (
              <span key={index} className={styles.starSpan}>
                <Star />
              </span>
                ))
              }
          </div>
        </div>
          <div className={styles.houseInfo}>
          <div className={styles.houseInfo_category}><span>Location</span>
            {ratingLocation.map((star, index) => (
              <span key={index} className={styles.starSpan}>
                <Star />
              </span>
                ))
              }
          </div>
          <div className={styles.houseInfo_category}><span>Check-in</span>
            {ratingCheckin.map((star, index) => (
              <span key={index} className={styles.starSpan}>
                <Star />
              </span>
                ))
              }
          </div>
          <div className={styles.houseInfo_category}><span>Value</span>
            {ratingValue.map((star, index) => (
              <span key={index} className={styles.starSpan}>
                <Star />
              </span>
                ))
              }
          </div>
        </div>
          <br />
        </div>
      </div>
    );
  }
}
HouseInfo.propTypes = {
  houseInfo: PropTypes.shape({
    allReviewLen: PropTypes.number,
    id: PropTypes.number,
    overall_rating: PropTypes.number,
    rating_accuracy: PropTypes.number,
    rating_check_in: PropTypes.number,
    rating_cleanliness: PropTypes.number,
    rating_communication: PropTypes.number,
    rating_location: PropTypes.number,
    rating_value: PropTypes.number,
  }).isRequired,
};
export default HouseInfo;
