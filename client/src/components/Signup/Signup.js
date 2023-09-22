import { useState } from "react";
import { Redirect } from "react-router-dom";
import authApi from "../../apis/auth.api.js";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./signup.module.scss";

const Signup = () => {
    //회원정보
    const [user, setUser] = useState({
        userId: "",
        userName: "",
        userEmail: "",
        userNickName: "",
        userBirthday: "",
        userMbnum: "",
        userPassword: "",
        userRePassword: ""
    })
    const [startTime, setStartTime] = useState("");
    const [number, setNumber] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [mbError, setMbError] = useState(false);
    const [error, setError] = useState("");
    const [errorMsg, setErrorMsg] = useState({
        errorId: false,
        errorName: false,
        errorEmail: false,
        errorNickName: false,
        errorBirthday: false,
        errorMbnum: false,
        errorPassword: false,
    })
    //휴대폰 인증 가능해지면 false로 바꾸기
    const [confirmMb, setConfirmMb] = useState(true);

    const handleUserOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        if (e.target.name === "userBirthday" || e.target.name === "userMbum") {
            setUser({
                ...user,
                [e.target.name]: String(e.target.value)
            })
        }
    }
    const handleOnClickMbnum = async (e) => {
        e.preventDefault();
        try {
            setStartTime("");
            setError("");
            setLoading(true)
            const phone = user.userMbnum;
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
            const confirmNum = { userMbnum: user.userMbnum, number: number, startTime: startTime };
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

    const validationPw = () => {
        if (user.userPassword !== user.userRePassword) return false;
        else return true;
    }

    const handleOnSummit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            let validPw = validationPw();
            if (confirmMb) {
                if (validPw) {
                    const userData = user;
                    const error = await authApi.signup(userData);
                    if (error === "성공") setSuccess(true);
                    else {
                        setErrorMsg(error);
                        alert("형식에 맞게 다시 작성해주세요");
                    }
                } else throw new Error("비밀번호가 일치하지 않습니다.");
            } else throw new Error("핸드폰 번호를 인증해주세요.");
        } catch (error) {
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return <Redirect to="/login" />;
    }

    return (
        <form className={`d-flex col-md-6 col-12 justify-content-center`} onSubmit={handleOnSummit}>
            <div className="d-flex flex-column">
                <span className={styles.title}>회원가입</span>
                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>아이디</label>
                        <input className={`${styles.input} ${styles.inputSize}`} type="text" name="userId" placeholder="5~10자리 사이" onChange={handleUserOnChange} maxLength="10" />
                    </div>
                    {errorMsg.errorId && <p className={styles.errorMsg}>5~10자리 사이로 입력해주세요.</p>}
                </div>
                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>이름</label>
                        <input className={`${styles.input} ${styles.inputSize}`} type="text" name="userName" placeholder="이름을 입력해주세요" onChange={handleUserOnChange} maxLength="20" />
                    </div>
                    {errorMsg.errorName && <p className={styles.errorMsg}>이름을 입력해주세요</p>}
                </div>
                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>이메일</label>
                        <input className={`${styles.input} ${styles.inputSize}`} type="email" name="userEmail" placeholder="이메일을 입력해주세요" onChange={handleUserOnChange} maxLength="20" />
                    </div>
                    {errorMsg.errorEmail && <p className={styles.errorMsg}>이메일을 입력해주세요</p>}
                </div>
                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>별명</label>
                        <input className={`${styles.input} ${styles.inputSize}`} type="text" name="userNickName" placeholder="10자리 이내" onChange={handleUserOnChange} maxLength="20" />
                    </div>
                    {errorMsg.errorNickName && <p className={styles.errorMsg}>10자 이내로 입력해주세요.</p>}
                </div>
                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>생년월일</label>
                        <input className={`${styles.input} ${styles.inputSize} ${styles.input.placeholder}`} type="number" name="userBirthday" placeholder="6자리(예시: 991225)" onChange={handleUserOnChange} min="0" max="999999" />
                    </div>
                    {errorMsg.errorBirthday && <p className={styles.errorMsg}>숫자 6자리를 입력해주세요.</p>}
                </div>
                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>휴대폰 번호</label>
                        <div className="d-flex col-md-auto">
                            <input className={`${styles.input} ${styles.input2}`} type="number" name="userMbnum" placeholder="-없이 11자리 입력" onChange={handleUserOnChange} min="0" max="99999999999" />
                            <button type="button" disabled={loading} className={`rounded-2 mt-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={handleOnClickMbnum}>인증번호받기</button>
                        </div>
                    </div>
                    {errorMsg.errorMbnum && <p className={styles.errorMsg}>-없이 숫자 11자리를 입력해주세요.</p>}
                    <div className="collapse" id="collapseExample">
                        <div className="d-flex justify-content-between mt-3">
                            <label className={`${styles.confirm}`}>인증하기</label>
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
                    <div className={`${styles.inputContent}`}>
                        <label className={styles.signupLabel}>비밀번호</label>
                        <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userPassword" placeholder="8~11자리 사이" onChange={handleUserOnChange} maxLength="20" />
                    </div>
                    {errorMsg.errorPassword && <p className={styles.errorMsg}>8~11자리 사이로 입력해주세요.</p>}
                </div>
                <div className={`d-flex ${styles.inputContent}`}>
                    <label className={styles.signupLabel}>비밀번호 확인</label>
                    <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userRePassword" placeholder="8~11자리 사이" onChange={handleUserOnChange} maxLength="20" />
                </div>
                <button className={`rounded my-3 py-2 fs-5 ${styles.butterYellowAndBtn} ${styles.btnHover}`} type="submit" disabled={loading}>가입하기</button>
            </div>
        </form>
    )
}

export default Signup