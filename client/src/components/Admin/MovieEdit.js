import { useState, useEffect } from "react";
import Search from "../Search";
import MovieTable from "../MovieTable";
import Pagination from "../Pagination";
import movieApi from "../../apis/movie.api.js";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./admin.module.scss";

const MovieEdit = () => {
    const [movieList, setMovieList] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        getMovieList()
    }, [])

    async function getMovieList() {
        try {
            setError("");
            const getMovieList = await movieApi.getUpcomingfromTM()
            setMovieList(getMovieList)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <>
        {console.log("List==",movieList)}
            <div className="d-flex justify-content-end mb-3">
                <Search type="admin" />
            </div>
            <MovieTable movieList={movieList} />
            <div className="d-flex flex-wrap">
                <Pagination />
                <div className="d-flex justify-content-end col-12 col-md-4 my-2">
                    <button type="button" className={`btn btn-dark ${styles.customBtn}`}>등록</button>
                </div>
            </div>
        </>
    )
}
export default MovieEdit