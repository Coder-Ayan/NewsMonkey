import './App.css';
import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

import Navbar from './components/Navbar';
import News from './components/News';

export default function App() {
    let categories = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];
    let pageSize = 6;
    let apiKey = process.env.REACT_APP_NEWS_API_KEY;

    const [progress, setProgress] = useState(0);

    return (
        <Router>
            <LoadingBar
                color='#f11946'
                progress={progress}
            />
            <Navbar title="NewsMonkey" categories={categories} />
            <div className="container">
                <Switch>
                    <Route key='general' path="/" exact>
                        <News setProgress={setProgress} category='general' apiKey={apiKey} pageSize={pageSize} />
                    </Route>

                    {/* Route all News components with categories */}
                    {categories.map(category => {
                        return (
                            <Route key={category.toLowerCase()} path={`/${category.toLowerCase()}`} exact>
                                <News setProgress={setProgress} category={category.toLowerCase()} apiKey={apiKey} pageSize={pageSize} />
                            </Route>
                        )
                    })}
                </Switch>
            </div>
        </Router>
    )
}
