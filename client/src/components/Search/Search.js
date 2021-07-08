import styles from "./search.module.scss";

const Search = ({ type }) => {
    console.log("type==",type)
    return (
        <div className="d-flex">
            <input className="form-control" type="text" id={type === "home" ? styles.searchWhite : styles.search} />
            <i className={`bi bi-search align-self-center ${type === "home" ? "text-white" : "mx-2"} ${styles.icon}`} style={{ fontSize: "1.3rem" }}></i>
        </div>
    )
}

export default Search