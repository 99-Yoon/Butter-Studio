import { useState, useEffect } from 'react'
import movieApi from "../apis/movie.api.js"
// import MovieCard from "./MovieCard/index.js"
import { Link } from 'react-router-dom'
import styles from './MovieCard/movie-card.module.scss'
import catchErrors from '../utils/catchErrors.js'

const MovieComing = () => {
    const [TMDB_UpComing_Data, setTMDB_UpComing_Data] = useState([])
    const [error, setError] = useState("")
    const category = "upcoming"

    useEffect(() => {
        getTMDB_UpComing()
    }, [])

    async function getTMDB_UpComing() {
        try {
            setError("")
            const response = await movieApi.getListByCategoryfromDB(category)
            setTMDB_UpComing_Data([...response])
            console.log(response)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <>
            {TMDB_UpComing_Data.length !== 0 ?
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {/* <MovieCard list={TMDB_UpComing_Data} /> */}
                    {TMDB_UpComing_Data.map(movie => (
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
                                {movie.adult ? <image src="/images/19.png" /> : <></>}
                                <div className={`h4 card-title text-center ${styles.title}`}>{movie.title}</div>
                                <p className={`card-text text-center ${styles.txt}`}>{movie.runtime}분</p>
                                <p className="card-text text-center"><small className="text-muted">{movie.release_date} 개봉</small></p>
                            </div>
                            <Link to={{
                                pathname: `/ticket`,
                                state: { movieId: movie.id, }
                            }} className="text-center">
                                <button className="btn btn-warning">예매하기</button>
                            </Link>
                        </div>
                    ))}
                </div>
                : <h2 className="text-white text-center p-5"> </h2>
            }
        </>
    )
}

export default MovieComing