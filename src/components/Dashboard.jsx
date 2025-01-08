import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button, Box, CircularProgress, Card, CardContent, CardActions, IconButton, Fab, Snackbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/CloudDownload';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Dashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();
    
    const fileInputRef = useRef(null); // Use ref to trigger file input

    const authCheck = async () => {
        try {
            const response = await axios.get('http://localhost:5000/dashboard', { withCredentials: true });
            setData(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => navigate('/login');

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/dashboard/delete-file/${id}`, { withCredentials: true });
            setData(data.filter(item => item._id !== id));
            setSnackbarMessage('File deleted successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting file', error);
            setSnackbarMessage('Error deleting file');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            setSnackbarMessage('No file selected');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post('http://localhost:5000/dashboard/upload-file', formData, { withCredentials: true });
            setFile(null);
            authCheck();
            setSnackbarMessage('File uploaded successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error uploading file", error);
            setSnackbarMessage('Error uploading file');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const formatSize = (sizeInBytes) => (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    useEffect(() => { authCheck() }, [navigate]);

    const triggerFileInput = () => {
        fileInputRef.current.click(); // Manually trigger the file input when the button is clicked
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3, mt: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <DashboardIcon sx={{ fontSize: 50, mb: 2, color: 'primary.main' }} />
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', textTransform: 'uppercase', letterSpacing: 2 }}>
                    Dashboard
                </Typography>
            </Box>

            {loading ? (
                <CircularProgress size={60} sx={{ color: 'primary.main', marginTop: 4 }} />
            ) : (
                <>
                    {data.length === 0 ? (
                        <Typography>No files uploaded yet</Typography>
                    ) : (
                        <Grid container spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
                            {data.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item._id}>
                                    <Card sx={{
                                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                                        height: 300, width: '100%', borderRadius: 2, boxShadow: 3, maxHeight: 300,
                                        bgcolor: 'background.paper'
                                    }}>
                                        <CardContent sx={{
                                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                                            height: '100%', width: '380px', paddingBottom: '10px', overflow: 'hidden'
                                        }}>
                                            <Typography variant="h6" noWrap>{item.file_name}</Typography>
                                            <Typography variant="body2">{formatDate(item.uploaded_at)}</Typography>
                                            <Typography variant="body2">{formatSize(item.file_size)}</Typography>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'space-between', padding: 1 }}>
                                            <a href={item.file_path} target="_blank" rel="noopener noreferrer">
                                                <Button variant="contained" color="primary" startIcon={<FileDownloadIcon />}>
                                                    Download
                                                </Button>
                                            </a>
                                            <IconButton color="error" onClick={() => handleDelete(item._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </>
            )}

            {/* Hidden file input */}
            <input
                accept="file/*"
                style={{ display: 'none' }}
                id="upload-file-input"
                type="file"
                ref={fileInputRef} // Assign the ref
                onChange={handleFileChange}
            />
            <label htmlFor="upload-file-input">
                <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={triggerFileInput}>
                    <AddIcon />
                </Fab>
            </label>

            {file && (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleUpload}
                    sx={{ position: 'fixed', bottom: 80, right: 16 }}
                >
                    Upload File
                </Button>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </Box>
    );
};

export default Dashboard;
