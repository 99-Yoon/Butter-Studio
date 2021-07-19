import { useState } from 'react'
import TicketingMovie from "../components/TicketingMovie/TicketingMovie"
import TicketingTheater from "../components/TicketingTheater/TicketingTheater"
import TicketingTimeTable from "../components/TicketingTimeTable"

const TicketingPage = (location) => {
    // const [movieInfo, setMovieInfo] = useState(location)
    const [movieInfo, setMovieInfo] = useState({ movieId: "497698" })
    const [theaterInfo, setTheaterInfo] = useState({
        theater: "Butter 조치원",
        cinemaNum: [1, 2, 3, 4],
        selectedCinemaNum:0
    })


    return (
        <div className="container" style={{ backgroundColor: "black" }}>
            <div className="row justify-content-center my-5">
                <div className="col-sm-4">
                    <h2 className="py-2 text-white text-center" style={{ border: "3px solid #FEDC00", borderBottom: "3px solid #FEDC00" }}>영화</h2>
                    <TicketingMovie movieInfo={movieInfo} setMovieInfo={setMovieInfo} />
                </div>
                <div className="col-sm-4">
                    <h2 className="py-2 text-white text-center" style={{ border: "3px solid #FEDC00", borderBottom: "3px solid #FEDC00" }}>극장</h2>
                    <TicketingTheater theaterInfo={theaterInfo} setTheaterInfo={setTheaterInfo} />
                </div>
                <div className="col-sm-4">
                    <h2 className="py-2 text-white text-center" style={{ border: "3px solid #FEDC00", borderBottom: "3px solid #FEDC00" }}>시간표</h2>
                    <TicketingTimeTable movieInfo={movieInfo} theaterInfo={theaterInfo} />
                </div>
            </div>

        </div>
    )
}

export default TicketingPage