const fetch = require('node-fetch');

const API_KEY = process.env.SPOONACULAR_API_KEY

async function searchRecipes(req, res) {
    const { query } = req.query;

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`);

        if (!response.ok) {
            throw new Error('Error occurred during Spoonacular API request');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during recipe search' });
    }
}

module.exports = {
    searchRecipes,
};
