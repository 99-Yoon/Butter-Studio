import MainNav from "../components/Navs/MainNav";
import MovieChart from "../components/MovieChart";
import Collection from "../components/Collection";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <div className="bg-dark">
            <MainNav />
            <MovieChart />
            <Collection />
            <Footer />
        </div>
    )
}

export default HomePage