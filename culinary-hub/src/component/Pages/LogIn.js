import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { Container, Typography, TextField, Button } from '@mui/material'

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Login successful
                setEmail('');
                setPassword('');
                console.log('Login successful!');
                // Redirect to homepage
                history.push('/');
            } else {
                // Login failed
                const error = await response.json();
                console.error('Login failed:', error);
            }
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
    )
}

export default Login
