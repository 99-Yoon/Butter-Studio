import { useState } from "react";
import styles from "./login.module.scss";

const Login = () => {
    const [state, setState] = useState(true)

    return (
        <div className={`d-flex flex-column col-md-5 col-10`}>
            {/* nav-tabs */}
            <ul className="nav nav-fill nav-tabs w-100" id="loginTab" role="tablist">
                <li className="nav-item fs-6" role="presentation">
                    <button className={`nav-link active px-2 ${styles.fontSize}`} style={{ color: state ? "black" : "yellow", backgroundColor: state ? "yellow" : "black"}} 
                    id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true" 
                    onClick={() => setState(true)}>로그인</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className={`nav-link px-2 ${styles.fontSize}`}
                    id="guest-tab" data-bs-toggle="tab" data-bs-target="#guest" type="button" role="tab" aria-controls="guest" aria-selected="false" 
                    onClick={() => setState(false)} style={{ color: state ? "yellow" : "black", backgroundColor: state ? "black" : "yellow" }}>비회원 예매 확인</button>
                </li>
            </ul>

            <div className="tab-content w-100" id="myTabContent">
                {/* 로그인 */}
                <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                    <div className="d-flex flex-column ">
                        <input className={styles.input} type="text" name="id" id="id" placeholder="ID" />
                        <input className={styles.input} type="text" name="password" id="password" placeholder="Password" minlength="8" required />
                        <input className="bg-ButterYellow text-dark border-0 rounded-2 mt-2" type="submit" value="Login" />
                        <span><a href="./signup" className={styles.intoSignupPage}>회원이 아니십니까?</a></span>
                    </div>
                </div>

                {/* 비회원예매 학인 */}
                <div className="tab-pane fade" id="guest" role="tabpanel" aria-labelledby="guest-tab">
                    <div className="d-flex flex-column">
                        <input className={styles.input} type="text" name="id" id="id" placeholder="ID" />
                        <input className={styles.input} type="text" name="password" id="password" placeholder="Password" minlength="8" required />
                        <p className={`text-white ${styles.fontSize}`}>
                            ※ 비회원 정보 오 입력 시 예매 내역 확인/취소 및 티켓 발권이 어려울 수 있으니 다시 한번 확인해 주시기 바랍니다.
                        </p>
                            <input className="bg-ButterYellow text-dark border-0 rounded-2 mt-2" type="submit" value="비회원 예매 확인" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login