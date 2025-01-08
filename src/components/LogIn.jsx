import React from 'react'
import Card from '@mui/material/Card'
import { Box, Button, Divider, FormControl, Link, TextField, Typography } from '@mui/material'

const LogIn = () => {
    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <Card variant="outlined" className='text-center'>
                    <Typography sx={{ marginTop: 4, fontWeight: 'bold'}} variant="h5">Log In</Typography>
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
                                id="email-login"
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
                                id="password-login"
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
                            Log in
                        </Button>
                        <Typography sx={{ marginTop: 2 }} >
                            <Link href="#" underline="hover" color="inherit">
                                Forgot your password?
                            </Link>
                        </Typography>
                        <Box sx={{ marginY: 1 }}>
                            <Divider>or</Divider>
                        </Box>
                        <Typography >
                            Don't have an account?{' '}
                            <Link href="#" underline="hover">
                                Sign up
                            </Link>
                        </Typography>
                    </Box>


                </Card>
            </div>
        </>
    )
}

export default LogIn