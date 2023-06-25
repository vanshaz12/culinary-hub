import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        // Perform the login logic and set the isLoggedIn and user state
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        // Perform the logout logic and reset the isLoggedIn and user state
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
