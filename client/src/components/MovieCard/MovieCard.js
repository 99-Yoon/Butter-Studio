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
                        <marquee onmouseover="this.stop()" className={`h2 card-title text-center ${styles.title}`}>{movie.title}</marquee>
                        <p className="card-text text-center">{movie.runtime}분</p>
                        <p className="card-text text-center"><small className="text-muted">{movie.release_date} 개봉</small></p>
                    </div>
                    <button className="btn btn-warning">예매하기</button>
                </div>
            ))}
        </>
    )
}

export default MovieCard