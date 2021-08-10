import { Redirect, Route } from "react-router-dom";
import authApi from "../apis/auth.api.js";
import { useAuth } from "../context/auth_context";
import ErrorPage from "../pages/ErrorPage";

const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={(props) => {
                if (user.id) {
                    if (rest.role) {
                        if (rest.role === user.role) {
                            return <Component {...props} />;
                        } else {
                            return <ErrorPage />
                        }
                    } else {
                        return <Component {...props} />
                    }
                } else {
                    alert("로그인이 필요한 기능입니다.")
                    return <Redirect to="/login" />;
                }
            }}
        />
    );
};

export default PrivateRoute