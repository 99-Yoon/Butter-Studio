import { useState, useEffect } from "react";
import Search from "../Search";
import MovieTable from "../MovieTable";
import Pagination from "../Pagination";
import movieApi from "../../apis/movie.api.js";
import catchErrors from "../../utils/catchErrors.js";

const MovieEdit = () => {
    const [search, setSearch] = useState({ type: "admin", keyword: "" })
    const [movieList, setMovieList] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [error, setError] = useState("")

    useEffect(() => {
        paginate(activePage)
    }, [])

    async function paginate(pageNum) {
        try {
            const { TMDBmovies, totalPage } = (search.keyword !== '') ? await movieApi.search(search, pageNum) : await movieApi.getAllfromTM(pageNum)
            setActivePage(pageNum)
            setTotalPages(totalPage)
            setMovieList(TMDBmovies)
        } catch (error) {
            catchErrors(error, setError);
        }
    }

    const prevPage = () => {
        if (activePage > 1) {
            paginate(activePage - 1)
        } else {
            paginate(1);
        }
    };

    const nextPage = () => {
        if (activePage < totalPages) {
            paginate(activePage + 1)
        } else {
            paginate(totalPages);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-md-end justify-content-center mb-3">
                <Search search={search} setSearch={setSearch} handleClick={paginate} />
            </div>
            <MovieTable movieList={movieList} />
            <Pagination
                totalPages={totalPages}
                activePage={activePage}
                prevPage={prevPage}
                nextPage={nextPage}
                paginate={paginate} />
        </>
    )
}
export default MovieEdit