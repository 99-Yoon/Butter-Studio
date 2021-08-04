import { useState } from 'react'
import MovieChart from '../components/MovieChart.js'
import MovieComing from '../components/MovieComing.js'

const MovieListPage = () => {
    const [state, setState] = useState(0)

    return (
        <div className="container">
            <div className="text-center my-5">
                <button className="mx-auto" style={{ color: "white", borderColor: "black", backgroundColor: "black", borderBottom: !state ? "3px solid" : "none", borderBottomColor: !state ? "#FEDC00" : "black" }} type="button" onClick={() => setState(0)}>무비차트</button>

                <button className="mx-auto" style={{ color: "white", borderColor: "black", backgroundColor: "black", borderBottom: !state ? "none" : "3px solid", borderBottomColor: !state ? "black" : "#FEDC00" }} type="button" onClick={() => setState(1)}>상영예정작</button>

            </div>
            <div>
                {state === 0
                    ?
                    <MovieChart />
                    :
                    <MovieComing />
                }
            </div>
        </div>
    )
}

export default MovieListPage