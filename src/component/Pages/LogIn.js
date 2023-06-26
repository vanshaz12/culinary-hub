import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import { Container, Typography, TextField, Button } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Access the login function from the AuthContext
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the login function from AuthContext
            await login(email, password);
            setEmail('');
            setPassword('');
            console.log('Login successful!');
            navigate('/');
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h2" align="center" gutterBottom sx={{ marginTop: '10rem' }}>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: '1rem' }}>
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default Login;
