import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const ListItemDetails = () => {
    const { id } = useParams();
    const [listItem, setListItem] = useState(null);

    useEffect(() => {
        // Fetch the list item details using the id
        const fetchListItem = async () => {
            try {
                const response = await fetch(`/api/lists/${id}`);
                if (response.ok) {
                    const listItemData = await response.json();
                    setListItem(listItemData);
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
        <div>
            {listItem && (
                <div>
                    <Typography variant="h4">{listItem.name}</Typography>
                    <Typography variant="h6">List Item Details - {id}</Typography>
                    <Typography variant="h6">Recipes:</Typography>
                    {listItem.recipes && listItem.recipes.length > 0 ? (
                        <List>
                            {listItem.recipes.map((recipe) => (
                                <ListItem key={recipe.id}>
                                    <ListItemText primary={`Recipe Name: ${recipe.name}`} />
                                    <ListItemText primary={`Preparation Time: ${recipe.preparationTime}`} />
                                    <ListItemText primary={`Ingredients: ${recipe.ingredients}`} />
                                    {/* Display other recipe details as needed */}
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body1">No recipes found for this list item.</Typography>
                    )}
                </div>
            )}
        </div>
    );
};

export default ListItemDetails;
