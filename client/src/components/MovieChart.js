import { useState, useEffect } from 'react'
import MovieCard from './MovieCard/index.js'
import movieApi from '../apis/movie.api.js'
import catchErrors from '../utils/catchErrors.js'


const MovieChart = () => {
    const [TMDB_TopRated_Data, setTMDB_TopRated_Data] = useState([])
    const [error, setError] = useState("")
    const category = "popular"

    useEffect(() => {
        getTMDB_TopRated()
    }, [])

    async function getTMDB_TopRated() {
        try {
            setError("")
            const data = await movieApi.getMoviesfromTM(category)
            console.log("sdad==", data)
            setTMDB_TopRated_Data([...data])
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <>
            {TMDB_TopRated_Data.length !== 0 ?
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    <MovieCard list={TMDB_TopRated_Data} />
                </div>
                : <h2 className="text-white text-center my-5">영화정보를 로딩할 수 없습니다.</h2>
            }
        </>
    )
}

export default MovieChart