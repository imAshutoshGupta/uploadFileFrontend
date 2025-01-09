import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Card from '@mui/material/Card'
import { Alert, Box, Button, Divider, FormControl, Link, Snackbar, TextField, Typography } from '@mui/material'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setOpenSnackbar(true)
            return
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long')
            setOpenSnackbar(true)
            return
        }
        setIsSubmitting(true)
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
                {
                    username,
                    email,
                    password
                })
            setSuccessMessage('Account created successfully! Please log in.')
            setOpenSuccessSnackbar(true)
            navigate('/login')

        } catch (error) {
            setError(error.response?.data?.message)
            setOpenSnackbar(true)
        }
        finally {
            setIsSubmitting(false)
        }
    }
    const handleCloseSnackbar = (type) => {
        if (type === 'error') {
            setOpenSnackbar(false)
        } else {
            setOpenSuccessSnackbar(false)
        }
    }


    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <Card variant="outlined" className='text-center'>
                    <Typography sx={{ marginTop: 4, fontWeight: 'bold' }} variant="h5">Sign Up</Typography>

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
                                id="username"
                                label="Username"
                                variant="outlined"
                                type="name"
                                name="username"
                                placeholder="Enter your username"
                                fullWidth
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="email-signup"
                                label="Email"
                                variant="outlined"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                fullWidth
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="password-signup"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                fullWidth
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="confirm-password-signup"
                                label="Confirm Password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Confirm your password"
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            {isSubmitting ? 'Signing up...' : 'Sign up'}
                        </Button>
                        <Box sx={{ marginY: 1 }}>
                            <Divider>or</Divider>
                        </Box>
                        <Typography >
                            Don't have an account?{' '}
                            <Link href="/login" underline="hover">
                                Log in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => handleCloseSnackbar('error')}
            >
                <Alert onClose={() => handleCloseSnackbar('error')} variant="filled" severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

            <Snackbar
                open={openSuccessSnackbar}
                autoHideDuration={3000}
                onClose={() => handleCloseSnackbar('success')}
            >
                <Alert onClose={() => handleCloseSnackbar('success')} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>

        </>
    )
}

export default SignUp