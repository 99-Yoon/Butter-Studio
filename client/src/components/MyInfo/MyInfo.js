import { useState, useEffect } from "react";
import authApi from "../../apis/auth.api";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./my-info.module.scss";

const MyInfo = () => {
    const [userNickName, setUserNickName] = useState("사용자");
    const [img, setImg] = useState("");
    const [profile, setProfile] = useState("");
    const [startTime, setStartTime] = useState("");
    const [page, setPage] = useState(true);
    const [presentPw, setPresentPw] = useState("");
    const [loading, setLoading] = useState(false);
    const [userRe, setUserRe] = useState({
        userName: "",
        userEmail: "",
        userNickName: "",
        userMbnum: "",
        userPassword: "",
        userRePassword: ""
    })
    const [confirmMb, setConfirmMb] = useState(false);
    const [number, setNumber] = useState(null);
    const [mbError, setMbError] = useState(false);
    const [error, setError] = useState("");
    const [errorMsg, setErrorMsg] = useState({
        errorName: false,
        errorEmail: false,
        errorNickName: false,
        errorMbnum: false,
        errorPassword: false,
    })

    useEffect(() => {
        getMember();
    }, [])

    const getMember = async () => {
        const member = await authApi.getMember();
        setUserNickName(member.nickname);
        setProfile(member.img);
    }

    const handlePwOnChange = (e) => {
        setPresentPw(e.target.value)
    }

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

    const handleOnChange = (e) => {
        setImg(e.target.files[0]);
    }

    const handleOnSummitForm = async (e) => {
        e.preventDefault();
        try {
            setError("")
            const formData = new FormData();
            formData.append("image", img);
            const image = await authApi.profile(formData);
            setProfile(image.img);
        } catch (error) {
            catchErrors(error, setError);
        }
    }
    const handleOnSummitVerify = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            const pw = presentPw;
            const confirmPw = await authApi.comparePw(pw);
            if (confirmPw) {
                setPage(false);
                setPresentPw("");
            } else {
                alert("비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }

    const handleOnClickMbnum = async (e) => {
        e.preventDefault();
        try {
            setStartTime("");
            setError("");
            setLoading(true);
            const phone = userRe.userMbnum;
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
            const confirmNum = { userMbnum: userRe.userMbnum, number: number, startTime: startTime };
            const message = await authApi.confirmNum(confirmNum);
            setMbError(message);
            if (message === "성공") {
                setConfirmMb(true);
                console.log("인증완료");
            }
        } catch (error) {
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }

    const validationPw = () => {
        if (userRe.userPassword !== userRe.userRePassword) return false;
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
                    const userData = userRe;
                    const error = await authApi.modifyUser(userData);
                    if (error === "성공") {
                        alert("회원정보수정에 성공하였습니다.")
                    } else {
                        setErrorMsg(error);
                        alert("형식에 맞게 다시 작성해주세요");
                    }
                } else {
                    throw new Error("비밀번호가 일치하지 않습니다.");
                }
            } else {
                throw new Error("핸드폰 번호를 인증해주세요.");
            }
        } catch (error) {
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }

    const handleOnclickOut = (e) => {
        setConfirmMb(false);
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        handleOnclickOut(e);
        setPage(true);
    }

    return (
        <>
            <div className={`${styles.main}`}>
                <span className={styles.title}>마이페이지</span>
                <div className={`d-flex justify-content-around`}>
                    <div className={`${styles.box}`}>
                        <p className={`${styles.hoverTxt}`}>프로필 변경</p>
                        <img src={`/upload/${profile}`} className={`figure-img img-fluid rounded-circle ${styles.img} ${styles.profile}`} role="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" />
                    </div>
                    <div className="d-flex flex-column py-2 mx-3 justify-content-around">
                        <span className={`${styles.userName}`}>{`${userNickName}`}님 반갑습니다!</span>
                        <button className={`rounded my-2 fs-5 ${styles.butterYellowAndBtn} ${styles.btnHover}`} data-bs-toggle="modal" href="#verifyPassword" >회원정보 수정</button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <form className="modal-content" onSubmit={handleOnSummitForm}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">프로필변경</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="file" onChange={handleOnChange} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                            <button type="submit" className={`rounded  fs-5 ${styles.butterYellowAndBtn} ${styles.btnHover}`}>변경</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal fade" id="verifyPassword" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" aria-labelledby="verifyPasswordLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-dialog-centered">
                    {page ?
                        <form className="modal-content" onSubmit={handleOnSummitVerify}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="verifyPasswordLabel">기존 비밀번호 확인</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleOnClick}></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex flex-column">
                                    <div className="d-flex justify-content-around align-items-center my-4">
                                        <label className={styles.signupLabel}>현재 비밀번호</label>
                                        <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userPassword" placeholder="8~11자리 사이" onChange={handlePwOnChange} onKeyPress={enterKey} maxLength="11" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className={`rounded my-3 fs-5 ${styles.butterYellowAndBtn} ${styles.btnHover}`} disabled={loading}>확인</button>
                            </div>
                        </form>
                        : <form className={`modal-content d-flex col-md-6 col-12 justify-content-center d-flex flex-column`} onSubmit={handleOnSummit}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="modifyLabel">회원정보 수정</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleOnClick}></button>
                            </div>
                            <div className={`modal-body`}>
                                <div className="d-flex flex-column">
                                    <div className={styles.inputContent}>
                                        <label className={styles.signupLabel}>이름</label>
                                        <input className={`${styles.input} ${styles.inputSize}`} type="text" name="userName" placeholder="이름을 입력해주세요" onChange={handleUserOnChange} maxLength="11" />
                                    </div>
                                    {errorMsg.errorName && <p className={styles.passwordConfirmError}>이름을 입력해주세요</p>}
                                </div>
                                <div className="d-flex flex-column">
                                    <div className={styles.inputContent}>
                                        <label className={styles.signupLabel}>이메일</label>
                                        <input className={`${styles.input} ${styles.inputSize}`} type="email" name="userEmail" placeholder="이메일을 입력해주세요" onChange={handleUserOnChange} maxLength="20" />
                                    </div>
                                    {errorMsg.errorEmail && <p className={styles.passwordConfirmError}>이메일을 입력해주세요</p>}
                                </div>
                                <div className="d-flex flex-column">
                                    <div className={styles.inputContent}>
                                        <label className={styles.signupLabel}>별명</label>
                                        <input className={`${styles.input} ${styles.inputSize}`} type="text" name="userNickName" placeholder="10자리 이내" onChange={handleUserOnChange} maxLength="10" />
                                    </div>
                                    {errorMsg.errorNickName && <p className={styles.passwordConfirmError}>10자 이내로 입력해주세요.</p>}
                                </div>

                                <div className="d-flex flex-column">
                                    <div className={styles.inputContent}>
                                        <label className={styles.signupLabel}>휴대폰 번호</label>
                                        <div className="d-flex col-md-auto">
                                            <input className={`${styles.input} `} type="number" name="userMbnum" placeholder="-없이 11자리 입력" onChange={handleUserOnChange} min="" max="99999999999" />
                                            <button type="button" disabled={loading} className={`rounded-2 mt-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={handleOnClickMbnum}>인증번호받기</button>
                                        </div>
                                    </div>
                                    {errorMsg.errorMbnum && <p className={styles.passwordConfirmError}>-없이 숫자 11자리를 입력해주세요.</p>}
                                    <div className="collapse" id="collapseExample">
                                        <div className="d-flex justify-content-around mt-3">
                                            <label className={`${styles.confirm}`}>인증하기</label>
                                            <div>
                                                <input className={`${styles.input}`} type="number" placeholder="인증번호를 입력" onChange={handleOnChangeMb} />
                                                <button type="button" className={`rounded-2 py-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} onClick={handleOnClickMbConfirm}>확인</button>
                                                <button type="button" className={`rounded-2 py-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} onClick={handleOnClickMbnum}>재전송</button>
                                            </div>
                                        </div>
                                        {(mbError === "재전송") && <p className={styles.passwordConfirmError}>유효시간이 만료되었습니다. 재전송해주세요.</p>}
                                        {(mbError === "보냄") && <p className={styles.passwordConfirmError}>5분이내에 입력해주세요.</p>}
                                        {(mbError === "성공") && <p className={styles.passwordConfirmError}>인증되었습니다.</p>}
                                        {(mbError === "실패") && <p className={styles.passwordConfirmError}>인증번호를 다시 입력해주세요.</p>}
                                    </div>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className={styles.inputContent}>
                                        <label className={styles.signupLabel}>새 비밀번호</label>
                                        <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userPassword" placeholder="8~11자리 사이" onChange={handleUserOnChange} maxLength="11" />
                                    </div>
                                    {errorMsg.errorPassword && <p className={styles.passwordConfirmError}>8~11자리 사이로 입력해주세요.</p>}

                                </div>

                                <div className="d-flex flex-column">
                                    <div className={styles.inputContent}>
                                        <label className={styles.signupLabel}>새 비밀번호 확인</label>
                                        <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userRePassword" placeholder="8~11자리 사이" onChange={handleUserOnChange} maxLength="11" />
                                    </div>
                                    {errorMsg.errorRePassword && <p className={styles.passwordConfirmError}>비밀번호가 일치하지 않습니다.</p>}

                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary rounded my-3 py-2 fs-5" data-bs-dismiss="modal" onClick={handleOnClick} disabled={loading}>닫기</button>
                                <button type="submit" className={`rounded my-3 py-2 fs-5 ${styles.butterYellowAndBtn} ${styles.btnHover}`} disabled={loading}>수정하기</button>
                            </div>
                        </form>}
                </div>
            </div>
        </>
    )
}

export default MyInfo