import { useState, useEffect } from "react";
import Search from "../Search";
import MovieTable from "../MovieTable";
import Pagination from "../Pagination";
import movieApi from "../../apis/movie.api.js";
import catchErrors from "../../utils/catchErrors.js";

const MovieEdit = () => {
    const [search, setSearch] = useState({ type: "admin", keyword: "" })
    const [movieList, setMovieList] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        getMovieList()
    }, [])

    async function getMovieList() {
        try {
            setError("")
            const getMovieList = await movieApi.getAllfromTM()
            setMovieList(getMovieList)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function searchMovie() {
        try {
            setError("")
            const findMovie = await movieApi.search(search)
            setMovieList(findMovie)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <>
            <div className="d-flex justify-content-md-end justify-content-center mb-3">
                <Search search={search} setSearch={setSearch} handleClick={searchMovie} />
            </div>
            <MovieTable movieList={movieList} />
            <Pagination />
        </>
    )
}
export default MovieEdit