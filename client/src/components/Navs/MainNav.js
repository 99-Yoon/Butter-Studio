import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Search from "../Search";

const MainNav = () => {
    const [search, setSearch] = useState({ type: "home", keyword: "" })
    const history = useHistory()

    function searchMovie() {
        history.push(`/search?title=${search.keyword}`)
    }

    return (
        <nav className="nav justify-content-evenly border border-start-0 border-end-0 border-white border-2 py-1">
            <Link className="nav-link text-white" to="/movielist">영화</Link>
            <Link className="nav-link text-white" to="/ticket">빠른예매</Link>
            <Link className="nav-link text-white" to="/theater">극장</Link>
            <Search search={search} setSearch={setSearch} handleClick={searchMovie} />
        </nav>
    )
}

export default MainNav