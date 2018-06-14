import React from 'react';
import SelectPageEntry from './SelectPageEntry.jsx';
import PropTypes from 'prop-types';
import styles from './App.css';

class SelectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderArr: [],
    };

    this.getMaxPageNum = this.getMaxPageNum.bind(this);
    this.canGoBack = this.canGoBack.bind(this);
    this.canGoForward = this.canGoForward.bind(this);
    this.makePageNum = this.makePageNum.bind(this);
  }

  componentDidMount() {
    this.getReviewListLen();
    this.getMaxPageNum();
    this.makePageNum();
  }
  componentDidUpdate(prevProps) {
    if (this.props.reviewListLen !== prevProps.reviewListLen) {
      this.getReviewListLen();
      this.getMaxPageNum();
      this.makePageNum();
    }
  }

  getReviewListLen() {
    this.setState({ reviewListLen: this.props.reviewListLen });
  }

  getMaxPageNum() {
    return Math.ceil(this.props.reviewListLen / 7);
  }

  canGoBack() {
    return this.props.pageNum > 1;
  }

  canGoForward() {
    return this.props.pageNum !== this.getMaxPageNum();
  }

  makePageNum() {
    let renderArr = [];
    const firstPage = 1;
    const currentPage = this.props.pageNum;
    const lastPage = Math.ceil(this.props.reviewListLen / 7);

    // if current page is the first page
    if (currentPage === firstPage) {
      // and there are more than 3 elements between the first
      // and the last
      if (lastPage - firstPage > 4) {
        // print ellipsis before the last page
        // no need to iterate since the next 2 pages
        // will always be 2 and 3
        renderArr = [1, 2, 3, '...', lastPage];
        this.setState({ renderArr });
        return renderArr;
      }
      // otherwise no ellipsis and show every page
      for (let i = 1; i <= lastPage; i += 1) {
        renderArr.push(i);
      }
      this.setState({ renderArr });
      return renderArr;
    }

    // if current page is the last page
    if (currentPage === lastPage) {
      // and there are more than 3 elements between the first
      // and the last page
      if (lastPage - firstPage > 4) {
        // render the first page, the ellipsis, and the last 3
        // no need to iterate since the previous 2 pages
        // will always be 1 and 2 less than the last
        renderArr = [1, '...', lastPage - 2, lastPage - 1, lastPage];
        this.setState({ renderArr });
        return renderArr;
      }

      // otherwise no ellipsis and show every page
      for (let i = lastPage; i >= 1; i -= 1) {
        renderArr.unshift(i);
      }
      this.setState({ renderArr });
      return renderArr;
    }

    // initialize the array with the current page
    renderArr.push(currentPage);

    /* if there are more than 2 pages between the first and the current page.
    while there are only 2 pages between the current and the first,
    the comparison needs to be '> 3' since the numeral difference of
    the current and the first will always be larger by 1.
    e.g. if current is 4, 4 - 1 = 3. But between 1 and 4, 2 and 3 (2 elements) go in.
    */
    if ((currentPage - firstPage) > 3) {
      // add first page, the ellipsis, and the page right before the current
      renderArr.unshift(1, '...', currentPage - 1);
    } else {
      // otherwise show all the pages (ellipsis isn't needed)
      for (let i = currentPage - 1; i >= 1; i -= 1) {
        renderArr.unshift(i);
      }
    }

    // if there are more than 2 elements between the last and the current page
    // the logic is similar to the above.
    if ((lastPage - currentPage) > 3) {
      // add the next page, ellipsis, and the last page
      renderArr.push(currentPage + 1, '...', lastPage);
    } else {
      // otherwise show all the pages
      for (let i = currentPage + 1; i <= lastPage; i += 1) {
        renderArr.push(i);
      }
    }
    this.setState({ renderArr });
  }


  render() {
    return (
      <div>
        {this.canGoBack() &&
          <div className={styles.btnBorder} className={styles.caretBorder} onClick={this.props.handleBackwardCaretClick}>
            <a className={styles.caret} href="#" onClick={() => this.props.handlePageNumChange(this.props.num)}><i className="fa fa-caret-left" /></a >
          </div>
        }

        <div>
          {this.state.renderArr.map((review, index) => (
            <SelectPageEntry key={index} num={index + 1} currentPage={this.props.pageNum} handlePageNumChange={this.props.handlePageNumChange} />
    ))}
        </div>
        {this.canGoForward() &&
          <div className={styles.btnBorder} className={styles.caretBorder} onClick ={this.props.handleForwardCaretClick}>
            <a className={styles.caret}href="#" onClick={() => this.props.handlePageNumChange(this.props.num)}><i className="fa fa-caret-right" /></a>
          </div>
        }
      </div>
    );
  }
}


SelectPage.propTypes = {
  num: PropTypes.number,
  reviewListLen: PropTypes.number,
  pageNum: PropTypes.number,
};

export default SelectPage;
