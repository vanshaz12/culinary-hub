const express = require('express');
const app = express();
const port = 3001;

app.listen(PORT, () => console.log(`Server is listening here: http://localhost:${PORT}`))

app.use(express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/lists', require('./routes/lists'));