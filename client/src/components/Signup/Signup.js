import styles from "./signup.module.scss";

const Signup = () => {
    return (
        <div className={`d-flex ${styles.signup} col-md-8 col-12 align-items-center`}>
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
    )
}

export default Signup