import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ name: '' });

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
                if (data.user && data.user.name) {
                    console.log('User logged in:', data.user.name); // Log the user's name
                } else {
                    console.log('User logged in without a name');
                }
            } else if (response.status === 401) {
                setIsLoggedIn(false);
                setUser(null);
                console.log('No users currently active');
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
                console.log('User logged in:', data.user.name); // Log the user's name
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
            await fetch('http://localhost:3001/api/logout');

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
