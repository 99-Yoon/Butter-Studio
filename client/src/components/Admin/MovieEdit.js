import Search from "../Search";
import MovieTable from "../MovieTable";
import Pagination from "../Pagination";

const MovieEdit = () => {
    return (
        <>
            <div className="d-flex justify-content-end mb-3">
                <Search type="admin" />
            </div>
            <MovieTable />
            <div className="d-flex align-items-center">
                <Pagination />
                <button type="button" className="btn btn-dark" style={{ width: "5em" }}>등록</button>
            </div>
        </>
    )
}
export default MovieEdit