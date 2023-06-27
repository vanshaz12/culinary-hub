import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/AuthContext';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [featuredRecipe, setFeaturedRecipe] = useState(null);

    useEffect(() => {
        fetchFeaturedRecipe();
    }, []);

    const fetchFeaturedRecipe = async () => {
        try {
            const response = await fetch('/api/random-recipe');
            const data = await response.json();
            setFeaturedRecipe(data);
        } catch (error) {
            console.log('Error fetching featured recipe:', error);
        }
    };

    const parseDescription = (description) => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(description, 'text/html');
        return htmlDoc.body.textContent;
    };

    return (
        <div style={{ marginTop: '7rem' }}>
            {user ? (
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome to Culinary Hub, {user.name}!
                </Typography>
            ) : (
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome to Culinary Hub
                </Typography>
            )}
            <section>
                <Typography variant="h5" component="h2" gutterBottom>
                    Featured Recipe
                </Typography>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                        {featuredRecipe ? (
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <Link to={`/recipe/${featuredRecipe.id}`}>
                                    <img
                                        src={featuredRecipe.image}
                                        alt={featuredRecipe.title}
                                        style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                                    />
                                </Link>
                                <Typography variant="h6" align="center">
                                    {featuredRecipe.title}
                                </Typography>
                                <Typography variant="body2" align="center">
                                    {parseDescription(featuredRecipe.summary)}
                                </Typography>
                            </Paper>
                        ) : (
                            <Typography variant="body1" align="center">
                                <CircularProgress />
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </section>
            {/* Add more sections or components as desired */}
        </div>
    );
};

export default Home;
