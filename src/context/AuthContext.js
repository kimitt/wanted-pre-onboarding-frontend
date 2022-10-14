import React, { useEffect,useState } from "react";

    const AuthContext = React.createContext({
        isLoggedIn: false,
        onLogout: () => {},
        onLogin: (email, password) => {},
    });

    export const AuthContextProvider = (props) => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        useEffect(() => {
            const isLoggedInInfo = localStorage.getItem('isLoggedIn');

            if (isLoggedInInfo === 'ok') {
                setIsLoggedIn(true);
            }
        }, []);

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("access_token");
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "ok");
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};




export default AuthContext;
