import React from 'react'
import Card from '@mui/material/Card'
import { Box, Button, Divider, FormControl, Link, TextField, Typography } from '@mui/material'

const SignUp = () => {
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
                        }}>
                        <FormControl>
                            <TextField
                                id="outlined-basic"
                                label="Username"
                                variant="outlined"
                                type="name"
                                name="username"
                                placeholder="Enter your username"
                                fullWidth
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                fullWidth
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                fullWidth
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Sign up
                        </Button>
                        <Box sx={{ marginY: 1 }}>
                            <Divider>or</Divider>
                        </Box>
                        <Typography >
                            Don't have an account?{' '}
                            <Link href="#" underline="hover">
                                Log in
                            </Link>
                        </Typography>
                    </Box>


                </Card>
            </div>
        </>
    )
}

export default SignUp