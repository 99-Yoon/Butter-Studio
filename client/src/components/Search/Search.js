import styles from "./search.module.scss";

const Search = ({ type, search, setSearch, handleClick }) => {
    function handleSearch(e) {
        const { name, value } = e.target
        setSearch({ ...search, [name]: value })
    }
    console.log("type==", type)
    return (
        <div className="d-flex">
            {type === "home" ? null :
                <select className={`form-select ${styles.search}`} name="kind" aria-label="select search" onChange={handleSearch}>
                    <option value="title">제목</option>
                    <option value="director">감독명</option>
                </select>
            }
            <input className={`form-control ${type === "home" ? styles.searchWhite : `${styles.search}`}`} name="keyword" type="text" autoComplete="off" onChange={handleSearch} />
            <i className={`bi bi-search align-self-center ${type === "home" ? "text-white" : "mx-2"} ${styles.icon}`} onClick={handleClick} style={{ fontSize: "1.3rem" }}></i>
        </div>
    )
}

export default Search