import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, ListItem, List, ListItemText } from '@mui/material';

const Instructions = () => {
    const { id } = useParams();
    const [instructions, setInstructions] = React.useState(null);

    React.useEffect(() => {
        const fetchInstructions = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/recipes/${id}/instructions`);
                if (response.ok) {
                    const data = await response.json();
                    setInstructions(data);
                } else {
                    console.error('Error occurred while fetching recipe instructions');
                }
            } catch (error) {
                console.error('Error occurred while fetching recipe instructions:', error);
            }
        };

        fetchInstructions();
    }, [id]);

    if (!instructions || instructions.length === 0) {
        return <Typography variant="body1">No instructions found.</Typography>;
    }
    console.log(instructions);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h4" gutterBottom sx={{ marginTop: '7rem' }}>
                Instructions
            </Typography>
            <List>
                {instructions[0].steps.map((step, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`${index + 1}. ${step.step}`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};


export default Instructions;
