import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button, Box, CircularProgress, Card, CardContent, CardActions, IconButton, Fab, Snackbar, Pagination, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
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
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [page, setPage] = useState(1);
    const [sortBySize, setSortBySize] = useState('none');
    const [sortByDate, setSortByDate] = useState('none');
    const itemsPerPage = 6;
    const navigate = useNavigate();

    const fileInputRef = useRef(null);

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

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/auth/logout',{}, { withCredentials: true });
            setSnackbarMessage('Logged out successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            setSnackbarMessage('Error logging out');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };


    const handleDelete = async (id) => {
        setDeleting(true);
        setSnackbarMessage('Deleting file...');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);

        try {
            await axios.delete(`http://localhost:5000/dashboard/delete-file/${id}`, { withCredentials: true });
            setData(data.filter(item => item._id !== id));
            setFile(null)
            setSnackbarMessage('File deleted successfully');
            setSnackbarSeverity('success');
            fileInputRef.current.value = ''
        } catch (error) {
            console.error('Error deleting file', error);
            setSnackbarMessage('Error deleting file');
            setSnackbarSeverity('error');
        } finally {
            setDeleting(false);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
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

        setUploading(true);
        setSnackbarSeverity('info');
        setSnackbarMessage('Uploading file...');
        setSnackbarOpen(true);

        try {
            await axios.post('http://localhost:5000/dashboard/upload-file', formData, { withCredentials: true });
            setFile(null);
            authCheck();
            setSnackbarMessage('File uploaded successfully');
            setSnackbarSeverity('success');
        } catch (error) {
            console.error("Error uploading file", error);
            setSnackbarMessage('Error uploading file');
            setSnackbarSeverity('error');
        } finally {
            setUploading(false);
        }
    };

    const formatSize = (sizeInBytes) => (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    useEffect(() => { authCheck() }, [navigate]);

    const triggerFileInput = () => {
        fileInputRef.current.click()
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSizeSort = (event) => {
        setSortBySize(event.target.value);
    };

    const handleDateSort = (event) => {
        setSortByDate(event.target.value);
    };

    const sortData = (data) => {
        return [...data].sort((a, b) => {

            if (sortBySize !== 'none') {
                const sizeComparison = sortBySize === 'asc' ? a.file_size - b.file_size : b.file_size - a.file_size;
                if (sizeComparison !== 0) return sizeComparison;
            }

            if (sortByDate !== 'none') {
                const dateComparison = sortByDate === 'asc'
                    ? new Date(a.uploaded_at) - new Date(b.uploaded_at)
                    : new Date(b.uploaded_at) - new Date(a.uploaded_at);
                return dateComparison;
            }

            return 0;
        });
    };
    const sortedData = sortData(data);

    const paginatedData = sortedData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                <FormControl sx={{ minWidth: 150, mb: 2, mx: 1 }}>
                                    <InputLabel>Sort by Size</InputLabel>
                                    <Select
                                        value={sortBySize}
                                        onChange={handleSizeSort}
                                        label="Sort by Size"
                                    >
                                        <MenuItem value="none">None</MenuItem>
                                        <MenuItem value="asc">Smallest</MenuItem>
                                        <MenuItem value="desc">Largest</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ minWidth: 150, mb: 2, mx: 1 }}>
                                    <InputLabel>Sort by Date</InputLabel>
                                    <Select
                                        value={sortByDate}
                                        onChange={handleDateSort}
                                        label="Sort by Date"
                                    >
                                        <MenuItem value="none">None</MenuItem>
                                        <MenuItem value="asc">Oldest first</MenuItem>
                                        <MenuItem value="desc">Newest first</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Grid container spacing={3} sx={{ width: '100%', justifyContent: 'center' }}>
                                {paginatedData.map((item) => (
                                    <Grid item xs={12} sm={6} md={4} key={item._id}>
                                        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 200, width: '100%', borderRadius: 3, boxShadow: 5, maxHeight: 300, bgcolor: 'background.paper' }}>
                                            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '380px', paddingBottom: '10px', overflow: 'hidden' }}>
                                                <Typography variant="h6" noWrap>{item.file_name}</Typography>
                                                <Typography variant="body2">Uploaded at: {formatDate(item.uploaded_at)}</Typography>
                                                <Typography variant="body2">Size: {formatSize(item.file_size)}</Typography>
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
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

                            <Pagination
                                count={Math.ceil(data.length / itemsPerPage)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                sx={{ marginTop: 3 }}
                            />

                        </>
                    )}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleLogout}
                        sx={{ m: 3, top: 16 }}
                    >
                        Logout
                    </Button>
                </>
            )}



            <input
                accept="file/*"
                style={{ display: 'none' }}
                id="upload-file-input"
                type="file"
                ref={fileInputRef}
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
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Click to Upload File'}
                </Button>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Optional: Adjust position
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Dashboard;
