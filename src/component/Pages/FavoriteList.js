import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DefaultLayout from '../Layout/DefaultLayout';

const FavoriteList = () => {
    const [listItems, setListItems] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [itemName, setItemName] = useState('');
    const [editItemId, setEditItemId] = useState(null);
    const navigate = useNavigate();

    // Load list items from the backend on component mount
    useEffect(() => {
        fetchListItems();
    }, []);

    // Function to fetch the list items from the backend
    const fetchListItems = async () => {
        try {
            const response = await fetch('/api/lists');
            if (response.ok) {
                const data = await response.json();
                setListItems(data);
            } else {
                console.error('Error occurred while fetching list items:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while fetching list items:', error);
        }
    };

    // Function to create a new list item in the backend
    const createListItem = async () => {
        try {
            const response = await fetch('/api/lists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: itemName }),
            });
            if (response.ok) {
                const newItem = await response.json();
                setListItems((prevItems) => [...prevItems, newItem]);
                handleCloseDialog(); // Close the dialog after successful creation
            } else {
                // console.error('Error occurred while creating a list item:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while creating a list item:', error);
        }
    };

    // Function to delete a list item in the backend
    const deleteListItem = async (id) => {
        try {
            const response = await fetch(`/api/lists/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setListItems((prevItems) => prevItems.filter((item) => item.id !== id));
            } else {
                console.error('Error occurred while deleting a list item:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while deleting a list item:', error);
        }
    };

    const handleAddListItem = () => {
        setEditItemId(null);
        setOpenDialog(true);
    };

    const handleEditListItem = (id) => {
        const itemToEdit = listItems.find((item) => item.id === id);
        if (itemToEdit) {
            setEditItemId(id);
            setItemName(itemToEdit.title);
            setOpenDialog(true);
        }
    };

    const handleCloseDialog = () => {
        setItemName('');
        setEditItemId(null);
        setOpenDialog(false);
    };

    const handleSaveItem = () => {
        if (editItemId) {
            updateListItem();
        } else {
            createListItem();
        }
    };

    const updateListItem = async () => {
        try {
            const response = await fetch(`/api/lists/${editItemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: itemName }), // Send the updated item title in the request body
            });
            if (response.ok) {
                const updatedItem = await response.json();
                setListItems((prevItems) => {
                    return prevItems.map((item) => {
                        if (item.id === updatedItem.id) {
                            return updatedItem;
                        }
                        return item;
                    });
                });
                handleCloseDialog(); // Close the dialog after successful update
            } else {
                console.error('Error occurred while updating a list item:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while updating a list item:', error);
        }
    };

    const handleDeleteListItem = (id) => {
        deleteListItem(id);
    };

    const handleItemNameChange = (event) => {
        setItemName(event.target.value);
    };

    const handleListClick = (id) => {
        navigate(`/list/${id}`);
    };

    return (
        <DefaultLayout>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="75vh" // Adjust as needed
            >
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {listItems.map((item) => (
                        <ListItem key={item.id} button onClick={() => handleListClick(item.id)} sx={{
                            margin: '2rem'
                        }}>
                            <ListItemText primary={item.name} secondary={item.date} />
                            <ListItemIcon onClick={() => deleteListItem(item.id)}>
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemIcon onClick={() => updateListItem(item.id)}>
                                <EditIcon />
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>

                <Fab color="primary" onClick={handleAddListItem}>
                    <AddIcon />
                </Fab>
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editItemId ? 'Edit Item' : 'Add New Item'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Item Name"
                        fullWidth
                        value={itemName}
                        onChange={handleItemNameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveItem}>{editItemId ? 'Save Changes' : 'Save'}</Button>
                </DialogActions>
            </Dialog>
        </DefaultLayout>
    );
};

export default FavoriteList;
