import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 10,
    publishedAt:"",
    author:""
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
    //publishedAt:propTypes.Date,
    author:PropTypes.string
  };

  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);

    this.state = {
      news: [],
      page: 1,
      loading: false,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Monkey`
  }

  async updateNews() {
    try {
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      const response = await fetch(url);
      this.props.setProgress(30);
      const jsonData = await response.json();
      this.props.setProgress(70);
      this.setState({
        news: jsonData.articles,
        loading: false,
        totalResults: jsonData.totalResults,
      });
      this.props.setProgress(100);
      console.log("data", jsonData.articles);
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  }

 componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async() => {
      this.setState({page: this.state.page + 1})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      this.setState({
        news: this.state.news.concat(jsonData.articles),
        totalResults: jsonData.totalResults,
      });
    }
  // handleNextPrevBtn = async (arg) => {
  //   if (arg === "nextBtnClick") {
  //     await this.setState((prevState) => ({ page: prevState.page + 1 }));
  //   } else {
  //     await this.setState((prevState) => ({ page: prevState.page - 1 }));
  //   }
  //   this.updateNews();
  // };

  render() {
    const { news, loading } = this.state;
    return (
      <div className="container my-3" >
       <h2 className="text-center">News Monkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={news.length}
          next={this.fetchMoreData}
          hasMore={this.state.news.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
        <div className="row">
          { news &&
            news.map((newsItem, index) => (
              <div className="col-md-4 my-3" key={newsItem.id || index}>
                <NewsItem
                  key={newsItem.id || index}
                  title={newsItem.title}
                  description={newsItem.description}
                  imageUrl={newsItem.urlToImage}
                  newsUrl={newsItem.url}
                  author={newsItem.author}
                  publishedAt={newsItem.publishedAt}
                />
              </div>
            ))}
        </div>
        </div> 
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
              <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={() => this.handleNextPrevBtn("prevBtnClick")}> Previous </button>
              <button type="button" className="btn btn-dark" onClick={() => this.handleNextPrevBtn("nextBtnClick")}
                disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}> Next </button>
        </div> */}

      </div>
    );
  }
}
