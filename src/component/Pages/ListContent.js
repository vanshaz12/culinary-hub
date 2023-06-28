import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import DefaultLayout from '../Layout/DefaultLayout';

const ListContents = () => {
    const { id } = useParams();
    const [listItem, setListItem] = useState(null);

    useEffect(() => {
        const fetchListItem = async () => {
            try {
                const response = await fetch(`/api/lists/${id}`);
                if (response.ok) {
                    const listItemData = await response.json();
                    setListItem(listItemData);

                    // Fetch associated recipes from the list_recipes table
                    const recipesResponse = await fetch(`/api/lists/${id}/recipes`);
                    if (recipesResponse.ok) {
                        const recipesData = await recipesResponse.json();
                        setListItem((prevItem) => ({
                            ...prevItem,
                            recipes: recipesData,
                        }));
                    } else {
                        console.error('Error occurred while fetching recipes:', recipesResponse.statusText);
                    }
                } else {
                    console.error('Error occurred while fetching list item details:', response.statusText);
                }
            } catch (error) {
                console.error('Error occurred while fetching list item details:', error);
            }
        };

        fetchListItem();
    }, [id]);


    return (
        <DefaultLayout>
            {listItem && (
                <div>
                    <Typography variant="h4">{listItem.name}</Typography>
                    <Typography variant="h6">Recipes:</Typography>
                    {listItem.recipes && listItem.recipes.length > 0 ? (
                        <List>
                            {listItem.recipes.map((recipe) => (
                                <ListItem key={recipe.id} component={Link} to={`/recipe/:id`}>
                                    <ListItemText primary={recipe.title} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body1">No recipes found for this list item.</Typography>
                    )}
                </div>
            )}
        </DefaultLayout>
    );

}

export default ListContents;
