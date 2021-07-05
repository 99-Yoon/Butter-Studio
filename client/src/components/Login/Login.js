import { useState } from "react";
import styles from "./login.module.scss";

const Login = () => {
    const [state, setState] = useState(true)

    return (
        <div className={`d-flex ${styles.login} col-md-8 col-12 align-items-center`}>
            {/* nav-tabs */}
                <ul className="nav nav-fill nav-tabs" id="loginTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" style={{ color: state ? "black" : "yellow", }} id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true" onClick={() => setState(true)}>로그인</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link bg-black"
                            id="guest-tab" data-bs-toggle="tab" data-bs-target="#guest" type="button" role="tab" aria-controls="guest" aria-selected="false" onClick={() => setState(false)} style={{ color: state ? "yellow" : "black" }}>비회원 예매 확인</button>
                    </li>
                </ul>

            <div className="tab-content" id="myTabContent">
                {/* 로그인 */}
                <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                    <div className={styles.inputContents}>
                        <input type="text" name="id" id="id" placeholder="ID" />
                        <input type="text" name="password" id="password" placeholder="Password" minlength="8" required />
                        <input className={styles.loginBtn} type="submit" value="Login" />
                        <span><a href="./signup" className={styles.SignupPage}>회원이 아니십니까?</a></span>
                    </div>
                </div>

                {/* 비회원예매 학인 */}
                <div className="tab-pane fade" id="guest" role="tabpanel" aria-labelledby="guest-tab">
                    <table>
                        <colgroup>
                            <col class="col1" />
                            <col />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>
                                    <label for="guestName">이름</label>
                                </th>
                                <td><input type="text" placeholder="이름" /></td>
                            </tr>
                            <tr>
                                <th>
                                    <label for="guestBirthday">생년월일</label>
                                </th>
                                <td><input type="text" placeholder="생년월일(6자리)" /></td>
                            </tr>
                            <tr>
                                <th>
                                    <label for="guestMbnum">휴대폰 번호</label>
                                </th>
                                <td><input type="text" placeholder="'-'없이 입력" /></td>
                            </tr>
                            <tr>
                                <th>
                                    <label for="guestPassword">비밀번호</label>
                                </th>
                                <td><input type="password" placeholder="숫자 4자리" /></td>
                            </tr>
                            <tr>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        ※ 비회원 정보 오 입력 시 예매 내역 확인/취소 및 티켓 발권이 어려울 수 있으니 다시 한번 확인해 주시기 바랍니다.
                    </p>
                    <div class="guestLoginBtn">
                        <input class="guestLoginBtn" type="submit" value="비회원 예매 확인" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login