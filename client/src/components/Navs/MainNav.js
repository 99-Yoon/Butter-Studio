import Search from "../Search";

const MainNav = () => {
    return (
        <nav class="nav justify-content-evenly bg-dark border border-start-0 border-end-0 border-white border-2 py-1">
            <a class="nav-link text-white" href="#">영화</a>
            <a class="nav-link text-white" href="#">빠른예매</a>
            <a class="nav-link text-white" href="#">극장</a>
            <Search />
        </nav>
    )
}

export default MainNav