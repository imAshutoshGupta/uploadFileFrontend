import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import { useNavigate } from 'react-router-dom'

const NavbarAll = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [data, setData] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    const authCheck = async () => {
        try {
            const response = await axios.get('http://localhost:5000/dashboard', { withCredentials: true })
            console.log('Response from authCheck:', response)
            setIsAuthenticated(true)
            setData(response.data[0].user_id.username)
            console.log('Data after set:', response.data)
        } catch (error) {
            console.error("Authentication error:", error)
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        authCheck()
    }, [])

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open)
    }

    const handleNavigation = (path) => {
        navigate(path)
        setIsDrawerOpen(false)
    }

    return (
        <>
            <AppBar position="fixed" elevation={4}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: 'block', sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ m: 1, flexGrow: 1 }}>
                        CloudVault
                    </Typography>

                    <Box sx={{ display: { xs: 'none', sm: 'block' }, mx: 3 }}>
                        <Button sx={{ m: 1 }} color="inherit" onClick={() => handleNavigation('/')}>Home</Button>
                        <Button sx={{ m: 1 }} color="inherit" onClick={() => handleNavigation('/dashboard')}>Dashboard</Button>
                        <Button sx={{ m: 1 }} color="inherit" onClick={() => handleNavigation('/about')}>About Us</Button>
                        <Button sx={{ m: 1 }} color="inherit" onClick={() => handleNavigation('/support')}>Contact/Support</Button>
                    </Box>



                    {/* {isAuthenticated ? (
                            <Button  color="inherit">Welcome {data}</Button>
                    ) : (
                        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                    )} */}
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
                        <ListItemButton onClick={() => handleNavigation('/')}>
                            <HomeOutlinedIcon sx={{ mr: 2 }} />
                            <ListItemText primary="Home" />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleNavigation('/dashboard')}>
                            <DashboardCustomizeOutlinedIcon sx={{ mr: 2 }} />
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleNavigation('/about')}>
                            <InfoOutlinedIcon sx={{ mr: 2 }} />
                            <ListItemText primary="About Us" />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleNavigation('/support')}>
                            <SupportAgentOutlinedIcon sx={{ mr: 2 }} />
                            <ListItemText primary="Contact/Support" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default NavbarAll
