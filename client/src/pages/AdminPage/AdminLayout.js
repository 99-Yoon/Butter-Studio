const AdminLayout = ({ children }) => {
    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand ms-5" href="/">
                    <img src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="main" width="30" height="24" />
                </a>
            </nav>
            {children}
        </>
    )
}

export default AdminLayout