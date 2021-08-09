import { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import CountButton from '../components/CountButton'
import SeatTable from '../components/SeatTable/SeatTable'
import axios from 'axios'
import { useAuth } from '../context/auth_context.js'
import { Modal } from 'bootstrap'
import catchErrors from '../utils/catchErrors'
import styles from '../components/SeatTable/seatTable.module.scss'

const TicketingSeatPage = ({ location }) => {
    const history = useHistory()
    const modalRef = useRef(null)
    const modal = useRef()
    const { user } = useAuth()
    const [error, setError] = useState()
    const [ticketInfo, setTicketInfo] = useState({ ...location.state })
    const [theaterInfo, setTheaterInfo] = useState({ theatertypeId: 0 })
    const [selectedSeats, setSelectedSeats] = useState([])
    const [reservedSeats, setReservedSeats] = useState([])
    const [ticketFee, setTicketFee] = useState({
        youth: 0,
        adult: 0,
        senior: 0
    })
    const [count, setCount] = useState({
        youth: 0,
        adult: 0,
        senior: 0
    })

    useEffect(() => {
        getInfo()
    }, [])
    
    useEffect(() => {
        getTicketFee()
    }, [theaterInfo.theatertypeId])

    async function getInfo() {
        try {
            const response = await axios.post('/api/theater/getInfo', {
                theaterName: ticketInfo.selectedTheater
            })
            setTheaterInfo(response.data)
            const response2 = await axios.post('/api/reservation/findreservation', {
                timetable: 1
            })
            const reserve = response2.data.map((el) =>
                el.row + '-' + el.col
            )
            setReservedSeats(reserve)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function getTicketFee() {
        try {
            const response3 = await axios.get(`/api/info/ticketfee`, {
                params: {
                    theaterTypeId: theaterInfo.theatertypeId
                }
            })
            const basicFee = response3.data[0].day + response3.data[0].defaultPrice + response3.data[0].weekdays
            setTicketFee({
                adult: basicFee + response3.data[0].adult,
                youth: basicFee + response3.data[0].youth,
                senior: basicFee + response3.data[0].senior
            })
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function loginModal() {
        if (user.role === "member") {
            history.push("/payment", {
                ...ticketInfo, selectedSeats: selectedSeats, ...count, totalFee: count.adult * ticketFee.adult + count.youth * ticketFee.youth + count.senior * ticketFee.senior
            });
        } else {
            modal.current = new Modal(modalRef.current)
            modal.current?.show()
        }
    }

    return (
        <>
            <div ref={modalRef} className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden={modal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">로그인이 필요한 서비스입니다.</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            로그인을 하시겠습니까? 비회원예매로 진행하시겠습니까?
                        </div>
                        <div className="modal-footer">
                            <Link to={{ pathname: '/login' }}>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >
                                    로그인
                                </button>
                            </Link>
                            <Link to={{
                                pathname: `/payment`,
                                state: { ...ticketInfo, selectedSeats: selectedSeats, ...count, totalFee: count.adult * ticketFee.adult + count.youth * ticketFee.youth + count.senior * ticketFee.senior }
                            }}>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">비회원예매</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-5 pb-5" style={{ color: "white" }}>
                <div className="row justify-content-center my-5">
                    <div className="col-sm-4">
                        <h3 className="py-2 text-white text-center" style={{ border: "3px solid #000000", borderBottom: "3px solid #FEDC00" }}>좌석선택</h3>
                    </div>
                </div>
                <div className="row justify-content-center my-3">
                    <div className="col-sm-4 mb-4">
                        <div className="row text-end justify-content-sm-end">
                            <div className="col-sm-6 me-5" >
                                <div>
                                    <span className="my-1">일반</span>
                                    <span>
                                        <CountButton name="adult" count={count} setCount={setCount} />
                                    </span>
                                </div>
                                <div>
                                    <span className="my-1">청소년</span>
                                    <span>
                                        {ticketInfo.adult
                                            ?
                                            <CountButton name="youth" count={count} setCount={setCount} disabled />
                                            :
                                            <CountButton name="youth" count={count} setCount={setCount} />
                                        }
                                    </span>
                                </div>
                                <div>
                                    <span className="my-1">경로우대</span>
                                    <span>
                                        <CountButton name="senior" count={count} setCount={setCount} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5 mb-4 p-2 text-center" style={{ backgroundColor: '#252525' }}>
                        <div>{ticketInfo.cinema} | {ticketInfo.selectedTheater}관</div>
                        <div>{ticketInfo.title}</div>
                        <div>{ticketInfo.time}</div>
                    </div>
                </div>
                <div className="row justify-content-center border p-5 ">
                    <div className="col-sm-8">
                        <SeatTable count={count} setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats} theaterInfo={theaterInfo} reservedSeats={reservedSeats} />
                    </div>
                    <div className="col-sm-4 mt-5">
                        <div>
                            <button className={styles.on} style={{ height: '1rem', width: '1rem' }} disabled></button>
                            <span> 선택됨</span>
                        </div>
                        <div>
                            <button className={styles.btnBlock} style={{ height: '1rem', width: '1rem' }} disabled></button>
                            <span> 선택불가</span>
                        </div>
                    </div>
                </div>
                <div className="row p-3 mt-5" style={{ backgroundColor: "#252525" }}>
                    <div className="col-sm-2 mb-1 text-center">
                        {ticketInfo
                            ? <img style={{ width: "6rem" }} src={`https://image.tmdb.org/t/p/original${ticketInfo.poster_path}`} alt="영화포스터" />
                            : <div className="mb-2" style={{ color: "white" }}>영화선택</div>}
                    </div>
                    <div className="col-sm-4  mb-1" style={{ color: "white" }}>
                        {ticketInfo
                            ? <ul>
                                <li>영화: {ticketInfo.title}</li>
                                <li>극장: {ticketInfo.cinema}</li>
                                <li>일시: 2021/07/21 10:00 </li>
                                <li>상영관: {ticketInfo.selectedTheater}관</li>
                                <li>좌석: {selectedSeats.map(el => String.fromCharCode(parseInt(el.split('-')[0]) + 64) + el.split('-')[1]) + ' '}</li>
                            </ul>
                            :
                            <div className="mb-2  text-center">극장선택</div>
                        }
                    </div>
                    <div className="col-sm-4  mb-1">
                        {selectedSeats
                            ?
                            <ul>
                                <li>성인: {count.adult}명</li>
                                <li>청소년: {count.youth}명</li>
                                <li>경로: {count.senior}명</li>
                                <li className="mt-3">총 결제금액: {count.adult * ticketFee.adult + count.youth * ticketFee.youth + count.senior * ticketFee.senior}원</li>
                            </ul>
                            : <></>}
                    </div>
                    <div className="col-sm-2 text-center  mb-1">
                        <div className="h5 mb-3">결제하기</div>
                        {selectedSeats.length > 0 && count.adult + count.youth + count.senior === selectedSeats.length
                            ?
                            <button onClick={loginModal} style={{ backgroundColor: '#252525', border: 0 }} >
                                <img className="border border-3 rounded-3" src="/images/icons8-arrow-white.png" style={{ width: "70px" }} alt="결제하기" />
                            </button>
                            :
                            <button onClick={() => { alert("좌석을 선택해주세요.") }} style={{ backgroundColor: '#252525', border: 0 }}>
                                <img className="border border-3 rounded-3" src="/images/icons8-arrow-white.png" style={{ width: "70px" }} alt="결제하기" />
                            </button>

                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TicketingSeatPage