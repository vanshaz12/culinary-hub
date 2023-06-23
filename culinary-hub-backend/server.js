const express = require('express');
const app = express();
const port = 3001;

app.listen(PORT, () => console.log(`Server is listening here: http://localhost:${PORT}`))

app.use(express.json())

let favoriteList = []
let recipesinlist = []

app.get('/favoriteList', (req, res) => {
    res.json({ favoriteList })
})