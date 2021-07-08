import Search from "../Search";
import MovieTable from "../MovieTable";
import Pagination from "../Pagination";
import styles from "./admin.module.scss";

const MovieEdit = () => {
    return (
        <>
            <div className="d-flex justify-content-end mb-3">
                <Search type="admin" />
            </div>
            <MovieTable />
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