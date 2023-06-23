import React from "react";
import { Container, Box } from "@mui/material";

const FavListLayout = ({ children }) => {
    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    minHeight: "95vh",
                }}
            >
                {children}
            </Box>
        </Container>
    );
};

export default FavListLayout;
