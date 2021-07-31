import styles from "./signup.module.scss";
import { useState } from "react";
import authApi from "../../apis/auth.api.js";
import { Redirect } from "react-router-dom";
import catchErrors from "../../utils/catchErrors.js";

const Signup = () => {
    const [user, setUser] = useState({
        userId: "",
        userEmail: "",
        userNickName: "",
        userBirthday: "",
        userMbnum: "",
        userPassword: "",
        userRePassword: ""
    })

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    //각 타입별 error 유무 state
    const [error, setError] = useState("");
    const [errorMsg, setErrorMsg] = useState({
        errorId: null,
        errorEmail: false,
        errorNickName: false,
        errorBirthday: false,
        errorMbnum: false,
        errorPassword: false,
        errorRePassword: false
    })
    // id중복확인 여부 state와 가입하기 누르면 id 임시 저장
    const [overlapId, setOverlapId] = useState(false);
    const [preId, setPreId] = useState("");

    //입력할때마다 state에 저장
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

    //id(중복확인 체크, 형식 에러)
    const handleOnClickId = async (e) => {
        e.preventDefault();
        try {
            setError("");
            if (user.userId.length < 5) {
                setErrorMsg(errorMsg => ({
                    ...errorMsg,
                    [e.target.name]: true
                }));
                if (overlapId === true) {
                    setOverlapId(() => (false));
                };
            } else {
                const userId = user.userId;
                await authApi.compareId(userId);
                if (!await authApi.compareId(userId)) {
                    alert("이 아이디는 사용가능합니다.")
                    setErrorMsg(errorMsg => ({
                        ...errorMsg,
                        [e.target.name]: false
                    }));
                    setOverlapId(() => (true));
                } else {
                    alert("이미 사용중인 아이디입니다.")
                    setOverlapId(() => (false));
                }
            }
        } catch (error) {
            catchErrors(error, setError)
        } finally {
            setLoading(false);
        }
    }

    const handleOnClickMbnum = async (e) => {
        try {
            const id = "AC01ecdbffb36dc0766cfea487a54a4c6e";
            const token = "1d86d5d43760b5dce5582badf7b0a775";
            await authApi.confirmMbnum(id,token);
        } catch (error) {
            console.log('twilio error'+ error)
        }
    }

    const handleOnSummit = async (e) => {
        e.preventDefault();
        try {
            setError(() => (""));
            //처리가 될때까지 버튼(가입하기)이 안눌리게 지정
            setLoading(() => (true));
            //유효성 검사
            validation();
            const userData = user;
            //서버로 전송
            await authApi.signup(userData)
            alert("가입이 완료되었습니다. 로그인 해주세요.");
            setSuccess(true);
        } catch (error) {
            //에러전송
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }

    //비교하여 error메세지 반환
    const vaildationData = (text, compareValue, error) => {
        if (text !== compareValue) {
            setErrorMsg(errorMsg => ({ ...errorMsg, [error]: true }));
        } else {
            setErrorMsg(errorMsg => ({ ...errorMsg, [error]: false }));
        }
    }
    //아이디 비번 유효성 검사
    const vaildationIdPw = (text, minValue, error) => {
        if ((text < minValue)) {
            setErrorMsg(errorMsg => ({ ...errorMsg, [error]: true }));
        } else if (text >= minValue) {
            setErrorMsg(errorMsg => ({ ...errorMsg, [error]: false }));
            if (overlapId === true) {
                if (preId !== user.userId) {
                    setOverlapId(false);
                }
            }
        }
    }
    //유효성 검사
    const validation = () => {
        setPreId(user.userId);
        //아이디 유효성 검사
        vaildationIdPw(user.userId.length, 5, "errorId");
        //별명 유효성 검사
        vaildationData((user.userNickName.length === 0), false, "errorNickName");
        // 생일 유효성 검사
        vaildationData(user.userBirthday.length, 6, "errorBirthday");
        // 휴대폰 유효성 검사
        vaildationData(user.userMbnum.length, 11, "errorMbnum");
        // 비밀번호 유효성 검사
        vaildationIdPw(user.userPassword.length, 8, "errorPassword");
        // 비밀번호 확인 유효성 검사
        vaildationData(user.userRePassword, user.userPassword, "errorRePassword");

        // 최종 유효성 검사
        if (overlapId && (Object.values(errorMsg).some((element) => (element)) === false)) {
        } else if (!overlapId && (Object.values(errorMsg).some((element) => (element)) === false)) {
            setErrorMsg(errorMsg => ({ ...errorMsg, errorId: false }));
            throw new Error("먼저 아이디 중복확인을 해주세요");
        } else {
            throw new Error("유효하지 않은 데이터입니다.");
        }
    }

    if (success) {
        return <Redirect to="/login" />;
    }


    return (
        // 데이터 입력과 유효성 검사 후 보이는 경고창
        <form className={`d-flex col-md-6 col-12 justify-content-center`} onSubmit={handleOnSummit}>
            <div className="d-flex flex-column">
                <span className={styles.title}>회원가입</span>
                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>아이디</label>
                        <div className="d-flex col-md-auto">
                            <input className={styles.input} type="text" name="userId" placeholder="5~10자리 사이" onChange={handleUserOnChange} maxLength="10" required />
                            <button type="button" disabled={loading} name="errorId" className={`rounded-2 mt-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} onClick={handleOnClickId}>중복확인</button>
                        </div>
                    </div>
                    {(overlapId === false) && errorMsg.errorId && <p className={styles.passwordConfirmError}>5~10자리 사이로 입력해주세요.</p>}
                    {overlapId && (errorMsg.errorId === false) && <p className={styles.passwordConfirmError}>아이디 중복이 확인되었습니다.</p>}
                    {(errorMsg.errorId === false) && (overlapId === false) && <p className={styles.passwordConfirmError}>아이디 중복확인을 해주세요.</p>}
                </div>
                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>이메일</label>
                        <input className={`${styles.input} ${styles.inputSize}`} type="email" name="userEmail" placeholder="이메일을 입력해주세요" onChange={handleUserOnChange} maxlength="20" required />
                    </div>
                    {errorMsg.errorEmail && <p className={styles.passwordConfirmError}>이메일을 입력해주세요</p>}
                </div>
                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>별명</label>
                        <input className={`${styles.input} ${styles.inputSize}`} type="text" name="userNickName" placeholder="10자리 이내" onChange={handleUserOnChange} maxLength="10" required />
                    </div>
                    {errorMsg.errorNickName && <p className={styles.passwordConfirmError}>10자 이내로 입력해주세요.</p>}
                </div>

                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>생년월일</label>
                        <input className={`${styles.input} ${styles.inputSize} ${styles.input.placeholder}`} type="number" name="userBirthday" placeholder="6자리(예시: 991225)" onChange={handleUserOnChange} min="0" max="999999" required />
                    </div>
                    {errorMsg.errorBirthday && <p className={styles.passwordConfirmError}>숫자 6자리를 입력해주세요.</p>}
                </div>

                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>휴대폰 번호</label>
                        <div className="d-flex col-md-auto">
                            <input className={`${styles.input}`} type="number" name="userMbnum" placeholder="-없이 11자리 입력" onChange={handleUserOnChange} min="" max="99999999999" required />
                            <button type="button" disabled={loading} name="errorId" className={`rounded-2 mt-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} onClick={handleOnClickMbnum}>인증번호받기</button>
                        </div>
                    </div>
                    {errorMsg.errorMbnum && <p className={styles.passwordConfirmError}>-없이 숫자 11자리를 입력해주세요.</p>}
                </div>
                <div className="d-flex flex-column">
                    <div className={`${styles.inputContent}`}>
                        <label className={styles.signupLabel}>비밀번호</label>
                        <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userPassword" placeholder="8~11자리 사이" onChange={handleUserOnChange} maxLength="11" required />
                    </div>
                    {errorMsg.errorPassword && <p className={styles.passwordConfirmError}>8~11자리 사이로 입력해주세요.</p>}
                </div>

                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>비밀번호 확인</label>
                        <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userRePassword" placeholder="8~11자리 사이" onChange={handleUserOnChange} maxLength="11" required />
                    </div>
                    {errorMsg.errorRePassword && <p className={styles.passwordConfirmError}>비밀번호가 일치하지 않습니다.</p>}
                </div>

                <button className={`rounded my-3 py-2 fs-5 ${styles.butterYellowAndBtn} ${styles.btnHover}`} type="submit" disabled={loading}>가입하기</button>
            </div>
        </form>
    )
}

export default Signup