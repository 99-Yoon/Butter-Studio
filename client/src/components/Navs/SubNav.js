
const SubNav = () => {
    
    const handleOnClick = () => {
    }

        return (
            <nav class="nav justify-content-end py-1">
                <a class="nav-link text-white" href="/login">로그인</a>
                <a class="nav-link text-white" href="/signup">회원가입</a>
            </nav>
        )
}
    // else if (store.role === "member") {
    //     return (
    //         <nav class="nav justify-content-end py-1">
    //             <a class="nav-link text-white" href="/">마이페이지</a>
    //             <a class="nav-link text-white" onClick={handleOnClick}>로그아웃</a>
    //         </nav>


    //     )
    // } else if (store.role === "admin") {
    //     <nav class="nav justify-content-end py-1">
    //         <a class="nav-link text-white" href="/admin">관리자페이지</a>
    //         <a class="nav-link text-white" href="/">로그아웃</a>
    //     </nav>
    // } else {
    //     <nav class="nav justify-content-end py-1">
    //         <a class="nav-link text-white" href="/">로그인 오류</a>
    //     </nav>
    // }


export default SubNav