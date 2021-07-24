import { Link } from 'react-router-dom'
import { useState } from 'react'
import CountButton from '../components/CountButton'
import SeatTable from '../components/SeatTable/SeatTable'

const TicketingSeatPage = ({ location }) => {
    const [ticketInfo, setTicketInfo] = useState({ ...location.state })
    const [selectedSeats, setSelectedSeats] = useState([])
    const [count, setCount] = useState({
        adult: 0,
        teenager: 0,
        elderly: 0
    })
    const allSeat = { row: 6, col: 10 }
    return (
        <div className="container" style={{ color: "white" }}>
            {console.log(ticketInfo)}
            <div className="row justify-content-center my-5">
                <div className="col-sm-4 mb-3 ">
                    <h3 className="py-2 text-white text-center" style={{ border: "3px solid #000000", borderBottom: "3px solid #FEDC00" }}>좌석선택</h3>
                </div>
            </div>
            <div className="row justify-content-center my-3">
                <div className="col-sm-6 mb-4 text-center">
                    <ul className="mr-2" style={{ listStyle: 'none' }}>
                        <li>
                            <span className="">일반</span>
                            <CountButton name="adult" count={count} setCount={setCount} />
                        </li>
                        <li>
                            <span className="">청소년</span>
                            <CountButton name="teenager" count={count} setCount={setCount} />
                        </li>
                        <li>
                            <span className="">경로우대</span>
                            <CountButton name="elderly" count={count} setCount={setCount} />
                        </li>
                    </ul>
                </div>
                <div className="col-sm-6 mb-4 p-2 text-center" style={{ backgroundColor: '#252525' }}>
                    <div>{ticketInfo.theater} | 3관</div>
                    <div>{ticketInfo.title}</div>
                    <div>2021/07/21 10:00 ~ 11:30</div>
                </div>
            </div>
            <div className="row justify-content-center border p-5 ">
                <div className="col-sm-8">
                    <SeatTable count={count} setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats} allSeat={allSeat} />
                </div>
                <div className="col-sm-4 mt-5">
                    <p>선택됨</p>
                    <p>선택불가</p>
                </div>
            </div>
            <div className="row p-3 my-5" style={{ backgroundColor: "#252525" }}>
                <div className="col-sm-3 border-end text-center">
                    {ticketInfo
                        ? <img style={{ maxHeight: "10rem" }} src={`https://image.tmdb.org/t/p/original${ticketInfo.poster_path}`} alt="영화포스터" />
                        : <div className="mb-2" style={{ color: "white" }}>영화선택</div>}
                </div>
                <div className="col-sm-6 border-end" style={{ color: "white" }}>
                    <div className="mb-2  text-center">극장선택</div>
                    {ticketInfo
                        ? <ul>
                            <li>영화: {ticketInfo.title}</li>
                            <li>극장: {ticketInfo.theater}</li>
                            <li>일시: 2021/07/21 10:00 </li>
                            <li>상영관: 3관</li>
                            <li>좌석: {selectedSeats}</li>
                        </ul>
                        : <div></div>}
                </div>
                <div className="col-sm-3 text-center">
                    <div className="mb-2" style={{ color: "white" }}>결제하기</div>
                    {ticketInfo
                        ?
                        <Link to={{
                            pathname: `/payment`,
                            state: { }
                        }}>
                            <img className="border border-3 rounded-3" src="/images/icons8-arrow-white.png" alt="예매하기" />
                        </Link>
                        :
                        <img className="border border-3 rounded-3" src="/images/icons8-arrow-white.png" alt="예매하기" />

                    }
                </div>
            </div>
        </div>
    )
}

export default TicketingSeatPage