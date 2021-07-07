import Search from "../Search";

const MovieEdit = () => {
    return (
        <div className="d-flex justify-content-around">
            <button type="button" className="btn btn-dark" style={{ width: "5em" }}>등록</button>
            <Search type="admin" />
        </div>
    )
}
export default MovieEdit