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
            <div className="d-md-flex">
                <Pagination />
                <div className="d-flex justify-content-end col-md-3 ms-md-auto my-1">
                    <button type="button" className="btn btn-dark" style={{ width: "5em" }}>등록</button>
                </div>
            </div>
        </>
    )
}
export default MovieEdit