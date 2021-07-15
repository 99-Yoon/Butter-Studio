import React,{useState, useEffect} from 'react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import { Link } from 'react-router-dom';
import styles from "./movieComming.module.scss"

const MovieComming = () => {
    const [TMDB_UpComming_Data, setTMDB_UpComming_Data] = useState()
    useEffect(() => {
        getTMDB_UpComming()
    }, [])

    async function getTMDB_UpComming() {
        try {
            const response = await axios.get(`${baseUrl}/api/movie/upcomming`)
            console.log(response.data)
            setTMDB_UpComming_Data([...response.data])
        } catch (error) {

        }
    }
    return (
        <div class="row row-cols-1 row-cols-md-4 g-4">
            {TMDB_UpComming_Data
                ?
                TMDB_UpComming_Data.map(movie => (
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
                ))
                : <div>영화정보를 로딩할 수 없습니다.</div>
            }
        </div>
    )
}

export default MovieComming