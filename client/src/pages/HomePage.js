import MainNav from "../components/Navs/MainNav";
import BoxOffice from "../components/BoxOffice";
import Collection from "../components/Collection";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <div className="bg-dark">
            <MainNav />
            <BoxOffice />
            <Collection />
            <Footer />
        </div>
    )
}

export default HomePage