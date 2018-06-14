import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './App.css';

class UserEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }
  componentDidMount() {
    this.getTargetUser();
  }
  componentDidUpdate(prevProps) {
    if (this.props.user_id !== prevProps.user_id) {
      this.getTargetUser();
    }
  }
  getTargetUser() {
    axios.get(`/user/${this.props.user_id}`)
      .then((response) => {
        this.setState({ userInfo: response.data[0] });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className={styles.photodiv}>
          <img alt="user_photo" className={styles.userPhoto} src={this.state.userInfo.photo} />
        </div>
        <div className={styles.name_date}>
          <div className={styles.userName}>{this.state.userInfo.user_name}</div>
          <br />
          <div className={styles.date}>{this.props.date}</div>
        </div>
        <div className={styles.clear} />
      </div>
    );
  }
}

UserEntry.propTypes = {
  date: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
};


export default UserEntry;
