import React, { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';

const UserProfile = () => {
    const { isLoggedIn, user } = useContext(AuthContext);

    if (isLoggedIn && user) {
        return <h1>Welcome, {user.name}</h1>;
    } else {
        return <h1>Welcome, Guest</h1>;
    }
};

export default UserProfile;