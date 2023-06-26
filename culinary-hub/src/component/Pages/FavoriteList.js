import React, { useState, useEffect } from 'react';
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

    // Load list items from local storage on component mount
    useEffect(() => {
        const storedItems = localStorage.getItem('listItems');
        if (storedItems) {
            setListItems(JSON.parse(storedItems));
        }
    }, []);

    // Save list items to local storage when they change
    useEffect(() => {
        localStorage.setItem('listItems', JSON.stringify(listItems));
    }, [listItems]);

    const handleAddListItem = () => {
        setEditItemId(null);
        setOpenDialog(true);
    };

    const handleEditListItem = (id) => {
        const itemToEdit = listItems.find((item) => item.id === id);
        setItemName(itemToEdit.title);
        setEditItemId(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setItemName('');
        setEditItemId(null);
        setOpenDialog(false);
    };

    const handleSaveItem = () => {
        if (editItemId) {
            const updatedItems = listItems.map((item) => {
                if (item.id === editItemId) {
                    return {
                        ...item,
                        title: itemName
                    };
                }
                return item;
            });
            setListItems(updatedItems);
        } else {
            const newItem = {
                id: new Date().getTime(),
                title: itemName,
                date: new Date().toLocaleDateString()
            };
            setListItems((prevItems) => [...prevItems, newItem]);
        }
        setItemName('');
        setEditItemId(null);
        setOpenDialog(false);
    };

    const handleDeleteListItem = (id) => {
        const updatedItems = listItems.filter((item) => item.id !== id);
        setListItems(updatedItems);
    };

    const handleItemNameChange = (event) => {
        setItemName(event.target.value);
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
                        <ListItem key={item.id} button>
                            <ListItemText primary={item.title} secondary={item.date} />
                            <ListItemIcon onClick={() => handleDeleteListItem(item.id)}>
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemIcon onClick={() => handleEditListItem(item.id)}>
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
