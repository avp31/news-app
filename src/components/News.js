import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
      page: 1,
      loading: true,
      //totalResults:20
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=55c1534659ba4910aa0335e4e80919fc&page=1&pageSize=20"
      );
      const jsonData = await response.json();
      this.setState({ news: jsonData.articles, loading: false, totalResults:jsonData.totalResults });
      console.log("data", jsonData.articles);
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  }

  handleNextPrevBtn = async (arg) => {
    try {
      console.log("arg", arg);
      let url = "";
      if (arg === "nextBtnClick") {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=55c1534659ba4910aa0335e4e80919fc&page=${
          this.state.page + 1
        }&pageSize=20`;
        this.setState({ page: this.state.page + 1 });
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=55c1534659ba4910aa0335e4e80919fc&page=${
          this.state.page - 1
        }&pageSize=20`;
        this.setState({ page: this.state.page - 1 });
      }
      const response = await fetch(url);
      const jsonData = await response.json();
      this.setState({
        news: jsonData.articles,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  };
  render() {
    const { news, loading, page } = this.state;
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center loader-container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
    // if (news.length === 0) {
    //   return <div>No data available</div>;
    // }
    return (
      <div className="container my-3">
        <h3 className="mb-3">News Monkey - Top Headline</h3>
        <div className="row">
          {news &&
            news.map((news, index) => (
              <div className="col-md-4 my-3" key={news.id || index}>
                <NewsItem
                  key={news.id || index}
                  title={news.title}
                  description={news.description}
                  imageUrl={news.urlToImage}
                  newsUrl={news.url}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={page <= 1}
            className="btn btn-dark"
            onClick={() => this.handleNextPrevBtn("prevBtnClick")}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => this.handleNextPrevBtn("nextBtnClick")}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
