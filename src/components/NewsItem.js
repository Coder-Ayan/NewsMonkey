import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        return (
            <div className="card">
                <div className="d-flex justify-content-end position-absolute top-0 end-0 translateY-middle">
                    <span className="badge rounded-pill bg-danger">
                        {this.props.source}
                    </span>
                </div>
                <img src={this.props.imageUrl} className="card-img-top" alt="Failed to load!" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.description}</p>
                    <p className="card-text">
                        <small className="text-muted">
                            By {this.props.author ? this.props.author : 'Unknown'} on {new Date(this.props.date).toGMTString()}
                        </small>
                    </p>
                    <a href={this.props.newsUrl} target='_blank' rel="noreferrer" className="card-link text-decoration-none">Read More...</a>
                </div>
            </div>
        )
    }
}
