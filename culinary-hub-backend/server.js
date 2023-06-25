const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;
const fetch = require('node-fetch')

app.use(cors());

// Import the necessary dependencies for interacting with the database
const db = require('./db/db');
const bcrypt = require('bcrypt');

app.listen(PORT, () => console.log(`Server is listening here: http://localhost:${PORT}`));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the server');
});


// Handle user registration
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const passwordDigest = await bcrypt.hash(password, saltRounds);

        // Insert the user profile into the database
        const newUser = await db.query(
            'INSERT INTO users (name, email, password_digest) VALUES ($1, $2, $3) RETURNING *',
            [name, email, passwordDigest]
        );

        res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
    } catch (error) {
        console.error('Error occurred during user registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Handle user login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored password
        const match = await bcrypt.compare(password, user.rows[0].password_digest);
        if (!match) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Login successful
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error occurred during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const API_KEY = 'bdcfcfd9559641359e2535faefbfa73d';


app.get('/api/search-recipes', async (req, res) => {
    try {
        const { query } = req.query;
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`);
        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            console.error('Error occurred during recipe search:', response.statusText);
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (error) {
        console.error('Error occurred during recipe search:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});