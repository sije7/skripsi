import * as React from 'react';
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Profile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        jenis_kelamin: '',
        umur: '',
        nomor_telepon: '',
        role: '',
        profile_image: null
    });
    const { setNotification } = useStateContext();

    useEffect(() => {
        if (id) {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    console.log(data)
                    setUser(data.data);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                });
        }
    }, [id]);

    const updateTextData = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log("Submitting user text data:", user);

        try {
            const formData = new FormData();
            // formData.append('_method', 'PUT');
            formData.append('name', user.name);
            console.log(user.name);
            formData.append('email', user.email);
            console.log(user.email);
            if (user.password) {
                formData.append('password', user.password);
                formData.append('password_confirmation', user.password_confirmation);
            }
            console.log(user.password);
            console.log(user.password_confirmation);
            formData.append('jenis_kelamin', user.jenis_kelamin);
            console.log(user.jenis_kelamin);
            formData.append('umur', user.umur);
            console.log(user.umur);
            formData.append('nomor_telepon', user.nomor_telepon);
            console.log(user.nomor_telepon);
            formData.append('role', user.role);
            console.log(user.role);
            if (user.profile_image) {
                formData.append('profile_image', user.profile_image);
            }
            console.log(user.profile_image);

            // const response = await axiosClient.put(`/users/${user.id}`, {
            //     name: user.name,
            //     email: user.email,
            //     password: user.password,
            //     password_confirmation: user.password_confirmation,
            //     jenis_kelamin: user.jenis_kelamin,
            //     umur: user.umur,
            //     nomor_telepon: user.nomor_telepon,
            //     role: user.role
            // });
            console.log("sebelum axios client");
            await axiosClient.put(`/users/${user.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log("sesudah axios client");
            
            setNotification('User data was successfully updated');
            navigate(`/profile/${user.id}`);
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                console.error("Validation errors:", response.data.errors);
                setErrors(response.data.errors);
            } else {
                console.error("Error response:", response);
            }
        } finally {
            setLoading(false);
        }
    }

    // const updateProfileImage = async (event) => {
    //     event.preventDefault();
    //     setLoading(true);
    //     console.log("Submitting user profile image:", user.profile_image);

    //     try {
    //         const formData = new FormData();
    //         formData.append('profile_image', user.profile_image);

    //         await axiosClient.put(`/users/${user.id}`, formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' }
    //         });

    //         setNotification('User profile image was successfully updated');
    //         navigate(`/profile/${user.id}`);
    //     } catch (err) {
    //         const response = err.response;
    //         if (response && response.status === 422) {
    //             console.error("Validation errors:", response.data.errors);
    //             setErrors(response.data.errors);
    //         } else {
    //             console.error("Error response:", response);
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    return (
        <>
            <Container>
                <Typography variant="h4" align="center" gutterBottom>Profile Edit</Typography>
                <Link to={'/profile/' + user.id}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ArrowBackIcon />}
                        loading
                        // fullWidth
                        onClick={() => navigate('/')}>
                        Back
                    </Button>
                </Link>
                {loading ? (
                    <Typography variant="h6" align="center">Loading...</Typography>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            &nbsp;
                            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                                <Box
                                    component="img"
                                    sx={{
                                        height: '300px',
                                        width: '300px',
                                        backgroundColor: '#f0f0f0',
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                        marginBottom: 2
                                    }}
                                    src={user.profile_image ? `http://localhost:8000${user.profile_image}` : ''}
                                />
                            </Card>
                            <Box mt={2}>
                                <input type="file" onChange={event => setUser({ ...user, profile_image: event.target.files[0] })} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <form onSubmit={updateTextData}>
                                {errors && <Box className="alert" mb={2}>
                                    {Object.keys(errors).map(key => (
                                        <Typography color="error" key={key}>{errors[key][0]}</Typography>
                                    ))}
                                </Box>}
                                <TextField
                                    fullWidth
                                    label="Name"
                                    value={user.name}
                                    onChange={event => setUser({ ...user, name: event.target.value })}
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={user.email}
                                    onChange={event => setUser({ ...user, email: event.target.value })}
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    value={user.password}
                                    onChange={event => setUser({ ...user, password: event.target.value })}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Password Confirmation"
                                    type="password"
                                    onChange={event => setUser({ ...user, password_confirmation: event.target.value })}
                                    margin="normal"
                                />

                                <TextField
                                    fullWidth
                                    label="Jenis Kelamin"
                                    value={user.jenis_kelamin}
                                    onChange={event => setUser({ ...user, jenis_kelamin: event.target.value })}
                                    margin="normal"
                                />

                                <TextField
                                    fullWidth
                                    label="Umur"
                                    value={user.umur}
                                    onChange={event => setUser({ ...user, umur: event.target.value })}
                                    margin="normal"
                                />

                                <TextField
                                    fullWidth
                                    label="Nomor Telepon"
                                    value={user.nomor_telepon}
                                    onChange={event => setUser({ ...user, nomor_telepon: event.target.value })}
                                    margin="normal"
                                />
                                {user.role === 'admin' &&
                                    <TextField
                                        fullWidth
                                        label="Role"
                                        value={user.role}
                                        onChange={event => setUser({ ...user, role: event.target.value })}
                                        margin="normal"
                                    />
                                }
                                <Box mt={2}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>Save Data</Button>
                                </Box>
                            </form>
                        </Grid>
                    </Grid>
                )}
            </Container>
            <Footer />
        </>
    );
}
