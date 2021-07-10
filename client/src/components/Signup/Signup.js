import styles from "./signup.module.scss";
import { useState } from 'react';

const Signup = () => {

    const [userText, setUserState] = useState({
        userID: '',
        userName: '',
        userBirthday: '',
        userMbnum: '',
        userPassword: '',
        userRePassword: '',
    })

    const handleUserOnChange = (e) => {
        setUserState({
            ...userText,
            [e.target.name]: e.target.value
        })
    }

    // const handleOnInput = (e) => {
    //     if (el.value.length > e.target.attributes.docu) {
    //         el.value
    //             = el.value.substr(0, maxlength);
    //     }
    // }

    const comparePassword = () => {
        if (userText.userPassword !== userText.userRePassword) {
            return alert("비밀번호가 같지 않습니다.")
        }
    }

    return (
        <form className={`d-flex col-md-6 col-12 justify-content-center`}>
            <div className="d-flex flex-column">
                {console.log(userText)}
                <div className={styles.inputContent}>
                    <label className={styles.signupLabel}>아이디</label>
                    <div className="d-flex col-md-auto">
                        <input className={styles.input} type="text" name="userID" id="userID" placeholder="8자리입력" onChange={handleUserOnChange} maxLength="8" minlength="8" required />
                        <button type="button" className={`btn btn-primary rounded-2 mt-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} data-bs-toggle="modal" data-bs-target="#exampleModal">중복확인</button>
                    </div>
                </div>
                <div className={styles.inputContent}>
                    <label className={styles.signupLabel}>별명</label>
                    <input className={`${styles.input} ${styles.inputSize}`} type="text" name="userName" id="userName" placeholder="10자리 이내" onChange={handleUserOnChange} maxLength="10" required />
                </div>
                <div className={styles.inputContent}>
                    <label className={styles.signupLabel}>생년월일</label>
                    <input className={`${styles.input} ${styles.inputSize} ${styles.input.placeholder}`} type="number" name="userBirthday" id="userBirthday" placeholder="6자리(예시: 991225)" onChange={handleUserOnChange} maxLength="6" required />
                </div>
                <div className={styles.inputContent}>
                    <label className={styles.signupLabel}>휴대폰 번호</label>
                    <input className={`${styles.input} ${styles.inputSize}`} type="number" name="userMbnum" id="userMbnum" placeholder="-없이 11자리 입력" onChange={handleUserOnChange} required />
                </div>
                <div className={`${styles.inputContent}`}>
                    <label className={styles.signupLabel}>비밀번호</label>
                    <input className={`${styles.input} ${styles.inputSize}`} type="text" name="userPassword" id="password" placeholder="8자리 입력" onChange={handleUserOnChange} maxLength="8" minlength="8" required />
                </div>
                <div className={styles.inputContent}>
                    <label className={styles.signupLabel}>비밀번호 확인</label>
                    <div className="d-flex col-md-auto">
                        <input className={styles.input} type="text" name="userRePassword" id="userRePassword" placeholder="8자리 입력" onChange={handleUserOnChange} maxLength="8" minlength="8" required />
                        <button type="button" className={`rounded-2 mt-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} onClick={comparePassword}>중복확인</button>
                    </div>
                </div>

                <input className={`rounded-2 my-4 py-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} type="submit" value="가입하기" />
            </div>

            {/* 아이디 중복 확인 모달창 */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">아이디 중복 확인</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            이 아이디는 사용가능합니다.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>


    )
}

export default Signup