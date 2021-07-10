import React, { useState, useEffect } from 'react'
import styles from "./movieChart.module.scss"
const MovieChart = () => {
    const MovieChartList = [
        {
            "id":1,
            "src": "/images/movie_image_black.jpg",
            "title": "블랙위도우",
            "popularity": 50.98,
            "release_date": "2021-07-07",
            "runtime": 134
        },
        {
            "id":2,
            "src": "/images/movie_image_limit.jpg",
            "title": "발신제한",
            "popularity": 3.22,
            "release_date": "2021-06-23",
            "runtime": 94
        },
        {
            "id":3,
            "src": "/images/movie_image_everyday.jpg",
            "title": "우리는 매일매일",
            "popularity": 2.83,
            "release_date": "2021-06-30",
            "runtime": 75
        },
        {
            "id":4,
            "src": "/images/movie_image_cruella.jpg",
            "title": "크루엘라",
            "popularity": 1.72,
            "release_date": "2021-05-26",
            "runtime": 133
        }
    ]
    return (
        <div class="row row-cols-1 row-cols-md-4 g-4">
            {MovieChartList.length > 0
                ?
                MovieChartList.map(movie => (
                    <div className="card h-100" style={{ backgroundColor: "black" }}>
                        <a href={`/movie/${movie.id}`}>
                            <img src={movie.src} className={`card-img-top rounded ${styles.poster}`} alt="Movie Poster" />
                            {/* <div className={`${styles.darkness}`}></div> */}
                            <div className={`${styles.description}`}>상세설명asdasd</div>
                        </a>
                        <div className="card-body text-light">
                            <h5 className="card-title text-center">{movie.title}</h5>
                            <p className="card-text text-center">예매율: {movie.popularity}% | {movie.runtime}분</p>
                            <p className="card-text text-center"><small className="text-muted">{movie.release_date} 개봉</small></p>
                        </div>
                        <button className="btn btn-warning">예매하기</button>
                    </div>
                ))
                : <div>영화정보를 로딩할 수 없습니다.</div>
            }
        </div>
    )
}

export default MovieChart