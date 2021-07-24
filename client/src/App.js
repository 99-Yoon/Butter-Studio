import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/auth_context";
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
import TicketingPage from "./pages/TicketingPage";
import TicketingSeatPage from './pages/TicketingSeatPage'
import SearchPage from "./pages/SearchPage";

function App() {

  return (
    <div className="" style={{ backgroundColor: "black" }}>
      <AuthProvider>
        <Router style={{ backgroundColor: "black" }}>
          <SubNav />
          <Header />
          <MainNav />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/movielist" component={MovieListPage} />
            <Route path="/movie/:movieId" component={MoviePage} />
            <Route path="/ticket/seat" component={TicketingSeatPage} />
            <Route path="/ticket" component={TicketingPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/admin" component={AdminPage} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
