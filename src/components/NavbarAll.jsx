import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavbarAll = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    MyApp
                </Typography>

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Services</Button>
                    <Button color="inherit">Contact</Button>
                </Box>

                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavbarAll;
