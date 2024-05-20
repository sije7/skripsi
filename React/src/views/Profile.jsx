import * as React from 'react';
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
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
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        jenis_kelamin: '',
        umur: '',
        nomor_telepon: '',
        role: '',
        profile_image: null
    });
    const { setNotification } = useStateContext();

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    console.log(data);
                    setUser(data.data);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                });
        }
    }, [id]);

    const updateProfileImage = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log("Submitting user profile image:", user.profile_image);

        try {
            const formData = new FormData();
            formData.append('profile_image', user.profile_image);

            await axiosClient.put(`/users/${user.id}/profile_image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setNotification('User profile image was successfully updated');
            navigate('/users');
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                console.error("Validation errors:", response.data.errors);
            } else {
                console.error("Error response:", response);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Container>
                <Typography variant="h3" align="center" gutterBottom>Profile</Typography>
                <Link to={'/users'}>
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
                                    src={`http://localhost:8000${user.profile_image}`} // Default image if profile_image is null
                                    alt="Profile"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            &nbsp;
                            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: 2 }}>
                                <Box sx={{ padding: 2 }}>
                                    <h2>Nama :</h2>
                                    <Typography variant="body1" gutterBottom>{user.name}</Typography>

                                    <h2>Email :</h2>
                                    <Typography variant="body1" gutterBottom>{user.email}</Typography>

                                    <h2>Jenis Kelamin :</h2>
                                    <Typography variant="body1" gutterBottom>{user.jenis_kelamin}</Typography>

                                    <h2>Umur :</h2>
                                    <Typography variant="body1" gutterBottom>{user.umur}</Typography>

                                    <h2>Nomor Telepon :</h2>
                                    <Typography variant="body1" gutterBottom>{user.nomor_telepon}</Typography>

                                    <h2>Role :</h2>
                                    <Typography variant="body1" gutterBottom>{user.role}</Typography>
                                </Box>
                            </Card>
                            <Box mt={2}>
                                <Link to={'/profileEdit/' + user.id}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        loading
                                        fullWidth
                                        onClick={() => navigate('/')}>
                                        Edit Profile
                                    </Button>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Container>
            <Footer />
        </>
    );
}
