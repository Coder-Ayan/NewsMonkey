import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            totalPages: 0,
            hasMore: false
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
        console.log(this.props.apiKey)
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        let totalPages = Math.ceil(parsedData.totalResults / this.props.pageSize);
        this.props.setProgress(50);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            totalPages: totalPages,
            hasMore: (this.state.page < this.state.totalPages)

        })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        await this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            page: this.state.page + 1,
            hasMore: (this.state.page < this.state.totalPages)
        })
    };

    render() {
        return (
            <>
                <h2 className="text-center my-4">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<Spinner />} >
                    <div className="row row-cols-3">
                        {this.state.articles.map((article) => {
                            return <div className="col my-2" key={article.url}>
                                <NewsItem title={article.title} description={article.description} imageUrl={article.urlToImage} newsUrl={article.url} author={article.author} date={article.publishedAt} source={article.source.name} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>

            </>
        )
    }
}

export default News