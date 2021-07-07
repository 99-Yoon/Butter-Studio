import { useState } from "react";
import styles from "./login.module.scss";

const Login = () => {
    //useState를 이용해서 각 state 생성 및 초기값 저장
    const [state, setState] = useState(true); // 이 줄은 css에 해당하는 state
    const [loginText, setLoginText] = useState({
        id:'',
        password:''
    });

    const [guestText, setGusetText] = useState({
        guestName:'',
        gusetBirthday:'',
        gusetMbnum:'',
        guestPassword:''
    })

    //input태그에 걸려있는 onchange에서 실행할 함수설정
    const handleLoginOnChange = (e) =>{
        // ... 전개 연산자
        // 현재 state에 방금 변화한 값을 다시 저장함
        setLoginText({ ...loginText,
            [e.target.name]:e.target.value,
        })
    };

    const handleGuestOnChange = (e) =>{
        setGusetText({ ...guestText,
            [e.target.name]:e.target.value
        })
    }

    return (
        <div className={`d-flex flex-column col-md-5 col-10`}>
            {/* nav-tabs */}
            <ul className="nav nav-fill nav-tabs w-100" id="loginTab" role="tablist">
                <li className="nav-item fs-6" role="presentation">
                    <button className={`nav-link active px-2 ${styles.fontSize}`} style={{ color: state ? "black" : "#FEDC00", backgroundColor: state ? "#FEDC00" : "black"}} 
                    id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true" 
                    onClick={() => setState(true)}>로그인</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className={`nav-link px-2 ${styles.fontSize}`}
                    id="guest-tab" data-bs-toggle="tab" data-bs-target="#guest" type="button" role="tab" aria-controls="guest" aria-selected="false" 
                    onClick={() => setState(false)} style={{ color: state ? "#FEDC00" : "black", backgroundColor: state ? "black" : "#FEDC00" }}>비회원 예매 확인</button>
                </li>
            </ul>

            <div className="tab-content w-100" id="myTabContent">
                {/* 로그인 */}
                <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                    <div className="d-flex flex-column ">
                        <input className={styles.input} type="text" name="id" placeholder="ID" onChange={handleLoginOnChange}/>
                        <input className={styles.input} type="text" name="password" placeholder="Password" onChange={handleLoginOnChange} minlength="8" required />
                    <input className={`border-0 rounded-2 mt-2 ${styles.butterYellow} ${styles.btnHover}`} type="submit" value="Login" />
                        <span><a href="./signup" className={styles.intoSignupPage}>회원이 아니십니까?</a></span>
                    </div>
                </div>

                {/* 비회원예매 학인 */}
                <div className="tab-pane fade" id="guest" role="tabpanel" aria-labelledby="guest-tab">
                    <div className="d-flex flex-column">
                        <input className={styles.input} type="text" name="guestName" id="guestName" placeholder="이름" onChange={handleGuestOnChange} minlength="8" required />
                        <input className={styles.input} type="number" name="gusetBirthday" id="gusetBirthday" placeholder="생년월일" onChange={handleGuestOnChange} minlength="8" required />
                        <input className={styles.input} type="number" name="gusetMbnum" id="gusetMbnum" placeholder="휴대폰 번호" onChange={handleGuestOnChange} minlength="8" required />
                        <input className={styles.input} type="text" name="guestPassword" id="password" placeholder="비밀번호" onChange={handleGuestOnChange} minlength="8" required />

                        <p className={`text-white ${styles.fontSizeTwo}`}>
                            ※ 비회원 정보 오 입력 시 예매 내역 확인/취소 및 티켓 발권이 어려울 수 있으니 다시 한번 확인해 주시기 바랍니다.
                        </p>
                            <input className={`border-0 rounded-2 mt-2 ${styles.butterYellow} ${styles.btnHover}`} type="submit" value="비회원 예매 확인" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login