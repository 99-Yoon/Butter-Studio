import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Modal } from 'bootstrap'
import CountButton from '../components/CountButton'
import SeatTable from '../components/SeatTable/SeatTable'
import styles from '../components/SeatTable/seatTable.module.scss'
import axios from 'axios'
import { useAuth } from '../context/auth_context.js'

const TicketingSeatPage = ({ location }) => {
    const history = useHistory()
    const modalRef = useRef(null)
    const modal = useRef()
    const { user } = useAuth()
    const [ticketInfo, setTicketInfo] = useState({ ...location.state })
    const [theaterInfo, setTheaterInfo] = useState()
    const [selectedSeats, setSelectedSeats] = useState([])
    const [reservedSeats, setReservedSeats] = useState([])
    const [count, setCount] = useState({
        adult: 0,
        teenager: 0,
        elderly: 0
    })

    useEffect(() => {
        getInfo()
    }, [])

    async function getInfo() {
        try {
            const response = await axios.post('/api/theater/getInfo', {
                theaterName: ticketInfo.selectedTheater
            })
            console.log(response.data)
            setTheaterInfo(response.data)

            const response2 = await axios.post('/api/reservation/findreservation', {
                timetable: 1
            })
            console.log(response2.data)
            const reserve = response2.data.map((el) =>
                el.row + '-' + el.col
            )
            setReservedSeats(reserve)
        } catch (error) {
            console.log(error)
        }
    }

    function loginModal() {
        if (user.role==="member") {
            history.push("/payment", {
                ...ticketInfo, selectedSeats: selectedSeats, ...count
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
                        { }
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
                                state: { ...ticketInfo, selectedSeats: selectedSeats, ...count }
                            }}>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">비회원예매</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" style={{ color: "white" }}>
                {console.log(ticketInfo)}
                {console.log(reservedSeats)}
                <div className="row justify-content-center my-5">
                    <div className="col-sm-4">
                        <h3 className="py-2 text-white text-center" style={{ border: "3px solid #000000", borderBottom: "3px solid #FEDC00" }}>좌석선택</h3>
                    </div>
                </div>
                <div className="row justify-content-center my-3">
                    <div className="col-sm-6 mb-4 text-center">
                        <div className="row">

                            <div className="col-sm-6 text-end">
                                <div className="my-1">일반</div>
                                <div className="my-1">청소년</div>
                                <div className="my-1">경로우대</div>
                            </div>
                            <div className="col-sm-6 text-start">
                                <CountButton name="adult" count={count} setCount={setCount} />
                                <CountButton name="teenager" count={count} setCount={setCount} />
                                <CountButton name="elderly" count={count} setCount={setCount} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 mb-4 p-2 text-center" style={{ backgroundColor: '#252525' }}>
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
                                <li>극장: {ticketInfo.cinema}</li>
                                <li>일시: 2021/07/21 10:00 </li>
                                <li>상영관: {ticketInfo.selectedTheater}관</li>
                                <li>좌석: {selectedSeats.map(el=>String.fromCharCode(parseInt(el.split('-')[0]) + 64)+el.split('-')[1])+' '}</li>
                            </ul>
                            : <div></div>}
                    </div>
                    <div className="col-sm-3 text-center">
                        <div className="mb-2" style={{ color: "white" }}>결제하기</div>
                        {ticketInfo
                            ?
                            <button onClick={loginModal} style={{ backgroundColor: '#252525', border: 0 }} >
                                <img className="border border-3 rounded-3" src="/images/icons8-arrow-white.png" style={{width:"90px"}} alt="결제하기" />
                            </button>
                            :
                            <button disabled>
                                <img className="border border-3 rounded-3" src="/images/icons8-arrow-white.png" alt="결제하기" />
                            </button>

                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TicketingSeatPage