import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Navbar extends Component {

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">{this.props.title}</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>

                                {this.props.categories.map(category => {
                                    return (
                                        <li key={category} className="nav-item">
                                            <Link className="nav-link" to={`/${category.toLowerCase()}`}>{category}</Link>
                                        </li>
                                    )
                                })}

                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}