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
    }, [search])

    async function findforKeyword() {
        try {
            setError("")
            const { count, rows } = await movieApi.search(title)
            setResult([...rows])
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <>
            {result.length !== 0 ? (
                <>
                    <h3 className="text-white text-center my-5">'{title}' 에 관한 검색 결과입니다.</h3>
                    <MovieCard list={result} />
                </>
            ) : <h3 className="text-white text-center my-5">'{title}' 에 관한 검색 결과가 존재하지 않습니다.</h3>}
        </>
    )
}

export default SearchResult