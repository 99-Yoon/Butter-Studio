import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./movieChart.module.scss"

const MovieChart = () => {
    const MovieChartList = [
        {
            id: 1,
            poster: "/images/movie_image_black.jpg",
            title: "블랙위도우",
            popularity: 50.98,
            release_date: "2021-07-07",
            runtime: 134,
            overview: "어벤져스의 히어로 블랙 위도우, 나타샤 로마노프는 자신의 과거와 연결된 레드룸의 거대한 음모와 실체를 깨닫게 된다. 상대의 능력을 복제하는 빌런 태스크마스터와 새로운 위도우들의 위협에 맞서 목숨을 건 반격을 시작하는 나타샤는 스파이로 활약했던 자신의 과거 뿐 아니라, 어벤져스가 되기 전 함께했던 동료들을 마주해야만 하는데…"
        },
        {
            id: 2,
            poster: "/images/movie_image_limit.jpg",
            title: "발신제한",
            popularity: 3.22,
            release_date: "2021-06-23",
            runtime: 94,
            overview: ''
        },
        {
            id: 3,
            poster: "/images/movie_image_everyday.jpg",
            title: "우리는 매일매일",
            popularity: 2.83,
            release_date: "2021-06-30",
            runtime: 75,
            overview: ''
        },
        {
            id: 4,
            poster: "/images/movie_image_cruella.jpg",
            title: "크루엘라",
            popularity: 1.72,
            release_date: "2021-05-26",
            runtime: 133,
            overview: ''
        }
    ]
    return (
        <div class="row row-cols-1 row-cols-md-4 g-4">
            {MovieChartList.length > 0
                ?
                MovieChartList.map(movie => (
                    <div className="card h-100" style={{ backgroundColor: "black" }}>
                        <Link to={{
                            pathname: `/movie/${movie.id}`,
                            state: {
                                id: movie.id,
                                poster: movie.poster,
                                title: movie.title,
                                popularity: movie.popularity,
                                release_date: movie.release_date,
                                runtime: movie.runtime,
                                overview: movie.overview
                            }
                        }} className={`${styles.layer}`} >
                            <img src={movie.poster} className={`card-img-top rounded ${styles.poster}`} alt="Movie Poster" />
                            <div className={`${styles.description}`}>{movie.overview}</div>
                        </Link>
                        <div className="card-body text-light">
                            <marquee onmouseover="this.stop()" className={`h2 card-title text-center ${styles.title}`}>{movie.title}</marquee>
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