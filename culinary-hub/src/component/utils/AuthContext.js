import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the user is logged in on initial load
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            // Make a request to the server to check the session and get the user information
            const response = await fetch('/api/check-login');
            const data = await response.json();

            if (response.ok) {
                setIsLoggedIn(true);
                setUser(data.user);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Error occurred during user login check:', error);
        }
    };

    const login = async (email, password) => {
        try {
            // Make a request to the server to log in the user
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                setIsLoggedIn(true);
                const data = await response.json();
                setUser(data.user);
                console.log('Login successful!');
            } else {
                setIsLoggedIn(false);
                setUser(null);
                console.error('Error occurred during login:', response.statusText);
            }
        } catch (error) {
            setIsLoggedIn(false);
            setUser(null);
            console.error('Error occurred during login:', error);
        }
    };

    const logout = async () => {
        try {
            // Make a request to the server to log out the user
            await fetch('/api/logout');

            setIsLoggedIn(false);
            setUser(null);
            console.log('User logged out');
        } catch (error) {
            console.error('Error occurred during logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
