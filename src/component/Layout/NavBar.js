import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { Person } from '@mui/icons-material';

const NavBar = () => {
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <AppBar sx={{ backgroundColor: 'orange' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', lg: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            marginLeft: '10px',
                        }}
                    >
                        Culinary Hub
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'flex' },
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            href="/Recipes"
                        >
                            Recipes
                        </Button>
                        {isLoggedIn && (
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                href="/FavoriteList"
                            >
                                FavList
                            </Button>
                        )}
                        <IconButton
                            onClick={handleOpenNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Person />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            {isLoggedIn ? (
                                [
                                    <MenuItem key="profile" component={Link} to="/profile" onClick={handleCloseNavMenu}>
                                        {user && user.name ? user.name : 'Profile'}
                                    </MenuItem>,
                                    <MenuItem key="settings" component={Link} to="/settings" onClick={handleCloseNavMenu}>
                                        Settings
                                    </MenuItem>,
                                    <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
                                ]
                            ) : (
                                [
                                    <MenuItem key="login" component={Link} to="/logIn" onClick={handleCloseNavMenu}>
                                        Log In
                                    </MenuItem>,
                                    <MenuItem key="signup" component={Link} to="/signUp" onClick={handleCloseNavMenu}>
                                        Sign Up
                                    </MenuItem>
                                ]
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
