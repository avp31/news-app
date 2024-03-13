import React, { Component } from "react";

export default class NewsItem extends Component {
  alterImage = 'https://images.news18.com/ibnlive/uploads/2024/03/ramadan-2024-ramzan-start-end-date-2024-03-0b08f372e9a3f2afd03c677880747672-16x9.jpg?impolicy=website&width=1200&height=675';
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt} = this.props;
    return (
      <div className="card">
        <img src={imageUrl ? imageUrl: this.alterImage} className="card-img-top" alt="..." style={{height: "40vh"}}/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description} Desription</p>
          <p className="card-text"><small className="text-body-secondary">By{author?author:"Unknown"} on {new Date(publishedAt).toUTCString()}</small></p>
          <a href={newsUrl} className="btn btn-dark">
            Read More
          </a>
        </div>
      </div>
    );
  }
}
