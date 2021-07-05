const AdminLayout = ({ children }) => {
    return (
        <>
            <nav className="navbar navbar-light bg-ButterYellow">
                <a className="navbar-brand fs-4 ms-5" href="/">
                    <img src="/images/Logo.png" alt="main" width="30" height="30" className="align-text-bottom" />utter Studio
                </a>
            </nav>
            {children}
        </>
    )
}

export default AdminLayout