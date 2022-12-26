import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'

export class News extends Component {
  static propTypes  = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string
  }

  static defaultProps  = {
    country:'in',
    pageSize: 8,
    category:'general'
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };

  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cfaa865f36f74d39839628658fc379d9&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log("data>>", parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
    });
  }

  handleNextClick = async () => {
    console.log('test>>', this.props, this.defaultProps)

    let logic = Math.ceil(this.state.totalResults / this.props.pageSize);
    if (!this.state.page + 1 > logic) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cfaa865f36f74d39839628658fc379d9&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        articles: parseData.articles,
        page: this.state.page + 1,
      });
    }
  };

  handlePreClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cfaa865f36f74d39839628658fc379d9&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ articles: parseData.articles, page: this.state.page + 1 });
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">News Monkey Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((ele) => {
            return (
              <div className="col-md-4" key={ele.url}>
                <NewsItem
                  title={ele.title && ele.title.slice(0, 50)}
                  description={ele.description && ele.description.slice(0, 88)}
                  imgUrl={ele.urlToImage}
                  newsUrl={ele.url}
                ></NewsItem>
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePreClick}
          >
            &laquo; Pre
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
