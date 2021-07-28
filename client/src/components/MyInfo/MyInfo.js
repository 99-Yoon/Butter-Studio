import styles from "./my-info.module.scss";
import { useAuth } from "../../context/auth_context";
import { useState, useEffect } from "react";
import authApi from "../../apis/auth.api";
import catchErrors from "../../utils/catchErrors.js";

const MyInfo = () => {
    const { user } = useAuth();
    const [userNickName, setUserNickName] = useState(user.nickName);


    const getNickName = async (id) => {
        console.log(id);
        const nickname = await authApi.getNickName(id);
        console.log(nickname);
        setUserNickName(nickname);
    }

    const [userRe, setUserRe] = useState({
        userEmail: "",
        userNickName: "",
        userMbnum: "",
        userPassword: "",
        userRePassword: ""
    })

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

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
    const validation = () => {
        //별명 유효성 검사
        vaildationData((userRe.userNickName.length === 0), false, "errorNickName");
        // 휴대폰 유효성 검사
        vaildationData(userRe.userMbnum.length, 11, "errorMbnum");
        // 비밀번호 유효성 검사
        vaildationIdPw(userRe.userPassword.length, 8, "errorPassword");
        // 비밀번호 확인 유효성 검사
        vaildationIdPw(userRe.userPassword.length, 8, "errorRePassword");

        // 최종 유효성 검사
        if ((Object.values(errorMsg).some((element) => (element)) === false)) {
        } else {
            throw new Error("유효하지 않은 데이터입니다.");
        }
    }

    if (success) {
        alert("회원정보 수정이 완료되었습니다.")
    }

    const handleOnSummit = async (e) => {
        e.preventDefault();
        try {
            setError(() => (""));
            //처리가 될때까지 버튼(가입하기)이 안눌리게 지정
            setLoading(() => (true));
            //유효성 검사
            validation();
            const userData = userRe;
            console.log(userData);
            //서버로 전송
            await authApi.modifyUser(userData);
            alert("회원정보 수정 완료");
            setSuccess(true);
        } catch (error) {
            //에러전송
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }


    return (<>
        <div className="d-flex flex-column">
            <span className={styles.title}>마이페이지</span>
            <div className="d-flex flex mh-100">
                <img src="/images/cat.jpg" className="img-thumbnail rounded-circle" />
                <div className="d-flex flex-column">
                    <span className={`${styles.userName}`}>{`${userNickName}`}님 반갑습니다!</span>
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">회원정보 수정</button>
                </div>
            </div>
        </div>

        {/* 회원정보 수정 모달창 */}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div class="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">회원정보 수정</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form className={`d-flex col-md-6 col-12 justify-content-center d-flex flex-column`} onSubmit={handleOnSummit}>
                        <div className="modal-body">
                            <div className={`d-flex col-md-6 col-12 justify-content-center d-flex flex-column`}>
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
                                            <input className={`${styles.input}`} type="number" name="userMbnum" placeholder="-없이 11자리 입력" onChange={handleUserOnChange} min="" max="99999999999" required />
                                        </div>
                                    </div>
                                    {errorMsg.errorMbnum && <p className={styles.passwordConfirmError}>-없이 숫자 11자리를 입력해주세요.</p>}
                                </div>
                                <div className="d-flex flex-column">
                                    <div className={`${styles.inputContent}`}>
                                        <label className={styles.signupLabel}>기존 비밀번호</label>
                                        <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userPassword" placeholder="8~11자리 사이" onChange={handleUserOnChange} maxLength="11" required />
                                    </div>
                                    {errorMsg.errorPassword && <p className={styles.passwordConfirmError}>8~11자리 사이로 입력해주세요.</p>}
                                </div>

                                <div className="d-flex flex-column">
                                    <div className={styles.inputContent}>
                                        <label className={styles.signupLabel}>변경 비밀번호</label>
                                        <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userRePassword" placeholder="8~11자리 사이" onChange={handleUserOnChange} maxLength="11" required />
                                    </div>
                                    {errorMsg.errorRePassword && <p className={styles.passwordConfirmError}>비밀번호가 일치하지 않습니다.</p>}
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary rounded my-3 py-2 fs-5" data-bs-dismiss="modal" disabled={loading}>닫기</button>
                                <button type="submit" className={`rounded my-3 py-2 fs-5 ${styles.butterYellowAndBtn} ${styles.btnHover}`} disabled={loading}>수정하기</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

export default MyInfo