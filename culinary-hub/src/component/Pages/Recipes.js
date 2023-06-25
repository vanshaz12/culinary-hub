import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DefaultLayout from "../Layout/DefaultLayout"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { styled } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'

const SearchBox = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
})

const Recipes = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [recipes, setRecipes] = useState([])

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/search-recipes?query=${searchQuery}`)
            if (response.ok) {
                const data = await response.json()
                setRecipes(data.results)
            } else {
                console.error('Error occurred during recipe search')
            }
        } catch (error) {
            console.error('Error occurred during recipe search:', error)
        }
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="contained" onClick={handleSearch} sx={{ height: '3.5rem' }}>
                    <SearchIcon />
                </Button>
            </SearchBox>
            <div className="recipes-list">
                {recipes.map((recipe) => (
                    <div key={recipe.id}>
                        <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                    </div>
                ))}
            </div>
        </DefaultLayout>
    )
}

export default Recipes
