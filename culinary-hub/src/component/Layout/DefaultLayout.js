import React from "react";
import { Container, Box } from "@mui/material";

const DefaultLayout = ({ children }) => {
    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "75vh", // adjust as needed
                }}
            >
                {children}
            </Box>
        </Container>
    );
};

export default DefaultLayout;