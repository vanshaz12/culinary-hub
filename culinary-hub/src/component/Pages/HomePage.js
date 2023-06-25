import React, { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';

const Home = () => {
    // const { user } = useContext(AuthContext);

    return (
        <div>
            {/* {user && <h1>Welcome {user.name}!</h1>}
            Rest of the home page content */}
            <h1>Welcome User</h1>
        </div>
    );
};

export default Home;
