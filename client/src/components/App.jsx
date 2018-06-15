import React from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import Search from './Search.jsx';
import HouseInfo from './HouseInfo.jsx';
import Star from './Star.jsx';
import SelectPage from './SelectPage.jsx';
import Modal2 from './Modal2.jsx';
import Filtered from './Filtered.jsx';
import styles from './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houseId: this.getRandomInt(0, 100),
      userList: [],
      houseInfo: {},
      reviewList: [],
      pageNum: 1,
      renderReviewList: [],
      show: false,
      searchWord: '',
      filteredList: [],
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.filter = this.filter.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handlePageNumChange = this.handlePageNumChange.bind(this);
    this.handleFlagClick = this.handleFlagClick.bind(this);
    this.handleForwardCaretClick = this.handleForwardCaretClick.bind(this);
    this.handleBackwardCaretClick = this.handleBackwardCaretClick.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
    this.getHouseInfo();
    this.getAllReviewList();
  }

  getUserInfo() {
    axios.get('/users')
      .then((response) => {
        this.setState({ userList: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getHouseInfo() {
    axios.get(`/house/${this.state.houseId}`)
      .then((response) => {
        this.setState({ houseInfo: response.data[0] });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getAllReviewList() {
    axios.get(`/house/${this.state.houseId}/reviews`, { params: { page: this.state.pageNum } })
   // axios.get(`/house/${this.state.houseId}/reviews?page=${this.state.pageNum}`
      .then((response) => {
        this.setState({ reviewList: response.data });


        const minRange = (this.state.pageNum * 7) - 7;
        const maxRange = minRange + 7;
        const targetList = response.data.slice(minRange, maxRange);

        this.setState({ renderReviewList: targetList });
      }).catch((error) => {
        console.log(error);
      });
  }
  getReviewList() {
    axios.get('/house/reviews', { params: { id: this.state.houseId} })
      .then((response) => {
        this.setState({ reviewList: response.data });
        console.log(this.state.reviewList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSearchClick(input) {
    this.setState({ searchWord: input }, this.filter);
  }

  filter() {
    const word = this.state.searchWord.trim();
    const Arr = this.state.reviewList.map(review => review.comment);
    const index = Arr.map((review) => {
      if (review.split(' ').includes(word)) {
        return Arr.indexOf(review);
      }
    }).filter(e => e !== undefined);
    const filteredArr = index.map(e => this.state.reviewList[e]);
    this.setState({ filteredList: filteredArr });
  }

  handleFlagClick() {
    this.setState({ show: !this.state.show });
  }

  handleCloseClick() {
    this.setState({ show: false });
  }

  handlePageNumChange(num) {
    this.setState({ pageNum: num });
    this.setState({ renderReviewList: this.state.reviewList.slice(0).splice(num * 7 - 7, 7) });
  }
  handleBackClick() {
    this.setState({ searchWord: '' });
    this.setState({ pageNum: 1 });
  }
  handleForwardCaretClick() {
    this.handlePageNumChange(this.state.pageNum + 1);
  }
  handleBackwardCaretClick() {
    this.handlePageNumChange(this.state.pageNum - 1);
  }
  render() {
    const overallStar = '0'.repeat(this.state.houseInfo.overall_rating).split('');
    let renderList = this.state.renderReviewList;
    let maxPage = this.state.reviewList.length;
    if (this.state.searchWord !== '') {
      renderList = this.state.filteredList;
      maxPage = this.state.filteredList.length;
    }
    return (
      <div>
        <h4 >
          <span className={styles.title}>{this.state.reviewList.length} Reviews</span>
          {overallStar.map((star, index) => (
            <span key={index} className={styles.starSpan}>
              <Star />
            </span>
              ))
            }
        </h4>
        <Search handleSearchClick={this.handleSearchClick} />
        <div className={styles.clearSearchFloat} />
        <br />
        <HouseInfo houseInfo={this.state.houseInfo} />
        {this.state.searchWord !== '' &&
        <Filtered
          reviewList={renderList}
          word={this.state.searchWord}
          handleBackClick={this.handleBackClick}
          handleFlagClick={this.handleFlagClick}
          handlePageNumChange={this.handlePageNumChange}
        />
        }
        {this.state.searchWord === '' &&
        <ReviewList
          userList={this.state.userList}
          reviewList={renderList}
          pageNum={this.state.pageNum}
          handleFlagClick={this.handleFlagClick}
        />
        }
        {this.state.searchWord === '' &&
        <SelectPage
          reviewListLen={maxPage}
          pageNum={this.state.pageNum}
          reviewList={renderList}
          handlePageNumChange={this.handlePageNumChange}
          handleForwardCaretClick={this.handleForwardCaretClick}
          handleBackwardCaretClick={this.handleBackwardCaretClick}
        />

      }

        <Modal2 show={this.state.show} handleCloseClick={this.handleCloseClick} />
      </div>
    );
  }
}

export default App;
