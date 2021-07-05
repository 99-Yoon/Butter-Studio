const Header = () => {
    const imgName = "mainLogo"
    const imgUrl = "/images/" + imgName + ".png"
    return (
        <div className="butter-logo text-center">
            <a href="/">
                <img className="img-fluid" src={imgUrl} alt={imgName} style={{maxWidth:"40%"}} />
            </a>
        </div >
    )
}

export default Header