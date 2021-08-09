import axios from 'axios'
import { useEffect, useState } from 'react'
import authApi from '../../apis/auth.api'
import reservationApi from '../../apis/reservation.api'
import { useAuth } from '../../context/auth_context'
import catchErrors from '../../utils/catchErrors'
import styles from './PaymentPage.module.scss'

const Payment = ({ location }) => {
    const { user } = useAuth()
    const [guestInfo, setGuestInfo] = useState({})
    const [guestID, setGuestID] = useState()
    const [userInfo, setUserInfo] = useState({
        nickname: "",
        email: "",
        birth: "",
        phoneNumber: ""
    })
    const [ticketInfo, setTicketInfo] = useState({ ...location.state })
    const [element, setElement] = useState()
    const [error, setError] = useState("")

    useEffect(() => {
        if (user.role === "member") {
            getUserInfo()
        }
    }, [])

    async function getUserInfo() {
        try {
            setError("")
            const response = await axios.post(`/api/auth/getuserinfo`, {
                id: user.id
            })
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
            setError("")
            const response = await axios.post('/api/auth/guest/save', {
                ...guestInfo
            })
            setGuestID(response.data.id)
            alert("비회원 정보가 저장되었습니다.")
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function kakaoBtnClick() {
        setElement(
            <div className="text-center">
                <p className=" font-weight-bold" style={{ display: 'inline', color: "#FEDC00" }}>'카카오페이'</p><p style={{ display: 'inline' }}>를 선택하셨습니다. </p>
                <p>결제하기를 눌러 결제를 이어가주세요.</p>
            </div>
        )
        setTicketInfo({ ...ticketInfo, payment: "카카오페이" })
    }

    async function reservationComplete() {
        try {
            setError("")
            if (user.role === "member") {
                const response = await reservationApi.save({
                    userType: "member",
                    user: userInfo.id,
                    ...ticketInfo,
                    timetable: 1
                })
                const responsekakao = await axios.post('/api/kakaopay/test/single', {
                    cid: 'TC0ONETIME',
                    partner_order_id: 'butter_studio',
                    partner_user_id: '000000'+ (userInfo.id || guestInfo.id),
                    item_name: ticketInfo.title,
                    quantity: ticketInfo.adult + ticketInfo.youth + ticketInfo.senior,
                    total_amount: ticketInfo.totalFee,
                    vat_amount: 0,
                    tax_free_amount: 0,
                    approval_url: 'http://localhost:3000/paymentcomplete',
                    fail_url: 'http://localhost:3000/ticket',
                    cancel_url: 'http://localhost:3000/ticket',
                })
                if (response && responsekakao) {
                    window.location.href = responsekakao.data.redirect_url
                }
            } else {
                if (guestID) {
                    const response = await reservationApi.save({
                        userType: "guest",
                        user: guestID,
                        ...ticketInfo,
                        timetableId: 1
                    })
                    const responsekakao = await axios.post('/api/kakaopay/test/single', {
                        cid: 'TC0ONETIME',
                        partner_order_id: 'butter_studio',
                        partner_user_id: '000000'+ guestID,
                        item_name: ticketInfo.title,
                        item_code: ticketInfo.movieId,
                        quantity: ticketInfo.adult + ticketInfo.youth + ticketInfo.senior,
                        total_amount: ticketInfo.totalFee,
                        vat_amount: 0,
                        tax_free_amount: 0,
                        approval_url: 'http://localhost:3000/paymentcomplete',
                        fail_url: 'http://localhost:3000/ticket',
                        cancel_url: 'http://localhost:3000/ticket',
                    })
                    if (response||responsekakao) {
                        localStorage.setItem('tid',responsekakao.data.tid)
                        window.location.href = responsekakao.data.redirect_url
                    }
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
                                <input type="password" name="password" placeholder="비밀번호" onChange={handleChangeGuest} required style={{ width: "178px" }} />
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
                    <img src="/images/naverpay_button.png" style={{ width: "150px" }} />
                    <button onClick={kakaoBtnClick} style={{ backgroundColor: "black", border: '0' }}>
                        <img src="/images/payment_icon_yellow_medium.png" style={{ width: "130px" }} />
                    </button>
                    {element}
                    <div className="my-5">
                        <button className="btn btn-warning" type="button" style={{ width: "100%" }} onClick={reservationComplete}>결제하기</button>
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
                            <div>성인: {ticketInfo.adult}명</div>
                            <div>청소년: {ticketInfo.youth}명</div>
                            <div>경로우대: {ticketInfo.senior}명</div>
                            <div className="mt-2">총 결제금액: {ticketInfo.totalFee}원</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Payment