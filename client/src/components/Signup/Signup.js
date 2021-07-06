import styles from "./signup.module.scss";

const Signup = () => {
    return (
        <div className={`d-flex ${styles.signup} col-md-8 col-12 justify-content-center`}>
            <div className="d-flex flex-column">
                        <input className={styles.input} type="text" name="guestName" id="guestName" placeholder="이름" minlength="8" required />
                        <input className={styles.input} type="text" name="gusetBirthday" id="gusetBirthday" placeholder="생년월일" minlength="8" required />
                        <input className={styles.input} type="text" name="gusetMbnum" id="gusetMbnum" placeholder="휴대폰 번호" minlength="8" required />
                        <input className={styles.input} type="text" name="guestPassword" id="password" placeholder="비밀번호" minlength="8" required />
                        <input className="bg-ButterYellow text-dark border-0 rounded-2 mt-2" type="submit" value="가입하기" />
                    </div>
        </div>
    )
}

export default Signup