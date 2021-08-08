import styles from "./search.module.scss";

const Search = ({ search, setSearch, handleClick }) => {
    function handleSearch(e) {
        const { name, value } = e.target
        setSearch({ ...search, [name]: value })
    }

    return (
        <div className="d-flex">
            <input className={`form-control ${search.type === "home" ? styles.searchWhite : `${styles.search}`}`} name="keyword" type="text" autoComplete="off" onChange={handleSearch} />
            <i className={`bi bi-search align-self-center ${search.type === "home" ? "text-white" : "mx-2"} ${styles.icon}`} onClick={() => handleClick(1)} style={{ fontSize: "1.3rem" }}></i>
        </div>
    )
}

export default Search