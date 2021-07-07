import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import SubNav from "./components/Navs/SubNav";
import MainNav from "./components/Navs/MainNav";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MovieListPage from "./pages/MovieListPage";
import MoviePage from "./pages/MoviePage";
import TheaterPage from "./pages/TheaterPage";
import MyPage from "./pages/MyPage";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  return (
    <div className="" style={{ backgroundColor: "black" }}>
      <SubNav />
      <Header />
      <MainNav />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/movielist" component={MovieListPage} />
          <Route path="/movie/:movieId" component={MoviePage}/>
          <Route path="/admin" component={AdminPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
