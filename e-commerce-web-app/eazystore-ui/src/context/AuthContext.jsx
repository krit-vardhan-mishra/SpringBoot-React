import { children, createContext, useContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                jwtToken: action.payload.jwtToken,
                user: action.payload.user,
                isAuthenticated: true
            };

        case LOGOUT:
            return {
                ...state,
                jwtToken: null,
                user: null,
                isAuthenticated: false
            };

        default:
            return state;

    }
}

export const AuthProvider = ({ children }) => {
    const initialAuthState = (() => {
        try {
            const jwtToken = localStorage.getItem("jwtToken");
            const user = localStorage.getItem("user");
            if (jwtToken && user) {
                return {
                    isAuthenticated: true,
                    jwtToken: jwtToken,
                    user: JSON.parse(user)
                };
            }
        } catch (error) {
            console.error("Failed to load from localStorage", error);
        }
        return {
            jwtToken: null,
            user: null,
            isAuthenticated: false
        };
    })();

    const [authState, dispatch] = useReducer(authReducer, initialAuthState);

    useEffect(() => {
        try {
            if (authState.isAuthenticated) {
                localStorage.setItem("jwtToken", authState.jwtToken);
                localStorage.setItem("user", JSON.stringify(authState.user));
            } else {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("user");
            }
        } catch (error) {
            console.error("Failed to save to localStorage", error);
        }
    }, [authState])

    const loginSuccess = (jwtToken, user) => {
        dispatch({ type: LOGIN_SUCCESS, payload: { jwtToken, user } });
    };

    const logout = () => {
        dispatch({ type: LOGOUT });
    };

    return (
        <AuthContext.Provider value={{
            jwtToken: authState.jwtToken, user: authState.user, isAuthenticated: authState.isAuthenticated,
            loginSuccess, logout
        }}>
            {children}
        </AuthContext.Provider>
    );
} 