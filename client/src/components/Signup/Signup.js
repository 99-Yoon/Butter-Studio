import styles from "./signup.module.scss";
import { useState } from 'react';

const Signup = () => {

    const [userText, setUserText] = useState({
        userId: '',
        userName: '',
        userBirthday: '',
        userMbnum: '',
        userPassword: '',
        userRePassword: ''
    })
    //각 타입별 error 유무 state
    const [errors, setErrors] = useState({
        errorId: null,
        errorName: false,
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
        setUserText({
            ...userText,
            [e.target.name]: e.target.value
        })
    }

    //id(중복확인 체크, 형식 에러)
    const handleOnClickId = (e) => {
        if (userText.userId.length < 5) {
            e.preventDefault();
            // e.stopPropagati//on();
            setErrors(errors => ({
                ...errors,
                [e.target.name]: true
            }));
            if (overlapId === true) {
                setOverlapId(false);
            };
        } else {
            e.preventDefault();
            e.stopPropagation();
            setErrors(errors => ({
                ...errors,
                [e.target.name]: false
            }));
            setOverlapId(true);
        }
    }

    //유효성 검사 함수
    const vaildationData = (text, compareValue, error) =>{
        if (text !== compareValue) {
            setErrors(errors => ({ ...errors, [error]: true }))
        } else{
            setErrors(errors => ({ ...errors, [error]: false }))
        }
    }

    //가입하기와 동시에 유효성 검사
    const handleonSubmit = (e) => {
        e.preventDefault();
        setPreId(()=> (userText.userId));
        console.log(preId);
        //아이디 유효성 검사
        if ((userText.userId.length < 5)) {
            setErrors(errors => ({ ...errors, errorId: true }));
        } else if((userText.userId.length >= 5) && (overlapId === true)){
            if(preId !== userText.userId){
                console.log(preId);
            setOverlapId(()=> (false));
            }
        } 
        else if(userText.userId >= 5){
            setErrors(errors => ({ ...errors, errorId: false }));
        }
        console.log(preId);

        //별명 에러유무 검사
        vaildationData((userText.userName.length === 0), false, "errorName");
        // 생일 에러유무 검사
        vaildationData(userText.userBirthday.length, 6, "errorBirthday");
        // 휴대폰 에러유무 검사
        vaildationData(userText.userMbnum.length, 11, "errorMbnum");
        // 비밀번호 에러유무 검사
        vaildationData(userText.userPassword.length, 8, "errorPassword");
        // 비밀번호 확인 에러유무 검사
        vaildationData(userText.userRePassword, userText.userPassword, "errorRePassword");

        const errorArray = Object.values(errors);
        
        // 최종 유효성 검사
        if (overlapId && (errorArray.some((element) => (element)) === false)) {
            console.log(userText);
            setTimeout(()=>{console.log("회원가입을 완료했습니다.")},2000)
        }
    }

    return (
        // 데이터 입력과 유효성 검사 후 보이는 경고창
        <form className={`d-flex col-md-6 col-12 justify-content-center`}>
            {console.log("userText==", userText, errors, overlapId)}
            <div className="d-flex flex-column">
                <span className={styles.title}>회원가입</span>
                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>아이디</label>
                        <div className="d-flex col-md-auto">
                            <input className={styles.input} type="text" name="userId" id="userId" placeholder="5~10자리 사이" onChange={handleUserOnChange} maxLength="10" required />
                            <button type="button" name="errorId" className={`rounded-2 mt-2 ${styles.butterYellowAndBtn} ${styles.btnHover}`} onClick={handleOnClickId} data-bs-toggle="modal" data-bs-target="#exampleModal">중복확인</button>
                        </div>
                    </div>
                    {(overlapId === false) && errors.errorId && <p className={styles.passwordConfirmError}>5~10자리 사이로 입력해주세요.</p>}
                    {overlapId && (errors.errorId === false) && <p className={styles.passwordConfirmError}>아이디 중복이 확인되었습니다.</p>}
                    {(errors.errorId === false) && (overlapId === false) && <p className={styles.passwordConfirmError}>아이디 중복확인을 해주세요.</p>}
                </div>

                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>별명</label>
                        <input className={`${styles.input} ${styles.inputSize}`} type="text" name="userName" id="userName" placeholder="10자리 이내" onChange={handleUserOnChange} maxLength="10" required />
                    </div>
                    {errors.errorName && <p className={styles.passwordConfirmError}>10자 이내로 입력해주세요.</p>}
                </div>

                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>생년월일</label>
                        <input className={`${styles.input} ${styles.inputSize} ${styles.input.placeholder}`} type="number" name="userBirthday" id="userBirthday" placeholder="6자리(예시: 991225)" onChange={handleUserOnChange} min="0" max="999999" required />
                    </div>
                    {errors.errorBirthday && <p className={styles.passwordConfirmError}>숫자 6자리를 입력해주세요.</p>}
                </div>

                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>휴대폰 번호</label>
                        <input className={`${styles.input} ${styles.inputSize}`} type="number" name="userMbnum" id="userMbnum" placeholder="-없이 11자리 입력" onChange={handleUserOnChange} min="0" max="99999999999" required />
                    </div>
                    {errors.errorMbnum && <p className={styles.passwordConfirmError}>-없이 숫자 11자리를 입력해주세요.</p>}
                </div>

                <div className="d-flex flex-column">
                    <div className={`${styles.inputContent}`}>
                        <label className={styles.signupLabel}>비밀번호</label>
                        <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userPassword" id="password" placeholder="8자리 입력" onChange={handleUserOnChange} maxLength="8" required />
                    </div>
                    {errors.errorPassword && <p className={styles.passwordConfirmError}>8자리를 입력해주세요.</p>}
                </div>

                <div className="d-flex flex-column">
                    <div className={styles.inputContent}>
                        <label className={styles.signupLabel}>비밀번호 확인</label>
                        <input className={`${styles.input} ${styles.inputSize}`} type="password" name="userRePassword" id="userRePassword" placeholder="8자리 입력" onChange={handleUserOnChange} maxLength="8" required />
                    </div>
                    {errors.errorRePassword && <p className={styles.passwordConfirmError}>비밀번호가 일치하지 않습니다.</p>}
                </div>

                <buttom className={`rounded my-3 py-2 fs-5 ${styles.butterYellowAndBtn} ${styles.btnHover}`} type="submit" onClick={handleonSubmit}>가입하기</buttom>
            </div>
            {/* 아이디 중복 확인 모달창 */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">아이디 중복 확인</h5>
                        </div>
                        <div class="modal-body">
                            이 아이디는 사용가능합니다.
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Signup