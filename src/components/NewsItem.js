import React from 'react'

export default function NewsItem(props) {

    return (
        <div className="card">
            <div className="d-flex justify-content-end position-absolute top-0 end-0 translateY-middle">
                <span className="badge rounded-pill bg-danger">
                    {props.source}
                </span>
            </div>
            <img src={props.imageUrl} className="card-img-top" alt="Failed to load!" />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <p className="card-text">
                    <small className="text-muted">
                        By {props.author ? props.author : 'Unknown'} on {new Date(props.date).toGMTString()}
                    </small>
                </p>
                <a href={props.newsUrl} target='_blank' rel="noreferrer" className="card-link text-decoration-none">Read More...</a>
            </div>
        </div>
    )
}