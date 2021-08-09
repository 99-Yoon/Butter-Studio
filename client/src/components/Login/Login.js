import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth_context.js";
import catchErrors from "../../utils/catchErrors";
import styles from "./login.module.scss";

const Login = () => {
    const { login, guestLogin, loading } = useAuth();
    //useState를 이용해서 각 state 생성 및 초기값 저장
    const [state, setState] = useState(true); // 이 줄은 css에 해당하는 state
    //state변수 지정 하지만 이 변수는 react에 의해 없어지지 않음, 그리고 그 다음 변수는 state변수를 갱신해주는 함수
    const [user, setUser] = useState({
        id: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [guest, setGuset] = useState({
        guestName: "",
        guestEmail: "",
        guestBirthday: "",
        guestMbnum: "",
        guestPassword: ""
    })

    const handleLoginOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    const handleGuestOnChange = (e) => {
        setGuset({
            ...guest,
            [e.target.name]: e.target.value
        })
    }

    const requestServer = async (data) => {
        try {
            if (data === user) {
                const success = await login(data);
                if (success) {
                    setSuccess("member");
                    alert('로그인이 완료되었습니다.')
                }
            } else {
                const success = await guestLogin(data);
                if (success) {
                    setSuccess("guest");
                    alert('로그인이 완료되었습니다.')
                }
            }
        } catch (error) {
            catchErrors(error, setError);
        }
    }

    const handleOnSummit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            if (e.target.name === "login") {
                requestServer(user);
            }
            else {
                requestServer(guest);
            }
        } catch (error) {
            catchErrors(error, setError);
        }
    }

    if (success === "member") {
        return <Redirect to="/" />;
    } else if (success === "guest"){
        return <Redirect to="/guest" />;
    }

    return (
        <div className={`d-flex flex-column col-md-5 col-10`}>
            <span className={styles.title}>로그인</span>
            <ul className="nav nav-fill nav-tabs w-100" id="loginTab" role="tablist">
                <li className="nav-item fs-6" role="presentation">
                    <button className={`nav-link active px-2 ${styles.fontSize}`} style={{ color: state ? "black" : "#FEDC00", backgroundColor: state ? "#FEDC00" : "black" }}
                        id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true"
                        onClick={() => setState(true)}>로그인</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className={`nav-link px-2 ${styles.fontSize}`}
                        id="guest-tab" data-bs-toggle="tab" data-bs-target="#guest" type="button" role="tab" aria-controls="guest" aria-selected="false"
                        onClick={() => setState(false)} style={{ color: state ? "#FEDC00" : "black", backgroundColor: state ? "black" : "#FEDC00" }}>비회원 예매 확인</button>
                </li>
            </ul>
            <div className="tab-content w-100" id="myTabContent">
                <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                    <form className="d-flex flex-column" name="login" onSubmit={handleOnSummit}>
                        <input className={styles.input} type="text" name="id" placeholder="ID" onChange={handleLoginOnChange} maxLength="10"/>
                        <input className={styles.input} type="password" name="password" placeholder="Password" onChange={handleLoginOnChange} maxLength="11"/>
                        <input className={`rounded-2 mt-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} type="submit" value="Login" disabled={loading} />
                        <span><a href="./signup" className={styles.intoSignupPage}>회원이 아니십니까?</a></span>
                    </form>
                </div>
                <div className="tab-pane fade" id="guest" role="tabpanel" aria-labelledby="guest-tab">
                    <form className="d-flex flex-column" onSubmit={handleOnSummit}>
                        <input className={styles.input} type="text" name="guestName" id="guestName" placeholder="이름" onChange={handleGuestOnChange} maxLength="10"/>
                        <input className={styles.input} type="email" name="guestEmail" id="guestEmail" placeholder="이메일" onChange={handleGuestOnChange} maxLength="20"/>
                        <input className={styles.input} type="number" name="guestBirthday" id="guestBirthday" placeholder="생년월일" onChange={handleGuestOnChange}  min="0" max="999999" />
                        <input className={styles.input} type="number" name="guestMbnum" id="guestMbnum" placeholder="휴대폰 번호" onChange={handleGuestOnChange}  min="0" max="99999999999" />
                        <input className={styles.input} type="password" name="guestPassword" id="guestPassword" placeholder="비밀번호" onChange={handleGuestOnChange} maxLength="20"/>
                        <p className={`text-white ${styles.fontSizeTwo}`}>
                            ※ 비회원 정보 오 입력 시 예매 내역 확인/취소 및 티켓 발권이 어려울 수 있으니 다시 한번 확인해 주시기 바랍니다.
                        </p>
                        <input className={`rounded-2 mt-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} type="submit" value="비회원 예매 확인" disabled={loading} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login