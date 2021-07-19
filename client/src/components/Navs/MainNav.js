import { useState } from "react";
import { useHistory } from "react-router";
import Search from "../Search";

const MainNav = () => {
    const [search, setSearch] = useState({ keyword: "" })
    const history = useHistory()

    function searchMovie() {
        history.push(`/search?title=${search.keyword}`)
    }

    return (
        <nav className="nav justify-content-evenly border border-start-0 border-end-0 border-white border-2 py-1">
            <a className="nav-link text-white" href="/movielist">영화</a>
            <a className="nav-link text-white" href="/ticket">빠른예매</a>
            <a className="nav-link text-white" href="/theater">극장</a>
            <Search type="home" search={search} setSearch={setSearch} handleClick={searchMovie} />
        </nav>
    )
}

export default MainNav