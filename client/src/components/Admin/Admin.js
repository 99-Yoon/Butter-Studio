import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import MovieEdit from "./MovieEdit";
import TheaterEdit from "./TheaterEdit";
import CinemaEdit from "./CinemaEdit";
import styles from "./admin.module.scss";

const Admin = () => {
    const match = useRouteMatch()

    return (
        <div className={`d-md-flex align-items-md-start ${styles.box}`}>
            <nav className={`col-md-3 col-lg-2 nav flex-md-column flex-row ${styles.navbar}`} id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <li className="nav-item">
                    <Link to={`${match.url}/movie`} className="nav-link text-center text-dark active">영화 관리</Link>
                </li>
                <li className="nav-item">
                    <Link to={`${match.url}/theater`} className="nav-link text-center text-dark">상영관 관리</Link>
                </li>
                <li className="nav-item">
                    <Link to={`${match.url}/cinema`} className="nav-link text-center text-dark">영화관 관리</Link>
                </li>
            </nav>
            <div className="col-md-9 col-lg-10 tab-content" id="v-pills-tabContent">
                <Switch>
                    <Route path={`${match.path}/movie`}><MovieEdit /></Route>
                    <Route path={`${match.path}/theater`}><TheaterEdit /></Route>
                    <Route path={`${match.path}/cinema`}><CinemaEdit /></Route>
                    <Route path={`${match.path}`}><MovieEdit /></Route>
                </Switch>
            </div>
        </div>
    )
}

export default Admin