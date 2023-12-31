import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth_context.js"

const SubNav = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="nav justify-content-end py-1">
            {(user.id === 0)
                ?
                <>
                    <Link className="nav-link text-white" to="/login">로그인</Link>
                    <Link className="nav-link text-white" to="/signup" >회원가입</Link>
                </>
                :
                <>
                    {(user.role === "admin")
                        ?
                        <Link className="nav-link text-white" to="/admin">관리자페이지</Link>
                        : ((user.role === "member")
                            ?
                            <Link className="nav-link text-white" to="/mypage">마이페이지</Link>
                            : <Link className="nav-link text-white" to="/guest">예매확인</Link>)
                    }
                    <Link className="nav-link text-white" to="/" onClick={logout}>로그아웃</Link>
                </>
            }
        </nav>
    )
}

export default SubNav
