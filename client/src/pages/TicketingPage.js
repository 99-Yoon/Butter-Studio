import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import movieApi from '../apis/movie.api.js'
import cinemaApi from "../apis/cinema.api.js"
import TicketingMovie from "../components/TicketingMovie/TicketingMovie.js"
import TicketingTheater from "../components/TicketingTheater/TicketingTheater.js"
import TicketingTimeTable from "../components/TicketingTimeTable/TicketingTimeTable.js"
import catchErrors from "../utils/catchErrors.js"

const TicketingPage = ({ location }) => {
    const [ticketInfo, setTicketInfo] = useState({
        movieId: 0,
        ...location.state,
        cinema: "",
        selectedTheater: "",
        time: ""
    })
    const [cinemaInfo, setCinemaInfo] = useState({})
    const [movieInfo, setMovieInfo] = useState()
    const [error, setError] = useState("")

    useEffect(() => {
        getCinemaInfo()
    }, [])

    useEffect(() => {
        if (ticketInfo.movieId > 0) {
            getMovieInfo()
        }
    }, [ticketInfo])

    async function getMovieInfo() {
        try {
            const data = await movieApi.getMovieInfofromTM(ticketInfo.movieId)
            setMovieInfo(data)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function getCinemaInfo() {
        try {
            const response = await cinemaApi.getCinemaInfo()
            setCinemaInfo(response.data)
        } catch (error) {
            catchErrors(error, setError)
        }
    }
    async function getCinemaInfo() {
        try {
            const response = await axios.get('/api/info/cinema')
            console.log(response.data)
            setCinemaInfo(response.data)
        } catch (error) {
            catchErrors(error, setError)
        }
    }
    return (
        <div className="container" style={{ backgroundColor: "black" }}>
            <div className="row justify-content-center my-5">
                <div className="col-sm-4 mb-4 ">
                    <h3 className="py-2 text-white text-center" style={{ border: "3px solid #000000", borderBottom: "3px solid #FEDC00" }}>영화</h3>
                    <TicketingMovie ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
                </div>
                <div className="col-sm-3 mb-4 ">
                    <h3 className="py-2 text-white text-center" style={{ border: "3px solid #000000", borderBottom: "3px solid #FEDC00" }}>극장</h3>
                    <TicketingTheater cinemaInfo={cinemaInfo} ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
                </div>
                <div className="col-sm-5 mb-4 ">
                    <h3 className="py-2 text-white text-center" style={{ border: "3px solid #000000", borderBottom: "3px solid #FEDC00" }}>시간표</h3>
                    <TicketingTimeTable ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
                </div>
            </div>
            <div className="row p-3" style={{ backgroundColor: "#252525" }}>
                <div className="col-sm-3 border-end text-center">
                    {movieInfo
                        ? <img style={{ maxHeight: "10rem" }} src={`https://image.tmdb.org/t/p/original${movieInfo.poster_path}`} alt="영화포스터" />
                        : <div className="mb-2" style={{ color: "white" }}>영화선택</div>}
                </div>
                <div className="col-sm-6 border-end" style={{ color: "white" }}>
                    <div className="mb-2  text-center">극장선택</div>
                    {movieInfo && ticketInfo.cinema
                        ? <ul>
                            <li>영화: {movieInfo.title}</li>
                            <li>극장: {ticketInfo.cinema}</li>
                            <li>일시: {ticketInfo.time}</li>
                            <li>상영관: {(ticketInfo.selectedTheater !== "") ? ticketInfo.selectedTheater + " 관" : ""}</li>
                        </ul>
                        : <div></div>}
                </div>
                <div className="col-sm-3 text-center">
                    <div className="mb-2" style={{ color: "white" }}>좌석선택</div>
                    {movieInfo && ticketInfo.cinema
                        ?
                        <Link to={{
                            pathname: `/ticket/seat`,
                            state: { ...ticketInfo, ...movieInfo }
                        }}>
                            <img className="border border-3 rounded-3" src="/images/icons8-arrow-white.png" alt="예매하기" />
                        </Link>
                        : <img className="border border-3 rounded-3" src="/images/icons8-arrow-white.png" alt="예매하기" />
                    }
                </div>
            </div>
        </div>
    )
}

export default TicketingPage