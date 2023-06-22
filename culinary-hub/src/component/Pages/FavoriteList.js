import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DefaultLayout from '../Layout/DefaultLayout';

const FavoriteList = () => {
    const [listItems, setListItems] = useState([]);

    const handleAddListItem = (item) => {
        setListItems([...listItems, item]);
    };

    return (
        <DefaultLayout>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, marginTop: '16px', marginRight: '16px' }}>
                <ListItem button onClick={() => handleAddListItem({ title: 'New Item', date: new Date().toLocaleDateString() })}>
                    <ListItemText primary="Add New Item" />
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                </ListItem>
            </Box>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {listItems.map((item, index) => (
                    <ListItem key={index} button>
                        <ListItemText primary={item.title} secondary={item.date} />
                    </ListItem>
                ))}
            </List>
        </DefaultLayout>
    );
};

export default FavoriteList;
