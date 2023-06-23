import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Implement your sign-up logic here
        // Example: Make API call to sign up the user

        // Reset the form fields
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h2" align="center" gutterBottom
                sx={{
                    marginTop: '10rem'
                }}
            >
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                />
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
                    Sign Up
                </Button>
            </form>
        </Container>
    );
};

export default SignUpPage;
