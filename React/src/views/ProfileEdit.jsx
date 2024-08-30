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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Profile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [preview, setPreview] = useState('')
    const [role, setRole] = useState('')
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
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
            setLoading(true)
            axiosClient.get(`/user`)
                .then(({ data }) => {
                    setRole(data.role);
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
        setUser({ ...user, profile_image: e.target.files[0] })
        setPreview(URL.createObjectURL(file))
    }

    const updateData = () => {
        setLoading(true);
        let formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        if (user.password) {
            formData.append('password', user.password);
            formData.append('password_confirmation', user.password_confirmation);
        }
        if (user.jenis_kelamin !== undefined && user.jenis_kelamin !== null && user.jenis_kelamin !== '') {
            formData.append('jenis_kelamin', user.jenis_kelamin);
        }
        if (user.umur !== undefined && user.umur !== null && user.umur !== '' && !isNaN(user.umur) && Number(user.umur) > 0) {
            formData.append('umur', user.umur);
        }
        if (user.nomor_telepon !== undefined && user.nomor_telepon !== null && user.nomor_telepon !== '' && !isNaN(user.nomor_telepon) && Number(user.nomor_telepon) > 0) {
            formData.append('nomor_telepon', user.nomor_telepon);
        }
        formData.append('role', user.role);
        formData.append('no_req', user.no_req);

        formData.append('bank', user.bank);

        formData.append('lokasi', user.lokasi);

        formData.append('penanggung_jawab', user.penanggung_jawab);

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
                        style={{backgroundColor:'#66AB92'}}
                        loading
                        onClick={() => navigate('/profile')}>
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
                                    src=
                                    {preview ?
                                        preview :
                                        (user.profile_image ? `http://localhost:8000${user.profile_image}` : '')
                                    }
                                />
                            </Card>
                            <Box mt={2}>
                                <input type="file" onChange={handleImage} />
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
                                    disabled
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
                                {role === 'user' && (
                                    <>
                                        <FormControl component="fieldset" margin="normal">
                                            <FormLabel component="legend">Jenis Kelamin</FormLabel>
                                            <RadioGroup
                                                row
                                                name="jenis_kelamin"
                                                value={user.jenis_kelamin}
                                                onChange={event => setUser({ ...user, jenis_kelamin: event.target.value })}
                                            >
                                                <FormControlLabel value="pria" control={<Radio />} label="Pria" />
                                                <FormControlLabel value="wanita" control={<Radio />} label="Wanita" />
                                            </RadioGroup>
                                        </FormControl>

                                        <TextField
                                            fullWidth
                                            label="Umur"
                                            value={user.umur}
                                            onChange={event => setUser({ ...user, umur: event.target.value })}
                                            margin="normal"
                                        />
                                    </>
                                )}
                                {role === 'lembaga' && (
                                    <>
                                        <TextField
                                            fullWidth
                                            label="Lokasi"
                                            value={user.lokasi}
                                            onChange={event => setUser({ ...user, lokasi: event.target.value })}
                                            margin="normal"
                                        />

                                        <TextField
                                            fullWidth
                                            label="Nama Penanggung Jawab"
                                            value={user.penanggung_jawab}
                                            onChange={event => setUser({ ...user, penanggung_jawab: event.target.value })}
                                            margin="normal"
                                        />
                                    </>
                                )}
                                <TextField
                                    fullWidth
                                    label="Nomor Rekening"
                                    value={user.no_req}
                                    onChange={event => setUser({ ...user, no_req: event.target.value })}
                                    margin="normal"
                                />

                                <TextField
                                    fullWidth
                                    label="Bank"
                                    value={user.bank}
                                    onChange={event => setUser({ ...user, bank: event.target.value })}
                                    margin="normal"
                                />

                                <TextField
                                    fullWidth
                                    label="Nomor Telepon"
                                    value={user.nomor_telepon}
                                    onChange={event => setUser({ ...user, nomor_telepon: event.target.value })}
                                    margin="normal"
                                />
                                {/* {role === 'admin' && (
                                    <>
                                        <TextField
                                            fullWidth
                                            label="Role"
                                            value={user.role}
                                            onChange={event => setUser({ ...user, role: event.target.value })}
                                            margin="normal"
                                        />
                                    </>
                                )
                                } */}
                                <Box mt={2}>
                                    <Button style={{backgroundColor:'#66AB92'}} type="submit" variant="contained" color="primary" fullWidth>Save Data</Button>
                                </Box>
                            </form>
                        </Grid>
                    </Grid>
                )}
            </Container>
            {/* <Footer /> */}
        </>
    );
}
