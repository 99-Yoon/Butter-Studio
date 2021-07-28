import axios from "axios";
import { createContext,  useCallback, useContext, useState } from "react";
import authApi from "../apis/auth.api";
import { getLocalUser } from "../utils/auth";
import {baseUrl} from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";
import config from "../utils/clientConfig";

const AuthContext = createContext({
    error: "",
    loading: false,
    user: {id:0, role:"user"},
    setUser: () => { },
    login: () => Promise.resolve(false),
    logout: () => { },
    catchErrorAuth: (error, displayError) => { },
});

const AuthProvider = ({ children }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(getLocalUser());

    const login = useCallback(async (id, password) => {
        try {
            setError("");
            setLoading(true);
            const user = await authApi.login(id, password);
            localStorage.setItem(config.loginUser, JSON.stringify(user));
            setUser(user);

            return true;
        } catch (error) {
            catchErrors(error, setError);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            setError("");
            setUser({id:0, user:"user"});
            alert("로그아웃되었습니다.");
            localStorage.removeItem(config.loginUser);
            setLoading(true);
            await axios.get(`${baseUrl}/api/auth/logout`);
        } catch (error) {
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }, []);

    const catchErrorAuth = useCallback(async (error, displayError) => {
        let errorMsg;
        if (error.response) {
            if (typeof error.response.data === "string") {
                errorMsg = error.response.data;
                console.log("Error response:", errorMsg);
            } else {
                const { data } = error.response;
                if (data.redirectUrl) {
                    errorMsg = data.message;
                    console.log("Error response with redirected message:", errorMsg);
                    console.log("redirect url", data.redirectUrl);
                    return await logout();
                }
            }
        } else if (error.request) {
            errorMsg = error.request;
            console.log("Error request:", errorMsg);
        } else {
            errorMsg = error.message;
            console.log("Error message:", errorMsg);
        }

        displayError(errorMsg);
    }, []);

    return (
        <AuthContext.Provider
            value={{ error, loading, user, setUser, login, logout, catchErrorAuth }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };