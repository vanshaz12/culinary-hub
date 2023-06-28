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
            const isLoggedInLocally = localStorage.getItem('isLoggedIn');
            const userLocally = localStorage.getItem('user');

            if (isLoggedInLocally && userLocally) {
                setIsLoggedIn(true);
                setUser(JSON.parse(userLocally));
                console.log('User logged in:', JSON.parse(userLocally).name);
                return;
            }

            const response = await fetch('http://localhost:3001/api/check-login', {
                credentials: 'include'
            });
            const data = await response.json();

            console.log('Server response:', data); // Log the response data

            if (response.ok && data) {
                setIsLoggedIn(true);
                setUser(data.user);

                // Store the authentication state locally
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('user', JSON.stringify(data.user));

                if (data.user && data.user.name) {
                    console.log('User logged in:', data.user.name);
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
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            if (response.ok) {
                setIsLoggedIn(true);
                const data = await response.json();
                setUser(data.user);

                // Store the authentication state locally
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('user', JSON.stringify(data.user));

                console.log('User logged in:', data.user.name);
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

            // Clear the authentication state locally
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');

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