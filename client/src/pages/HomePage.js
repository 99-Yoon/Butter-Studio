import MainNav from "../components/Navs/MainNav";
import MovieChart from "../components/MovieChart";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <div className="bg-dark">
            <MainNav />
            <MovieChart />
            <Footer />
        </div>
    )
}

export default HomePage