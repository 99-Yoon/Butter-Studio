import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import MovieCard from "./MovieCard/index.js"
import movieApi from '../apis/movie.api.js'
import catchErrors from '../utils/catchErrors.js'

const SearchResult = () => {
    const [result, setResult] = useState([])
    const [error, setError] = useState("")
    const { search } = useLocation()
    const { title } = queryString.parse(search)

    useEffect(() => {
        findforKeyword()
    }, [title])

    async function findforKeyword() {
        try {
            setError("")
            const { count, results } = await movieApi.search({ type: "home", keyword: title })
            setResult([...results])
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <div className="container">
            {result.length !== 0 ? (
                <>
                    <h3 className="text-white text-center my-5">'{title}' 에 관한 검색 결과입니다.</h3>
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        <MovieCard list={result} />
                    </div>
                </>
            ) : <h3 className="text-white text-center my-5 vh-100" style={{ wordBreak: "keep-all" }}>'{title}' 에 관한 검색 결과가 존재하지 않습니다.</h3>
            }
        </div>
    )
}

export default SearchResult