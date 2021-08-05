import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import styles from './movie-card.module.scss'

const MovieCard = ({ list }) => {
    const [movieList, setMovieList] = useState(list)

    useEffect(() => {
        setMovieList(list)
    }, [list])

    return (
        <>
            {movieList.map(movie => (
                <div className="card h-100" style={{ backgroundColor: "black" }}>
                    <Link to={{
                        pathname: `/movie/${movie.id}`,
                        state: {
                            ...movie
                        }
                    }} className={`${styles.layer}`} >
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className={`card-img-top rounded ${styles.poster}`} alt="Movie Poster" />
                        <div className={`${styles.description}`}>{movie.overview}</div>
                    </Link>
                    <div className="card-body text-light">
                        {movie.adult? <image src="/images/19.png" /> :<></>}
                        <div className={`h4 card-title text-center ${styles.title}`}>{movie.title}</div>
                        <p className={`card-text text-center ${styles.txt}`}>예매율: {Math.round((movie.ticket_sales/movie.totalReservationRate.totalReservationRate)*100)}% | {movie.runtime}분</p>
                        <p className="card-text text-center"><small className="text-muted">{movie.release_date} 개봉</small></p>
                    </div>
                    <Link to={{
                            pathname:`/ticket`,
                            state: {movieId:movie.id,}
                        }} className="text-center">
                            <button className="btn btn-warning">예매하기</button>
                        </Link>
                </div>
            ))}
        </>
    )
}

export default MovieCard