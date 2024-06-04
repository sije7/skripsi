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
    const [role, setRole] = useState('');
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        jenis_kelamin: '',
        umur: '',
        nomor_telepon: '',
        // role: '',
        profile_image: '',
        no_req: '',
        lokasi: '',
        penanggung_jawab: '',
        bank: ''
    });
    const { setNotification } = useStateContext();

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/user`)
                .then(({ data }) => {
                    console.log(data);
                    setRole(data.role);
                    setUser(data);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                })
        }
    }, [id])

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

                                    {role === 'user' && (
                                        <>
                                            <h2>Jenis Kelamin :</h2>
                                            <Typography variant="body1" gutterBottom>{user.jenis_kelamin}</Typography>

                                            <h2>Umur :</h2>
                                            <Typography variant="body1" gutterBottom>{user.umur}</Typography>
                                        </>
                                    )}

                                    {role === 'lembaga' && (
                                        <>
                                            <h2>Lokasi :</h2>
                                            <Typography variant="body1" gutterBottom>{user.lokasi}</Typography>

                                            <h2>Nama Penanggung Jawab :</h2>
                                            <Typography variant="body1" gutterBottom>{user.penanggung_jawab}</Typography>
                                        </>
                                    )}

                                    <h2>Bank :</h2>
                                    <Typography variant="body1" gutterBottom>{user.bank}</Typography>

                                    <h2>Nomor Telepon :</h2>
                                    <Typography variant="body1" gutterBottom>{user.nomor_telepon}</Typography>

                                    <h2>Role :</h2>
                                    <Typography variant="body1" gutterBottom>{user.role}</Typography>

                                    <h2>No Rekening :</h2>
                                    <Typography variant="body1" gutterBottom>{user.no_req}</Typography>
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
    )
}
