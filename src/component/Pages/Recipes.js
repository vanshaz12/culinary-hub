import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from "../Layout/DefaultLayout";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Margin } from '@mui/icons-material';


const SearchBox = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

const Recipes = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/search-recipes?query=${query}`);
            if (response.ok) {
                const data = await response.json();
                setRecipes(data.results);
            } else {
                console.error('Error occurred during recipe search');
            }
        } catch (error) {
            console.error('Error occurred during recipe search:', error);
        }
    };

    return (
        <DefaultLayout>
            <Typography variant="h4" component="h4" gutterBottom sx={{ marginTop: '7rem' }}>
                Search your next creation..
            </Typography>
            <SearchBox>
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    sx={{
                        height: '3.5rem'
                    }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button variant="contained" onClick={handleSearch} sx={{ height: '3.5rem' }}>
                    <SearchIcon />
                </Button>
            </SearchBox>
            <Grid container spacing={2} sx={{
                marginTop: '2rem'
            }}>
                {recipes.map((recipe) => (
                    <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia component="img" src={recipe.image} alt={recipe.title} height="200" />
                            <CardContent>
                                <Typography variant="h6" component="h3" gutterBottom>
                                    {recipe.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {recipe.summary}
                                </Typography>
                                <Button component={Link} to={`/recipe/${recipe.id}`} variant="contained" size="small">
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </DefaultLayout>
    );
};

export default Recipes;
