import React from 'react'
import { Container, Button, Typography, Box, Paper } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const navigate = useNavigate()

    const handleGetStarted = () => {
        navigate('/login')
    }

    return (
        <div>
            <Box sx={{ height: '80vh', backgroundColor: '#E3F2FD', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h3" component="div" align="center">
                    Welcome to CloudVault
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 3 }} onClick={handleGetStarted}>
                    Get Started
                </Button>
            </Box>

            <Box sx={{backgroundColor: '#CCF2F4'}}>
                <Container sx={{ minHeight: '50vh', py: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ pb: 5 }}>
                        Key Features
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid xs={12} sm={6} md={4} lg={4} xl={4}>
                            <Paper square={false} elevation={9} sx={{ padding: 3, textAlign: 'center', width: { xs: '100%', sm: '300px' } }}>
                                <Typography variant="h5" sx={{ py: 1 }}>Secure Cloud Storage</Typography>
                                <Typography variant="body1">All your uploaded files are securely stored in the cloud, ensuring accessibility and safety.</Typography>
                            </Paper>
                        </Grid>
                        <Grid xs={12} sm={6} md={4} lg={4} xl={4}>
                            <Paper square={false} elevation={9} sx={{ padding: 3, textAlign: 'center', width: { xs: '100%', sm: '300px' } }}>
                                <Typography variant="h5" sx={{ py: 1 }}>Easy File Management</Typography>
                                <Typography variant="body1">Easily manage and organize your files through our intuitive dashboard.</Typography>
                            </Paper>
                        </Grid>
                        <Grid xs={12} sm={6} md={4} lg={4} xl={4}>
                            <Paper square={false} elevation={9} sx={{ padding: 3, textAlign: 'center', width: { xs: '100%', sm: '300px' } }}>
                                <Typography variant="h5" sx={{ py: 1 }}>Download Anytime</Typography>
                                <Typography variant="body1">Access and download your uploaded files whenever you need them, from anywhere.</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box sx={{ height: '50vh', backgroundColor: '#A4EBF3', py: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Container>
                    <Typography variant="h4" align="center" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="body1" align="center" paragraph>
                        CloudVault allows you to upload and store your files securely on the cloud. With our user-friendly dashboard, you can view, organize, and download your files anytime. Whether you're handling personal documents or business files, we provide a secure and reliable solution to meet your storage needs.
                    </Typography>
                </Container>
            </Box>

            <Box sx={{ backgroundColor: '#333', color: '#AAAAAA', py: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Container>
                    <Typography variant="body2" align="center">
                        &copy; 2025 CloudVault. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </div>
    );
};

export default HomePage;
