import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef } from 'react';
import { useStateContext } from '../context/ContextProvider';
import { useState } from 'react';
import axiosClient from '../axios-client';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                HopefulHarbor
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const [gender, setGender] = useState()
    const umurRef = useRef()
    const noReqRef = useRef()
    const noTelpRef = useRef()
    // const roleRef = useRef()
    const bankRef = useRef()

    const { setUser, setToken } = useStateContext()
    const [errors, setErrors] = useState(null)

    const styles = {
        // backgroundColor: '#E1F3D8',
        padding: 4
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            jenis_kelamin: gender || null,
            umur: umurRef.current.value,
            no_req: noReqRef.current.value,
            nomor_telepon: noTelpRef.current.value,
            role: "user",
            bank: bankRef.current.value
        }
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })

    }

    return (
        <div style={styles}>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: '#132519' }}>
                            <LockOutlinedIcon />
                        </Avatar> */}
                        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, borderRadius: 10, width:'1000px' }}>
                            <Typography component="h1" variant="h5">
                                {/* Sign Up User */}
                            </Typography>
                            {errors && <div className="alert">
                                {Object.keys(errors).map(key => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                            }
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={nameRef} placeholder="Nama Lengkap" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={emailRef} type="email" placeholder="Email Address" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={passwordRef} type="password" placeholder="Password" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography component="legend">Jenis Kelamin</Typography>
                                        <RadioGroup
                                            aria-label="jenis kelamin"
                                            name="jenis_kelamin"
                                            value={gender}
                                            onChange={(event) => setGender(event.target.value)}
                                        >
                                            <FormControlLabel value="pria" control={<Radio />} label="Pria" />
                                            <FormControlLabel value="wanita" control={<Radio />} label="Wanita" />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={noReqRef} type="" placeholder="No Rekening" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={umurRef} type="" placeholder="Umur" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={noTelpRef} type="" placeholder="No Telepon" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={bankRef} type="" placeholder="Bank" />
                                    </Grid>
                                </Grid>
                                <Grid item sx={{justifyContent:'center', display:'flex'}}>

                                <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ width: '400px' }}
                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </div>
    );
}
