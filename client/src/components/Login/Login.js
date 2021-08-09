import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth_context.js";
import catchErrors from "../../utils/catchErrors";
import styles from "./login.module.scss";

const Login = () => {
    const { login, loading } = useAuth();
    const [state, setState] = useState(true);
    const [user, setUser] = useState({
        id: '',
        password: ''
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [guest, setGuset] = useState({
        guestName: '',
        gusetBirthday: '',
        gusetMbnum: '',
        guestPassword: ''
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
        if (data === user) {
            const success = await login(data);
            if (success) {
                setSuccess(true);
                alert('로그인이 완료되었습니다.')
            }
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
                alert('로그인이 완료되었습니다.')
            }
        } catch (error) {
            catchErrors(error, setError);
        }
    }

    if (success) {
        return <Redirect to="/" />;
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
                        <input className={styles.input} type="text" name="id" placeholder="ID" onChange={handleLoginOnChange} maxLength="10" required />
                        <input className={styles.input} type="password" name="password" placeholder="Password" onChange={handleLoginOnChange} maxLength="11" required />
                        <input className={`rounded-2 mt-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} type="submit" value="Login" disabled={loading} />
                        <span><a href="./signup" className={styles.intoSignupPage}>회원이 아니십니까?</a></span>
                    </form>
                </div>
                <div className="tab-pane fade" id="guest" role="tabpanel" aria-labelledby="guest-tab">
                    <form className="d-flex flex-column" onSubmit={handleOnSummit}>
                        <input className={styles.input} type="text" name="guestName" id="guestName" placeholder="이름" onChange={handleGuestOnChange} maxLength="5" required />
                        <input className={styles.input} type="email" name="guestEmail" id="guestEmail" placeholder="이메일" onChange={handleGuestOnChange} maxLength="16" required />
                        <input className={styles.input} type="number" name="gusetBirthday" id="gusetBirthday" placeholder="생년월일" onChange={handleGuestOnChange} maxLength="6" required />
                        <input className={styles.input} type="number" name="gusetMbnum" id="gusetMbnum" placeholder="휴대폰 번호" onChange={handleGuestOnChange} maxLength="11" required />
                        <input className={styles.input} type="password" name="guestPassword" id="password" placeholder="비밀번호" onChange={handleGuestOnChange} maxLength="11" required />
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