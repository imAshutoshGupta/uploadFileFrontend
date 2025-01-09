import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Card from '@mui/material/Card'
import { Box, Button, Divider, FormControl, Link, TextField, Typography, Snackbar, Alert } from '@mui/material'

const LogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            setError('Email and password are required')
            setOpenSnackbar(true)
            return;
        }

        setIsSubmitting(true)
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,
                {
                    email,
                    password
                }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })

            setSuccessMessage('Logged in successfully!')
            setOpenSuccessSnackbar(true)
            navigate('/dashboard')

        } catch (err) {
            const errMessage = err.response?.data?.message || 'Login failed';
            setError(errMessage)
            setOpenSnackbar(true)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
        setOpenSuccessSnackbar(false)
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <Card variant="outlined" className='text-center'>
                    <Typography sx={{ marginTop: 4, fontWeight: 'bold' }} variant="h5">Log In</Typography>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                            padding: 5
                        }}
                        onSubmit={handleSubmit}
                    >
                        <FormControl>
                            <TextField
                                id="email-login"
                                label="Email"
                                variant="outlined"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                fullWidth
                                value={email}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="password-login"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                fullWidth
                                value={password}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isSubmitting}  // Disable the button when submitting
                        >
                            {isSubmitting ? 'Logging in...' : 'Log in'}
                        </Button>

                        <Typography sx={{ marginTop: 2 }}>
                            <Link href="#" underline="hover" color="inherit">
                                Forgot your password?
                            </Link>
                        </Typography>

                        <Box sx={{ marginY: 1 }}>
                            <Divider>or</Divider>
                        </Box>

                        <Typography>
                            Don't have an account?{' '}
                            <Link href="/signup" underline="hover">
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} variant="filled" severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

            <Snackbar
                open={openSuccessSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default LogIn
