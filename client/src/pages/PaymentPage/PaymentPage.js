import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Kakaopay from '../../components/Kakaopay'
import { useAuth } from '../../context/auth_context'
import catchErrors from '../../utils/catchErrors'
import styles from './PaymentPage.module.scss'

const Payment = ({ location }) => {
    const history = useHistory();
    const [ticketInfo, setTicketInfo] = useState({ ...location.state })
    const [error, setError] = useState("")
    const [userInfo, setUserInfo] = useState({
        nickname: "",
        email: "",
        birth: "",
        phoneNumber: ""
    })
    const [guestInfo, setGuestInfo] = useState({})
    const [guestID, setGuestID] = useState()
    const { user } = useAuth()

    useEffect(() => {
        console.log(user.id)
        if (user.role === "member") {
            getUserInfo()
        }
    }, [])

    async function getUserInfo() {
        try {
            const response = await axios.post(`/api/auth/getuserinfo`, {
                id: user.id
            })
            console.log(response.data)
            setUserInfo(response.data)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function handleChangeGuest(e) {
        setGuestInfo({ ...guestInfo, [e.target.name]: String(e.target.value) })
    }

    async function handleClickGuest() {
        try {
            const response = await axios.post('/api/auth/guest/save', {
                ...guestInfo
            })
            setGuestID(response.data.id)
            alert("비회원 정보가 저장되었습니다.")
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function reservationComplete() {
        try {
            if (user.id > 0) {
                const response = await axios.post(`/api/reservation/save`, {
                    userType: "member",
                    user: userInfo.id,
                    ...ticketInfo,
                    payment: "카카오페이",
                    timetable: 1
                })
                if (response.data) {
                    const responseEmail = await axios.post('/api/email/send', {
                        ...ticketInfo,
                        ...userInfo,
                        ...guestInfo,
                    })
                    console.log("이메일전송완료===", responseEmail.data)
                    alert("예매가 완료되었습니다.")
                    history.push('/')
                }
            } else {
                if (guestID) {
                    const response = await axios.post(`/api/reservation/save`, {
                        userType: "guest",
                        user: guestID,
                        ...ticketInfo,
                        payment: "카카오페이",
                        timetable: 1
                    })
                    if (response.data) {
                        const responseEmail = await axios.post('/api/email/send', {
                            ...ticketInfo,
                            ...userInfo,
                            ...guestInfo,
                        })
                        console.log("이메일전송완료===", responseEmail.data)
                    }
                    alert("예매가 완료되었습니다.")
                    console.log("비회원예매완료===", response.data)
                    history.push('/')
                } else {
                    alert("비회원 정보를 모두 입력 후 비회원 정보 저장 버튼을 눌러주세요.")
                }
            }

        } catch (error) {
            catchErrors(error, setError)
        }
    }


    return (
        <div className="container" style={{ color: "white" }}>
            {console.log(ticketInfo)}
            {console.log(userInfo)}
            {/* {console.log(guestInfo)} */}
            <div className="row justify-content-center my-5">
                <div className="col-sm-4 ">
                    <h3 className="py-2 text-white text-center" style={{ border: "3px solid #000000", borderBottom: "3px solid #FEDC00" }}>결제하기</h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-8 text-center">
                    {user.role === "member"
                        ?
                        <div>
                            <h5 className="mb-4 p-2" style={{ backgroundColor: "white", color: "black" }}>회원정보</h5>
                            <div className="my-1">
                                <label className={styles.labelStyle}>이름</label>
                                <input type="text" name="name" placeholder="이름" value={userInfo.nickname} />
                            </div>
                            <div className="my-1">
                                <label className={styles.labelStyle}>이메일</label>
                                <input type="email" name="email" placeholder="이메일" value={userInfo.email} />
                            </div>
                            <div className="my-1">
                                <label className={styles.labelStyle}>생년월일</label>
                                <input type="number" name="birth" placeholder="생년월일" maxLength="6" value={userInfo.birth} />
                            </div>
                            <div className="my-1">
                                <label className={styles.labelStyle}>휴대폰 번호</label>
                                <input type="number" name="phoneNumber" placeholder="휴대폰 번호" maxLength="11" value={userInfo.phoneNumber} />
                            </div>
                            <div className="m-2">
                                <p className={`text-muted ${styles.warningText}`}>
                                    ※ 회원정보 변경은 마이페이지에서 가능합니다.
                                </p>
                            </div>
                        </div>
                        :
                        <div>
                            <h5 className="mb-4 p-2" style={{ backgroundColor: "white", color: "black" }}>비회원예매 정보입력</h5>
                            <div className="my-1">
                                <label className={styles.labelStyle}>이름</label>
                                <input type="text" name="name" placeholder="이름" onChange={handleChangeGuest} required />
                            </div>
                            <div className="my-1">
                                <label className={styles.labelStyle}>이메일</label>
                                <input type="email" name="email" placeholder="이메일" onChange={handleChangeGuest} required />
                            </div>
                            <div className="my-1">
                                <label className={styles.labelStyle}>생년월일</label>
                                <input type="number" name="birth" placeholder="생년월일" onChange={handleChangeGuest} maxLength="6" required />
                            </div>
                            <div className="my-1">
                                <label className={styles.labelStyle}>휴대폰 번호</label>
                                <input type="number" name="phoneNumber" placeholder="휴대폰 번호" onChange={handleChangeGuest} maxLength="11" required />
                            </div>
                            <div className="my-1">
                                <label className={styles.labelStyle}>비밀번호</label>
                                <input type="password" name="guestPassword" placeholder="비밀번호" onChange={handleChangeGuest} required style={{ width: "178px" }} />
                            </div>
                            <div className="m-2">
                                <p className={`text-muted ${styles.warningText}`}>
                                    ※ 비회원 정보 오기입 시 예매 내역 확인/취소 및 티켓 발권이 어려울 수 있으니 다시 한번 확인해 주시기 바랍니다.
                                </p>
                            </div>
                            <button className="btn btn-warning mb-3" type="button" style={{ width: "100%" }} onClick={handleClickGuest}>비회원 정보 저장</button>
                        </div>
                    }
                    <h5 className="my-4 p-2" style={{ backgroundColor: "white", color: "black" }}>결제방법</h5>
                    <img src="/images/naverpay_button.png" style={{width:"150px"}} />
                    <Kakaopay ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
                    <div className="my-5">
                        <button className="btn btn-warning" type="button" style={{ width: "100%" }} onClick={reservationComplete}>결제완료</button>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="text-center rounded-3 p-3" style={{ backgroundColor: "#252525" }}>
                        <img style={{ maxHeight: "10rem" }} src={`https://image.tmdb.org/t/p/original${ticketInfo.poster_path}`} alt="영화포스터" />
                        <h5 className="my-3">{ticketInfo.title}</h5>
                        <div>{ticketInfo.cinema}</div>
                        <div>{ticketInfo.time}</div>
                        <div className="mb-3">{ticketInfo.selectedTheater}관 {ticketInfo.selectedSeats.map(el => String.fromCharCode(parseInt(el.split('-')[0]) + 65) + el.split('-')[1]) + ' '}</div>
                        <div className="rounded-3 p-3" style={{ backgroundColor: '#404040' }}>
                            <div>청소년: {ticketInfo.teenager}명</div>
                            <div>성인: {ticketInfo.adult}명</div>
                            <div>경로우대: {ticketInfo.elderly}명</div>
                            <div>총 결제금액: {ticketInfo.teenager * 7000 + ticketInfo.adult * 8000 + ticketInfo.elderly * 6000}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Payment