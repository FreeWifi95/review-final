import React from 'react';
import PropTypes from 'prop-types';
import styles from './App.css';

class Modal2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const style = {
      display: this.props.show ? 'block' : 'none',
    };
    return (

      <div id={styles.myModal} className={styles.modal} style={style} >

        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <span className={styles.close} />
            <svg onClick={this.props.handleCloseClick}viewBox="0 0 24 24" className={styles.close} ><path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fillRule="evenodd" /></svg>
            <h2>Do you want to anonymously report this review?</h2>
            <div className={styles.description}> If so, please choose one of the following reasons. <a href="#popover">Learn more</a></div>
          </div>
          <div className={styles.modalBody}>
            <div>
              <input type="radio" className={styles.reasonTitle} /> Inappropriate content<br />
              <div className={styles.reason}>This review contains violent, graphic, promotional, or otherwise offensive content.</div>
            </div>
            <div>
              <input type="radio" className={styles.reasonTitle} /> Dishonest or hateful content<br />
              <div className={styles.reason}>This review is purposefully malicious and assaulting.</div>
            </div>
            <div>
              <input type="radio" className={styles.reasonTitle} /> Fake content<br />
              <div className={styles.reason}>This review contains false information or may be fake.</div>
            </div>
            <div className={styles.modalfooter} />
            <div className={styles.submitBtnDiv}>
              <div className={styles.submitBtn}>submit</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Modal2.propTypes = {
  show: PropTypes.bool.isRequired,
  handleCloseClick: PropTypes.func.isRequired,
};

export default Modal2;
