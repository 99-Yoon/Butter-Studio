import styles from "./search.module.scss";

const Search = () => {
    return (
        <div className="d-flex">
            <input className="form-control" type="text" id="search" />
            <i className="bi bi-search align-self-center text-white" style={{ fontSize: "1.3rem" }}></i>
        </div>
    )
}

export default Search