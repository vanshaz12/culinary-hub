import React from 'react';
import DefaultLayout from "../Layout/DefaultLayout";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

const Recipes = () => {
    const searches = []

    const handleSearch = () => {
        // Logic for handling search
    }

    return (
        <DefaultLayout>
            <div className="previous-search">
                <h2>Previous Searches</h2>
                <div className="previous-searches-container"></div>
            </div>
            <SearchBox>
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    sx={{ height: '3.5rem' }}
                />
                <Button variant="contained" onClick={handleSearch} sx={{ height: '3.5rem' }}>
                    <SearchIcon />
                </Button>
            </SearchBox>
        </DefaultLayout>
    );
};

export default Recipes;
