import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpen'

const NavbarAll = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open)
    }
    return (
        <>
            <AppBar position="sticky" elevation={4}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ m: 2, flexGrow: 1 }}>
                        CloudVault
                    </Typography>

                    <Box sx={{ display: { xs: 'none', sm: 'block' }, mx: 3 }}>
                        <Button sx={{ m: 1 }} color="inherit">Home</Button>
                        <Button sx={{ m: 1 }} color="inherit">Dashboard</Button>
                        <Button sx={{ m: 1 }} color="inherit">About Us</Button>
                        <Button sx={{ m: 1 }} color="inherit">Contact/Support</Button>
                    </Box>

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{
                        width: 250,
                    }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <Typography variant="h4" sx={{ p: 2, textAlign: 'center' }}>
                            CloudVault
                        </Typography>
                        <ListItemButton>
                            <HomeOutlinedIcon sx={{ mr: 2 }} />
                            <ListItemText primary="Home" />
                        </ListItemButton>
                        <ListItemButton>
                            <DashboardCustomizeOutlinedIcon sx={{ mr: 2 }} />
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                        <ListItemButton>
                            <InfoOutlinedIcon sx={{ mr: 2 }} />
                            <ListItemText primary="About Us" />
                        </ListItemButton>
                        <ListItemButton>
                            <SupportAgentOutlinedIcon sx={{ mr: 2 }} />
                            <ListItemText primary="Contact/Support" />
                        </ListItemButton>
                        <ListItemButton>
                            <LockOpenIcon sx={{ mr: 2 }} />
                            <ListItemText primary="Login" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default NavbarAll;
