import { createContext, useCallback, useContext, useEffect, useState } from "react";
import authApi from "../apis/auth.api";
import catchErrors from "../utils/catchErrors";

const AuthContext = createContext({
    error: "",
    loading: false,
    user: { id: 0, role: "user" },
    setUser: () => { },
    login: () => Promise.resolve(false),
    logout: () => { },
    guestLogin: () => Promise.resolve(false),
    catchErrorAuth: (error, displayError) => { },
});

const AuthProvider = ({ children }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({ id: 0, role: "user" });

    const getUser = async () => {
        const { id, role } = await authApi.getUser();
        const user = { "id": id, "role": role };
        setUser(user);
    };

    useEffect(() => {
        getUser();
    }, []);

    const login = useCallback(async (id, password) => {
        try {
            setError("");
            setLoading(true);
            const user = await authApi.login(id, password);
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
            setLoading(true);
            const user = await authApi.logout();
            setUser(user);
            alert("로그아웃되었습니다.");
        } catch (error) {
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }, []);

    const guestLogin = useCallback(async (guest) => {
        try {
            setError("");
            setLoading(true);
            const user = await authApi.guestLogin(guest);
            setUser(user);
            return true
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
            value={{ error, loading, user, setUser, login, logout, guestLogin, catchErrorAuth }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };