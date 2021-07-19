import { useState, useEffect } from 'react'
import movieApi from '../../apis/movie.api.js'
import { Link } from 'react-router-dom';
import styles from "./movieChart.module.scss"

const MovieChart = () => {
    const [TMDB_TopRated_Data, setTMDB_TopRated_Data] = useState([])
    const category="popular"
    useEffect(() => {
        getTMDB_TopRated()
    }, [])

    async function getTMDB_TopRated() {
        try {
            const data = await movieApi.getMoviesfromTM(category)
            console.log(data)
            setTMDB_TopRated_Data([...data])
        } catch (error) {

        }
    }
    return (
        <div class="row row-cols-1 row-cols-md-4 g-4">
            {console.log(TMDB_TopRated_Data)}
            {TMDB_TopRated_Data
                ?
                TMDB_TopRated_Data.map(movie => (
                    <div className="card h-100 " style={{ backgroundColor: "black" }}>
                        <Link to={{
                            pathname: `/movie/${movie.id}`,
                            state: {...movie}
                        }} className={`${styles.layer}`} >
                            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className={`card-img-top rounded ${styles.poster}`} alt="Movie Poster" />
                            <div className={`${styles.description}`}>{movie.overview}</div>
                        </Link>
                        <div className="card-body text-light">
                            <div onmouseover="this.stop()" className={`h2 card-title text-center ${styles.title} ${styles.txt}`}>{movie.title}</div>
                            <p className={`card-text text-center ${styles.txt}`}>예매율: {movie.ticket_sales}0% | {movie.runtime}분</p>
                            <p className="card-text text-center"><small className="text-muted">{movie.release_date} 개봉</small></p>
                        </div>
                        <Link to={{
                            pathname:`/ticket`,
                            state: {movieId:movie.id,}
                        }} className="text-center">
                            <button className="btn btn-warning">예매하기</button>
                        </Link>
                    </div>
                ))
                : <div>영화정보를 로딩할 수 없습니다.</div>
            }
        </div>
    )
}

export default MovieChart