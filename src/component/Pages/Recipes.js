import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from "../Layout/DefaultLayout";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SearchBox = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

const Recipes = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState('');
    const [creatingNewList, setCreatingNewList] = useState(false);
    const [newListName, setNewListName] = useState('');

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/search-recipes?query=${query}`);
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

    const fetchLists = async () => {
        try {
            const response = await fetch('/api/lists');
            if (response.ok) {
                const data = await response.json();
                setLists(data);
            } else {
                console.error('Error occurred while fetching lists');
            }
        } catch (error) {
            console.error('Error occurred while fetching lists:', error);
        }
    };

    useEffect(() => {
        fetchLists();
    }, []);

    const handleListSelectChange = (event) => {
        const value = event.target.value;
        setSelectedList(value);
        setCreatingNewList(value === 'new');
    };

    const handleCreateList = async () => {
        try {
            const response = await fetch('/api/lists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newListName }),
            });
            if (response.ok) {
                const newList = await response.json();
                setLists((prevLists) => [...prevLists, newList]);
                setSelectedList(newList.id);
                setCreatingNewList(false);
                setNewListName('');
            } else {
                console.error('Error occurred while creating a new list:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while creating a new list:', error);
        }
    };


    const handleAddToSelectedList = async (recipeId, recipeTitle) => {
        try {
            if (!selectedList) {
                console.error('No list item found');
                return;
            }

            const response = await fetch(`/api/lists/${selectedList}/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: recipeId,
                    title: recipeTitle,
                }),
            });

            if (response.ok) {
                const addedRecipe = await response.json();
                console.log('Recipe added to the list:', addedRecipe);
                setRecipes((prevRecipes) => {
                    const updatedRecipes = [...prevRecipes, addedRecipe];
                    return updatedRecipes;
                });
            } else {
                console.error('Error occurred while adding the recipe to the list:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while adding the recipe to the list:', error);
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
            <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
                {recipes.map((recipe) => (
                    <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardActionArea component={Link} to={`/recipe/${recipe.id}`}>
                                <CardMedia component="img" src={recipe.image} alt={recipe.title} height="200" />
                                <CardContent>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        {recipe.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {recipe.summary}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardContent>
                                <FormControl sx={{ minWidth: 120 }}>
                                    <InputLabel>List</InputLabel>
                                    <Select
                                        value={selectedList}
                                        onChange={handleListSelectChange}
                                        fullWidth
                                    >
                                        <MenuItem value="">Choose List</MenuItem>
                                        {lists.map((list) => (
                                            <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>
                                        ))}
                                        <MenuItem value="new">Create New List</MenuItem>
                                    </Select>
                                </FormControl>
                                {creatingNewList && (
                                    <div>
                                        <TextField
                                            label="New List Name"
                                            value={newListName}
                                            onChange={(e) => setNewListName(e.target.value)}
                                        />
                                        <Button variant="contained" onClick={handleCreateList}>
                                            Create
                                        </Button>
                                    </div>
                                )}
                                <Button
                                    variant="contained"
                                    disabled={!selectedList || (creatingNewList && !newListName)}
                                    onClick={() =>
                                        handleAddToSelectedList(recipe.id, recipe.title, recipe.ingredients, recipe.instructions)
                                    }
                                >
                                    Add to List
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
