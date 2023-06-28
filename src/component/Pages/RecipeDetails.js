import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Typography, Container, Card, CardMedia, CardContent, List, ListItem, CircularProgress } from '@mui/material';

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`/api/recipes/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setRecipe(data);
                } else {
                    console.error('Error occurred while fetching recipe details');
                }
            } catch (error) {
                console.error('Error occurred while fetching recipe details:', error);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    const handleViewInstructions = async () => {
        try {
            const response = await fetch(`/api/recipes/${id}/instructions`);
            if (response.ok) {
                const instructions = await response.json();
                navigate(`/recipes/${id}/instructions`, { state: { instructions } });
            } else {
                console.error('Error occurred while fetching recipe instructions');
            }
        } catch (error) {
            console.error('Error occurred while fetching recipe instructions:', error);
        }
    };

    if (!recipe) {
        return <CircularProgress />;
    }

    // Destructure the recipe object
    const { title, image, summary, ingredients } = recipe;

    // Function to extract plain text from HTML string
    const extractTextFromHTML = (html) => {
        const parser = new DOMParser();
        const document = parser.parseFromString(html, 'text/html');
        return document.body.textContent || '';
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h4" gutterBottom sx={{ marginTop: '7rem' }}>
                {title}
            </Typography>
            <Card>
                <CardMedia component="img" src={image} alt={title} height="300" />
                <CardContent>
                    <Typography variant="body1" gutterBottom>
                        {extractTextFromHTML(summary)}
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom>
                        Ingredients:
                    </Typography>
                    <List>
                        {ingredients.map((ingredient, index) => (
                            <ListItem key={index}>{ingredient}</ListItem>
                        ))}
                    </List>
                    <Typography variant="h6" component="h3" gutterBottom>
                        Instructions:
                    </Typography>
                    <Typography variant="body1">
                        <button onClick={handleViewInstructions}>View Instructions</button>
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default RecipeDetails;
