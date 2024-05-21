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
        profile_image: '',
        no_req: ''
    });
    const { setNotification } = useStateContext();

    useEffect(() => {
        if (id) {
            setLoading(true)
            axiosClient.get(`/user`)
                .then(({ data }) => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                });
        }
    }, [id]);

    const handleImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setPreview(URL.createObjectURL(file))
    }

    const updateData = () => {
        setLoading(true);
        console.log("Submitting user data:", user);

        let formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        if (user.password) {
            formData.append('password', user.password);
            formData.append('password_confirmation', user.password_confirmation);
        }
        formData.append('jenis_kelamin', user.jenis_kelamin);
        formData.append('umur', user.umur);
        formData.append('nomor_telepon', user.nomor_telepon);
        formData.append('role', user.role);
        formData.append('no_req', user.no_req);
        console.log(user.nomor_telepon);
        console.log(user.no_req);


        if (user.profile_image instanceof File) {
            formData.append("profile_image", user.profile_image);
        }

        axiosClient.post(`/profileTryEdit/${user.id}`, formData)
            .then(() => {
                navigate(`/profile/${user.id}`);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                } else {
                    console.error("Error response:", response);
                }
                setLoading(false);
            });
    }

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
                            <form onSubmit={updateData}>
                                {errors &&
                                    <Box className="alert" mb={2}>
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
                                    label="Nomor Rekening"
                                    value={user.no_req}
                                    onChange={event => setUser({ ...user, no_req: event.target.value })}
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
