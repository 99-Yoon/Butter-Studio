import styles from "./login.module.scss";

const Login = ()=>{
    return(
        <div className="login">
            <div class="nav-tabs">
            <span><a href="loginPage.html" class="login">로그인</a></span>
            <span><a>|</a></span>
            <span><a href="guestLoginPage.html" class="nomember">비회원 예매확인</a></span>
            </div>
            <input type="text" id="id" name="id" placeholder="ID"></input>
            <input type="password" name="password" id="password" placeholder="Password" minlength="8" required></input>
            <input class="loginBtn" type="submit" value="Login"></input>
            <span><a href="registerPage" class="intoRegisterPage">회원이 아니십니까?</a></span>
        </div>
    )
}

export default Login