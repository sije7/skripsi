import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef } from 'react';
import { useStateContext } from '../context/ContextProvider';
import { useState } from 'react';
import axiosClient from '../axios-client';


const handleSubmit = (event) => {
    event.preventDefault()
    const payload = {
        title: titleRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value
    }
    axiosClient.post('/uploads', payload)
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


export default function Uploads(){
    const titleRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()

    return(
        <Box component= "form" noValidate onSubmit={{handleSubmit}} sx={{mt:4}}>
            <Grid item xs={12}>
                <h4>Judul</h4>
                <input ref={titleRef} placeholder="Full Name" />
            </Grid>
        </Box>

    );

}


