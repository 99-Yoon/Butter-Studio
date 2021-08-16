import axios from 'axios'
import { useEffect, useState } from 'react'
import authApi from '../../apis/auth.api'
import kakaopayApi from '../../apis/kakaopay.api'
import reservationApi from '../../apis/reservation.api'
import { useAuth } from '../../context/auth_context'
import catchErrors from '../../utils/catchErrors'
import styles from './PaymentPage.module.scss'

const Payment = ({ location }) => {
    const { user } = useAuth()
    const [guestInfo, setGuestInfo] = useState({
        name: "",
        email: "",
        birth: "",
        phoneNumber: "",
        password: "",
        rePassword: ""
    })
    const [errorMsg, setErrorMsg] = useState({
        errorName: false,
        errorEmail: false,
        errorBirthday: false,
        errorMbnum: false,
        errorPassword: false,
    })

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

    const [startTime, setStartTime] = useState("");
    const [number, setNumber] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mbError, setMbError] = useState(false);
    const [confirmMb, setConfirmMb] = useState(false);

    useEffect(() => {
        if (user.role === "member") {
            getUserInfo()
        }
    }, [])

    const getUserInfo = async () => {
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

    const handleChangeGuest = (e) => {
        setGuestInfo({
            ...guestInfo,
            [e.target.name]: String(e.target.value)
        })
        if (e.target.name === "birth" || e.target.name === "phoneNumber") {
            setGuestInfo({
                ...guestInfo,
                [e.target.name]: String(e.target.value)
            })
        }
    }
    //인증번호
    const handleOnClickMbnum = async (e) => {
        e.preventDefault();
        try {
            setStartTime("");
            setError("");
            setLoading(true)
            const phone = guestInfo.phoneNumber;
            const message = await authApi.confirmMbnum(phone);
            if (message.isSuccess) {
                setMbError("보냄");
                setStartTime(message.startTime);
            }
        } catch (error) {
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }

    const handleOnChangeMb = (e) => {
        setNumber(String(e.target.value));
    }

    const handleOnClickMbConfirm = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            const confirmNum = { userMbnum: guestInfo.phoneNumber, number: number, startTime: startTime };
            const message = await authApi.confirmNum(confirmNum);
            setMbError(message);
            if (message === "성공") {
                setConfirmMb(true);
            }
        } catch (error) {
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }
    //비밀번호 확인
    const validationPw = () => {
        if (guestInfo.password !== guestInfo.rePassword) return false;
        else return true;
    }

    const handleClickGuest = async () => {
        try {
            setError("")
            setLoading(true);
            let validPw = validationPw();
            if (confirmMb) {
                if (validPw) {
                    const response = await authApi.saveGuestInfo(guestInfo);
                    if (response.id) {
                        setGuestID(response.id)
                        alert("비회원 정보가 저장되었습니다.")
                    }
                    else {
                        setErrorMsg(response);
                        alert("형식에 맞게 다시 작성해주세요");
                    }
                } else throw new Error("비밀번호가 일치하지 않습니다.");
            } else throw new Error("핸드폰 번호를 인증해주세요.");
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    const kakaoBtnClick = () => {
        setElement(
            <div className="text-center">
                <p className=" font-weight-bold" style={{ display: 'inline', color: "#FEDC00" }}>'카카오페이'</p><p style={{ display: 'inline' }}>를 선택하셨습니다. </p>
                <p>결제하기를 눌러 결제를 이어가주세요.</p>
            </div>
        )
        setTicketInfo({ ...ticketInfo, payment: "카카오페이" })
    }

    const reservationComplete = async () => {
        try {
            setError("")
            if (user.role === "member") {
                const response = await reservationApi.save({
                    userType: "member",
                    user: userInfo.id,
                    ...ticketInfo,
                })
                const responsekakao = await kakaopayApi.approveReq({
                    cid: 'TC0ONETIME',
                    partner_order_id: 'butter_studio',
                    partner_user_id: '000000' + guestID,
                    item_name: ticketInfo.title,
                    item_code: ticketInfo.movieId,
                    quantity: ticketInfo.adult + ticketInfo.youth + ticketInfo.senior,
                    total_amount: ticketInfo.totalFee,
                    vat_amount: 0,
                    tax_free_amount: 0,
                    approval_url: 'http://localhost:3000/paymentcomplete',
                    fail_url: 'http://localhost:3000/paymentfail',
                    cancel_url: 'http://localhost:3000/paymentfail',
                })
                if (response && responsekakao) {
                    localStorage.setItem('tid', responsekakao.tid)
                    window.location.href = responsekakao.redirect_url
                }
            } else {
                if (guestID) {
                    const response = await reservationApi.save({
                        userType: "guest",
                        user: guestID,
                        ...ticketInfo,
                    })
                    const responsekakao = await kakaopayApi.approveReq({
                        cid: 'TC0ONETIME',
                        partner_order_id: 'butter_studio',
                        partner_user_id: '000000' + guestID,
                        item_name: ticketInfo.title,
                        item_code: ticketInfo.movieId,
                        quantity: ticketInfo.adult + ticketInfo.youth + ticketInfo.senior,
                        total_amount: ticketInfo.totalFee,
                        vat_amount: 0,
                        tax_free_amount: 0,
                        approval_url: 'http://localhost:3000/paymentcomplete',
                        fail_url: 'http://localhost:3000/paymentfail',
                        cancel_url: 'http://localhost:3000/paymentfail',
                    })
                    if (response && responsekakao) {
                        localStorage.setItem('tid', responsekakao.tid)
                        window.location.href = responsekakao.redirect_url
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
                            <div className="d-flex flex-column">
                                <div className="my-1">
                                    <label className={styles.labelStyle}>이름</label>
                                    <input type="text" name="name" placeholder="이름" onChange={handleChangeGuest} />
                                </div>
                                {errorMsg.errorName && <p className={styles.errorMsg}>이름을 입력해주세요</p>}
                            </div>
                            <div className="d-flex flex-column">
                                <div className="my-1">
                                    <label className={styles.labelStyle}>이메일</label>
                                    <input type="email" name="email" placeholder="이메일" onChange={handleChangeGuest} />
                                </div>
                                {errorMsg.errorEmail && <p className={styles.errorMsg}>이메일을 입력해주세요</p>}
                            </div>
                            <div className="d-flex flex-column">
                                <div className="my-1">
                                    <label className={styles.labelStyle}>생년월일</label>
                                    <input type="number" name="birth" placeholder="생년월일" onChange={handleChangeGuest} maxLength="6" />
                                </div>
                                {errorMsg.errorBirthday && <p className={styles.errorMsg}>숫자 6자리를 입력해주세요.</p>}
                            </div>
                                <div className="d-flex flex-column">
                                <div className="my-1">
                                    <label className={styles.labelStyle}>휴대폰 번호</label>
                                    <input type="number" name="phoneNumber" placeholder="휴대폰 번호" onChange={handleChangeGuest} maxLength="11" />
                                    <button type="button" disabled={loading} className={`rounded-2 mt-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={handleOnClickMbnum}>인증번호받기</button>
                                </div>
                                {errorMsg.errorMbnum && <p className={styles.errorMsg}>-없이 숫자 11자리를 입력해주세요.</p>}
                                <div className="collapse" id="collapseExample">
                                    <div className="d-flex justify-content-center align-items-center mt-3">
                                        <label className={styles.labelStyle}>인증하기</label>
                                        <div>
                                            <input className={`${styles.input} ${styles.input2}`} type="number" placeholder="인증번호를 입력" onChange={handleOnChangeMb} />
                                            <button type="button" className={`rounded-2 py-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} onClick={handleOnClickMbConfirm}>확인</button>
                                            <button type="button" className={`rounded-2 py-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} onClick={handleOnClickMbnum}>재전송</button>
                                        </div>
                                    </div>
                                    {(mbError === "재전송") && <p className={styles.errorMsg}>유효시간이 만료되었습니다. 재전송해주세요.</p>}
                                    {(mbError === "보냄") && <p className={styles.errorMsg}>5분이내에 입력해주세요.</p>}
                                    {(mbError === "성공") && <p className={styles.errorMsg}>인증되었습니다.</p>}
                                    {(mbError === "실패") && <p className={styles.errorMsg}>인증번호를 다시 입력해주세요.</p>}
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="my-1">
                                    <label className={styles.labelStyle}>비밀번호</label>
                                    <input type="password" name="password" placeholder="비밀번호" onChange={handleChangeGuest} style={{ width: "178px" }} />
                                </div>
                                {errorMsg.errorPassword && <p className={styles.errorMsg}>8~11자리 사이로 입력해주세요.</p>}
                            </div>
                            <div className="d-flex flex-column">
                                <div className="my-1">
                                    <label className={styles.labelStyle}>비밀번호 확인</label>
                                    <input type="password" name="rePassword" placeholder="비밀번호 확인" onChange={handleChangeGuest} style={{ width: "178px" }} />
                                </div>
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
                        <div className="mb-3">{ticketInfo.selectedTheater}관 {ticketInfo.selectedSeats.map(el => String.fromCharCode(parseInt(el.split('-')[0]) + 64) + el.split('-')[1]) + ' '}</div>
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