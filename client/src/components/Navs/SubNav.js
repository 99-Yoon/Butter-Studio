import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth_context.js"
const SubNav = () => {
    const { user, logout } = useAuth();

    return (
        <>  {(user) ?
            <nav className="nav justify-content-end py-1">
                {(user.role === "member") 
                ? <><Link className="nav-link text-white" to="/mypage">마이페이지</Link>
                </>
                : <Link className="nav-link text-white" to="/admin">관리자페이지</Link>}
                <Link className="nav-link text-white" to="/" onClick={logout}>로그아웃 </Link>
            </nav> :
            <nav className="nav justify-content-end py-1">
                <Link className="nav-link text-white" to="/login">로그인</Link>
                <Link className="nav-link text-white" to="/signup" >회원가입</Link>
            </nav>
        }
        </>
    )
}
export default SubNav