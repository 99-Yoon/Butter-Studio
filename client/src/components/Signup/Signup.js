import styles from "./signup.module.scss";
import { useState } from 'react';

const Signup = () => {

    const [userText, setUserState] = useState({
        userName: '',
        userBirthday: '',
        userMbnum: '',
        userPassword: '',
        userRePassword: ''
    })

    const handleUserOnChange = (e) => {
        setUserState({
            ...userText,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className={`d-flex ${styles.signup} col-md-8 col-12 justify-content-center`}>
            <div className="d-flex flex-column">
                {console.log(userText)}
                <div className={styles.contents}>
                    <label className={styles.signupLabel}>아이디</label>
                    <input className={styles.input} type="text" name="userName" id="userID" placeholder="8자리" onChange={handleUserOnChange} minlength="8" required />
                    <button className={` border-0 rounded-2 mt-2 ${styles.butterYellow} ${styles.btnHover}`}>중복확인</button>
                </div>
                <div className={styles.contents}>
                    <label className={styles.signupLabel}>별명</label>
                    <input className={styles.input} type="text" name="userName" id="userName" placeholder="별명" onChange={handleUserOnChange} minlength="8" required />
                </div>
                <div className={styles.contents}>
                    <label className={styles.signupLabel}>생년월일</label>
                    <input className={styles.input} type="number" name="userBirthday" id="userBirthday" placeholder="6자리" onChange={handleUserOnChange} minlength="6" required />
                </div>
                <div className={styles.contents}>
                    <label className={styles.signupLabel}>휴대폰 번호</label>
                    <input className={styles.input} type="number" name="userMbnum" id="userMbnum" placeholder="-없이 8자리 입력" onChange={handleUserOnChange} minlength="8" required />
                </div>
                <div className={styles.contents}>
                    <label className={styles.signupLabel}>비밀번호</label>
                    <input className={styles.input} type="text" name="userPassword" id="password" placeholder="비밀번호" onChange={handleUserOnChange} minlength="8" required />
                    <input className={styles.input} type="text" name="userRePassword" id="password" placeholder="비밀번호 확인" onChange={handleUserOnChange} minlength="8" required />
                </div>

                <input className={` border-0 rounded-2 mt-2 ${styles.butterYellow} ${styles.btnHover}`} type="submit" value="가입하기" />
            </div>
        </div>
    )
}

export default Signup