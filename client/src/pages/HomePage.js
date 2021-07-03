import Header from "../components/Header";
import SubNav from "../components/Navs/SubNav";
import MainNav from "../components/Navs/MainNav";
import BoxOffice from "../components/BoxOffice";
import Collection from "../components/Collection";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <div className="" style={{backgroundColor:"black"}}>
            <SubNav/>
            <Header/>
            <MainNav />
            <BoxOffice />
            <Collection />
            <Footer />
        </div>
    )
}

export default HomePage