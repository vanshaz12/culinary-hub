const express = require('express');
const app = express();
const PORT = 3001;

const usersController = require('./controllers/users_controller')
const sessionsController = require('./controllers/sessions_controller')



app.listen(PORT, () => console.log(`Server is listening here: http://localhost:${PORT}`))

app.use(express.json())

app.use('/api/users', usersController)
app.use('/api/sessions', sessionsController)