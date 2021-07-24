import { useState, useEffect } from 'react'
import movieApi from "../apis/movie.api.js"
import MovieCard from "./MovieCard/index.js"
import catchErrors from '../utils/catchErrors.js'

const MovieComming = () => {
    const [TMDB_UpComming_Data, setTMDB_UpComming_Data] = useState([])
    const [error, setError] = useState("")
    const category = "upcoming"

    useEffect(() => {
        getTMDB_UpComming()
    }, [])

    async function getTMDB_UpComming() {
        try {
            setError("")
            const response = await movieApi.getfromTM(category)
            setTMDB_UpComming_Data([...response])
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <>
            {TMDB_UpComming_Data.length !== 0 ?
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    <MovieCard list={TMDB_UpComming_Data} />
                </div>
                : <h2 className="text-white text-center my-5">영화정보를 로딩할 수 없습니다.</h2>
            }
        </>
    )
}

export default MovieComming