const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_postgres_username',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_postgres_password',
    port: 5432, // Default PostgreSQL port is 5432
});

// Test the connection
pool.connect((err, client, done) => {
    if (err) throw new Error('Error connecting to the database');
    console.log('Connected to PostgreSQL');
    client.release();
});

// Use the pool in your routes or controllers to interact with the database
app.use((req, res, next) => {
    req.db = pool;
    next();
});
