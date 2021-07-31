import styles from "./my-info.module.scss";
import { useAuth } from "../../context/auth_context";
import { useState, useEffect } from "react";
import authApi from "../../apis/auth.api";
import catchErrors from "../../utils/catchErrors.js";

const MyInfo = () => {
    const { user } = useAuth();
    const [userNickName, setUserNickName] = useState("사용자");

    // 사용자 이름 가져오는 함수
    const getNickName = async (id) => {
        const nickname = await authApi.getNickName(id);
        setUserNickName(nickname);
    }

    //현재 비밀번호 state
    const [presentPw, setPresentPw] = useState("");
    const [loading, setLoading] = useState(false);
    const [style, setStyle] = useState("visually-hidden-focusable");

    //변경할 데이터 입력받는 state
    const [userRe, setUserRe] = useState({
        userEmail: "",
        userNickName: "",
        userMbnum: "",
        userPassword: "",
        userRePassword: ""
    })

    //각 타입별 error 유무 state
    const [error, setError] = useState("");
    const [errorMsg, setErrorMsg] = useState({
        errorEmail: false,
        errorNickName: false,
        errorMbnum: false,
        errorPassword: false,
        errorRePassword: false
    })

    useEffect(() => {
        getNickName(user.id);
    }, [])

    const handlePwOnChange = (e) => {
        setPresentPw(e.target.value)
    }

    //입력할때마다 state에 저장
    const handleUserOnChange = (e) => {
        setUserRe({
            ...userRe,
            [e.target.name]: e.target.value
        })
        if (e.target.name === "userMbnum") {
            setUserRe({
                ...userRe,
                [e.target.name]: String(e.target.value)
            })
        }
    }
    const enterKey = (e) => {
        if (e.key === "Enter") {

            handleOnSummitVerify(e);
        }
    }
    //기존 비밀번호 확인 
    const handleOnSummitVerify = async (e) => {
        e.preventDefault();
        try {
            setError(() => (""));
            setLoading(() => (true));
            const pw = presentPw;
            const confirmPw = await authApi.comparePw(pw);
            if (confirmPw) {
                setStyle("");
            } else {
                setStyle("visually-hidden-focusable");
                alert("비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
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

    const vaildationIdPw = (text, minValue, error) => {
        if ((text < minValue)) {
            setErrorMsg(errorMsg => ({ ...errorMsg, [error]: true }));
        } else {
            setErrorMsg(errorMsg => ({ ...errorMsg, [error]: false }));
        }
    }
    //유효성 검사
    const validation = async () => {
        try {//별명 유효성 검사
            vaildationData((userRe.userNickName.length === 0), false, "errorNickName");
            // 휴대폰 유효성 검사
            vaildationData(userRe.userMbnum.length, 11, "errorMbnum");
            // 비밀번호 유효성 검사
            vaildationIdPw(userRe.userPassword.length, 8, "errorPassword");
            // 비밀번호 확인 유효성 검사
            vaildationData(userRe.userPassword, userRe.userRePassword, "errorRePassword");

            // 최종 유효성 검사
            if ((Object.values(errorMsg).some((element) => (element)) === false)) {
                return true
            } else {
                throw new Error("유효하지 않은 데이터입니다.");
            }
        } catch (error) {
            catchErrors(error, setError);
        }
    }


    const handleOnSummit = async (e) => {
        e.preventDefault();
        try {

            setError(() => (""));
            //처리가 될때까지 버튼(가입하기)이 안눌리게 지정
            setLoading(() => (true));
            console.log("userRe : " + userRe.userEmail);
            //유효성 검사
            const vaild = validation();
            if (vaild) {
                const userData = userRe;
                console.log(userData);
                //서버로 전송
                const process = await authApi.modifyUser(userData);
                console.log("process : " + process);
                alert("회원정보 수정 완료");
            }
        } catch (error) {
            //에러전송
            catchErrors(error, setError);
        } finally {
            setLoading(() => (false));
        }
    }



    return (
    <>
        {/* 마이페이지 창 */}
        <div className="d-flex flex-column">
            <span className={styles.title}>마이페이지</span>
            <div className="d-flex flex justify-content-center">
                <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F1e%2F1c%2F2e%2F1e1c2e4e07f5c440c3adad38bcd6f854.jpg&type=a340"
                className="img-fluid px-5 rounded-circle" />
                {/* <button type="submit"></button> */}
                <div className="d-flex flex-column py-4 justify-content-around">
                    <span className={`${styles.userName}`}>{`${userNickName}`}님 반갑습니다!</span>
                    <button className={`rounded my-3 fs-5 ${styles.butterYellowAndBtn} ${styles.btnHover}`} data-bs-toggle="modal" href="#verifyPassword" >회원정보 수정</button>
                </div>
            </div>
        </div>

        {/* 기존 비밀번호 확인 모달창 */}
        <div className="modal fade" id="verifyPassword" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" aria-labelledby="verifyPasswordLabel" tabindex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <form className="modal-content" onSubmit={handleOnSummitVerify}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="verifyPasswordLabel">기존 비밀번호 확인</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div clasNames="modal-body">
                        <div className="d-flex flex-column ">
                            <div className="d-flex justify-content-around align-items-center my-4">
                                <label className={styles.signupLabel}>현재 비밀번호</label>
                                <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userPassword" placeholder="8~11자리 사이" onChange={handlePwOnChange} onKeyPress={enterKey} maxLength="11" required />
                            </div>
                            {(style !== "visually-hidden-focusable") && <p className={styles.passwordConfirmError}>다음을 클릭해주세요.</p>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className={`${style} rounded my-3 fs-5 ${styles.butterYellowAndBtn} ${styles.btnHover}`} data-bs-target="#modify" data-bs-toggle="modal" data-bs-dismiss="modal" disable={style === "visually-hidden-focusable"}>다음</button>
                        <button type="submit" className={`rounded my-3 fs-5 ${styles.butterYellowAndBtn} ${styles.btnHover}`} disabled={loading}>확인</button>

                    </div>
                </form>
            </div>
        </div>

        {/* 회원정보 수정 모달창 */}
        <div className="modal fade" id="modify" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" aria-labelledby="modifyLabel" tabindex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <form className={`modal-content d-flex col-md-6 col-12 justify-content-center d-flex flex-column`} onSubmit={handleOnSummit}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="modifyLabel">회원정보 수정</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className={`modal-body`}>
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
                                <label className={styles.signupLabel}>휴대폰 번호</label>
                                <div className="d-flex col-md-auto">
                                    <input className={`${styles.input} ${styles.inputSize}`} type="number" name="userMbnum" placeholder="-없이 11자리 입력" onChange={handleUserOnChange} min="" max="99999999999" required />
                                </div>
                            </div>
                            {errorMsg.errorMbnum && <p className={styles.passwordConfirmError}>-없이 숫자 11자리를 입력해주세요.</p>}
                        </div>

                        <div className="d-flex flex-column">
                            <div className={styles.inputContent}>
                                <label className={styles.signupLabel}>새 비밀번호</label>
                                <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userPassword" placeholder="8~11자리 사이" onChange={handleUserOnChange} maxLength="11" required />
                            </div>
                            {errorMsg.errorPassword && <p className={styles.passwordConfirmError}>8~11자리 사이로 입력해주세요.</p>}

                        </div>

                        <div className="d-flex flex-column">
                            <div className={styles.inputContent}>
                                <label className={styles.signupLabel}>새 비밀번호 확인</label>
                                <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userRePassword" placeholder="8~11자리 사이" onChange={handleUserOnChange} maxLength="11" required />
                            </div>
                            {errorMsg.errorRePassword && <p className={styles.passwordConfirmError}>비밀번호가 일치하지 않습니다.</p>}

                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary rounded my-3 py-2 fs-5" data-bs-dismiss="modal" disabled={loading}>닫기</button>
                        <button type="submit" className={`rounded my-3 py-2 fs-5 ${styles.butterYellowAndBtn} ${styles.btnHover}`} disabled={loading}>수정하기</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default MyInfo