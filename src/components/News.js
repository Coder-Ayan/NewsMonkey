import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    async function updateNews() {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        let totalPages = Math.ceil(parsedData.totalResults / props.pageSize);
        props.setProgress(50);

        // Set States
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setTotalPages(totalPages)
        setHasMore(page < totalPages)

        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()

        // Set States
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setPage(page + 1)
        setHasMore(page < totalPages)
    };

    return (
        <>
            <h2 className="text-center my-4">NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Spinner />} >
                <div className="row row-cols-3">
                    {articles.map((article) => {
                        return <div className="col my-2" key={article.url}>
                            <NewsItem title={article.title} description={article.description} imageUrl={article.urlToImage} newsUrl={article.url} author={article.author} date={article.publishedAt} source={article.source.name} />
                        </div>
                    })}
                </div>
            </InfiniteScroll>

        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}