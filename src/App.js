import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
    categories = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];
    pageSize = 6;
    apiKey = process.env.REACT_APP_NEWS_API_KEY;
    state = { progress: 0 };
    setProgress = (progress) => {
        this.setState({ progress: progress });
    }

    render() {
        return (
            <Router>
                <LoadingBar
                    color='#f11946'
                    progress={this.state.progress}
                />
                <Navbar title="NewsMonkey" categories={this.categories} />
                <div className="container">
                    <Switch>
                        <Route key='general' path="/" exact>
                            <News setProgress={this.setProgress} category='general' apiKey={this.apiKey} pageSize={this.pageSize} />
                        </Route>

                        {/* Route all News components with categories */}
                        {this.categories.map(category => {
                            return (
                                <Route key={category.toLowerCase()} path={`/${category.toLowerCase()}`} exact>
                                    <News setProgress={this.setProgress} category={category.toLowerCase()} apiKey={this.apiKey} pageSize={this.pageSize} />
                                </Route>
                            )
                        })}
                    </Switch>
                </div>
            </Router>
        )
    }
}
