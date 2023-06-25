import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`/api/recipe-details?id=${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setRecipe(data);
                } else {
                    console.error('Error occurred while fetching recipe details');
                }
            } catch (error) {
                console.error('Error occurred while fetching recipe details:', error);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            {/* Render other details about the recipe */}
        </div>
    );
};

export default RecipeDetails;
