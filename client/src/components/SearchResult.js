import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import MovieChart from "./MovieChart/index.js";

const SearchResult = () => {
    const { search } = useLocation()
    const { title } = queryString.parse(search)

    console.log("search==",search,"title==",title)
    return (
        <>
            <h3 className="text-white text-center my-5">'{title}' 에 관한 검색 결과입니다.</h3>
            <MovieChart />
        </>
    )
}

export default SearchResult