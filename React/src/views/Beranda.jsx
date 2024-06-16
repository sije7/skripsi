import * as React from 'react';
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid, Snackbar } from "@mui/material";
import Typography from '@mui/material/Typography';
import 'react-slideshow-image/dist/styles.css';
import { Fade, Zoom, Slide } from 'react-slideshow-image';
import Footer from '../components/Footer';
import axiosClient from '../axios-client';
import { Link, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import BanjirBandang from '../assets/Beranda/BanjirBandang.jpg'
import BanjirBandang2 from '../assets/Beranda/BanjirBandang2.jpg'
import MeletusJeder from '../assets/Beranda/MeletusJeder.jpg'
import GSJA from '../assets/Beranda/GSJA.jpg'
import TFI from '../assets/Beranda/TFI.jpg'
import TzuChi from '../assets/Beranda/TzuChi.jpg'
import I1 from '../assets/Beranda/1.jpg'
import I2 from '../assets/Beranda/2.jpg'
import I3 from '../assets/Beranda/3.jpg'
import I4 from '../assets/Beranda/4.jpg'
import I5 from '../assets/Beranda/5.jpg'
import I6 from '../assets/Beranda/6.jpg'
import CircularIndeterminate from '../components/CircularIndeterminate';


export default function Beranda() {
    const theme = useTheme();
    const [crowdfunding, setCrowdfunding] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusRequest] = useState([1]);
    const [role, setRole] = useState('');
    const [donations, setDonations] = useState([])
    const [donation1, setDonation1] = useState({})
    const [donation2, setDonation2] = useState({})
    const [donation3, setDonation3] = useState({})
    // const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)

        axiosClient.get('/user')
            .then(({ data }) => {
                setRole(data.role);
            })

        let formData = new FormData()
        formData.append('status', 3)

        axiosClient.post('/donations', formData)
            .then(({ data }) => {
                let len = data.donations.length
                setDonation1(data.donations[len - 1])
                setDonation2(data.donations[len - 2])
                setDonation3(data.donations[len - 3])
                setDonations(data.donations)
                setLoading(false)
            })

        const fd = new FormData()
        fd.append("status", statusRequest)

        axiosClient.post(`/crowdfundings`, fd)
            .then(({ data }) => {
                setCrowdfunding(data.crowdfundings);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }, [])

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => {
    //         if (prevActiveStep >= 4) {
    //             return 0
    //         } else {
    //             return prevActiveStep + 1
    //         }
    //     })
    // }

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1)
    // }

    // const maxSteps = crowdfunding.length

    const sortedCrowdfunding = crowdfunding.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

    const latestCrowdfunding = sortedCrowdfunding.slice(0, 5)

    const latestNonSlide = sortedCrowdfunding.slice(0, 3)

    const PictUp = ({ picture }) => {
        return (
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                    component="img"
                    sx={{
                        height: 350,
                        width: '100%',
                        minWidth: '400px',
                        borderRadius: '10%',
                    }}
                    src={picture}
                />
            </Card>
        )
    }

    const PictDown = ({ picture }) => {
        return (
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                    component="img"
                    sx={{
                        // marginTop: '20px',
                        height: 350,
                        width: '100%',
                        minWidth: '400px',
                        borderRadius: '10%',
                    }}
                    src={picture}
                />
            </Card>
        )
    }

    const LembagaSosial = ({ picture, name }) => {
        return (
            <Card sx={{ borderRadius: '30px', width: '50%' }}>
                <Box
                    component="img"
                    sx={{
                        height: 245,
                        width: '100%',
                        borderRadius: '30px'
                    }}
                    src={picture}
                />
                <br />
                <br />
                <Typography variant="h4" align="center"><b>{name}</b></Typography>
            </Card>
        )
    }

    const processedNonSlide = latestNonSlide.map(d => {
        if (d.id % 2 === 0) {
            return (
                <Grid rowSpacing={{ xs: 6 }} container sx={{ justifyContent: 'space-evenly', paddingBottom: '0px', paddingTop: '100px' }}>
                    <Grid item xs={12} md={4}>
                        <div key={d.id}>
                            <Typography variant='h6' align="left"><b>{d.title}</b></Typography>
                            {/* Konten tambahan untuk id genap */}
                            <p>{d.description}</p>
                        </div>
                        <Box mt={2} display="flex" justifyContent="flex-start">
                            <Link to=''>
                                <Button
                                    variant="contained"
                                    color="warning">
                                    Donation
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            component="img"
                            sx={{
                                height: 350,
                                width: '100%',
                                minWidth: '400px',
                                borderRadius: '10%',
                            }}
                            src={`http://localhost:8000${d.image}`}
                        />

                    </Grid>
                </Grid>
            );
        } else {
            return (
                <Grid rowSpacing={{ xs: 6 }} container sx={{ justifyContent: 'space-evenly', paddingBottom: '100px' }}>
                    <Grid item xs={12} md={4}>
                        <Box
                            component="img"
                            sx={{
                                height: 350,
                                width: '100%',
                                minWidth: '300px',
                                borderRadius: '10%',
                            }}
                            src={`http://localhost:8000${d.image}`}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div>
                            <Typography variant='h6' align="right"><b>{d.title}</b></Typography>
                            {/* Konten tambahan untuk id ganjil */}
                            <p>{d.description}</p>
                        </div>
                        <Box mt={2} display="flex" justifyContent="flex-end">
                            <Link to=''>
                                <Button
                                    variant="contained"
                                    color="warning">
                                    Donation
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            );
        }
    });

    const styles = {
        // backgroundColor: '#ffac33',
        textAlign: 'center'
    }

    const divStyle = {
        display: 'flex',
        // alignItems: 'top',
        justifyContent: 'left',
        height: '600px',
        backgroundSize: 'cover',
    }

    return (
        <>
            {loading && <CircularIndeterminate />}
            {/* Bagian Slide Show */}
            {!loading && <div>
                <div style={styles}>
                    {/* <Typography variant="h3" align="center"><b>Beranda</b></Typography> */}
                    <div className='slide-container'>
                        <Fade>
                            {latestCrowdfunding.length > 0 && (
                                latestCrowdfunding.map((item, index) => (
                                    <Link to={`/galangdana/${item.id}`}>
                                        <div key={index} style={{ ...divStyle, backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(http://localhost:8000${item.image})` }}>
                                            <Box>
                                                <div style={{ display: 'inline-block', textAlign: 'Left', borderRadius: '5px', width: '70%', marginTop: '50px' }}>
                                                    <h4 style={{ fontSize: '36px', color: 'white' }}><b>{item.title}</b></h4>
                                                    {/* <p style={{ fontSize: '20px',color: 'black' }}>{item.description}</p> */}
                                                </div>
                                            </Box>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </Fade>
                    </div>
                </div >

                {/* Bagian Donasi Terkini */}
                <Grid sx={{ justifyItems: 'start', padding: '50px', paddingLeft: '200px' }}>
                    <Typography variant="h5" align="left"><b>Donasi Terkini</b></Typography>
                </Grid>
                {/* {processedNonSlide} */}
                {donation1 && <Grid rowSpacing={{ xs: 6 }} container sx={{ justifyContent: 'space-evenly', paddingBottom: '100px' }}>
                    <Grid item xs={12} md={4}>
                        <Box
                            component="img"
                            sx={{
                                height: 300,
                                width: '100%',
                                boxShadow: '20px 20px'
                            }}
                            src={`http://localhost:8000${donation1.image}`}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <h1>{donation1.title}</h1>
                        <p style={{ marginTop: '30px', fontSize: '16px' }}>{donation1.description}</p>
                        <Grid item sx={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
                            <Button
                                variant="contained"
                                color="warning"
                                style={{ backgroundColor: '#66AB92' }}
                                onClick={() => navigate(`/donasi/${donation1.id}`)}>
                                Donasi
                            </Button>
                        </Grid>
                        {/* <p style={{ fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>Ingatlah, upaya bersama kita dapat menyembuhkan dan memulihkan. Mari berdiri bersatu, saling mendukung melalui badai kehidupan.</p> */}
                    </Grid>
                </Grid>}

                {donation2 && <Grid rowSpacing={{ xs: 6 }} container sx={{ justifyContent: 'space-evenly', paddingBottom: '100px' }}>
                    <Grid item xs={12} md={4}>
                        <h1>{donation2.title}</h1>
                        <p style={{ marginTop: '30px', fontSize: '16px' }}>{donation2.description}</p>
                        <Grid item sx={{ display: 'flex', justifyContent: 'left', marginTop: '20px', }}>
                            <Button
                                style={{ backgroundColor: '#66AB92' }}
                                variant="contained"
                                color="warning"
                                onClick={() => navigate(`/donasi/${donation2.id}`)}>
                                Donasi
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            component="img"
                            sx={{
                                height: 300,
                                width: '100%',
                                minWidth: '400px',
                                boxShadow: '20px 20px'
                            }}
                            src={`http://localhost:8000${donation2.image}`}
                        />
                    </Grid>
                </Grid>}

                {donation3 && <Grid rowSpacing={{ xs: 6 }} container sx={{ justifyContent: 'space-evenly', paddingBottom: '20px' }}>
                    <Grid item xs={12} md={4}>
                        <Box
                            component="img"
                            sx={{
                                height: 300,
                                width: '100%',
                                boxShadow: '20px 20px'
                            }}
                            src={`http://localhost:8000${donation3.image}`}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <h1>{donation3.title}</h1>
                        <p style={{ marginTop: '30px', fontSize: '16px' }}>{donation3.description}</p>
                        <Grid item sx={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
                            <Button
                                style={{ backgroundColor: '#66AB92' }}
                                variant="contained"
                                color="warning"
                                onClick={() => navigate(`/donasi/${donation3.id}`)}>
                                Donasi
                            </Button>
                        </Grid>
                        {/* <p style={{ fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>Ingatlah, upaya bersama kita dapat menyembuhkan dan memulihkan. Mari berdiri bersatu, saling mendukung melalui badai kehidupan.</p> */}
                    </Grid>
                </Grid>}
                <Box mt={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to='/donasi'>
                        <Button
                            variant="contained"
                            color="warning"
                            style={{ backgroundColor: '#66AB92' }}
                            loading>
                            Lihat Semua
                        </Button>
                    </Link>
                </Box>
                {/* Bagian 6 Gambar */}
                <br />
                <br />
                <Box mt={6} sx={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', textAlign: 'left' }}>
                        <h1 style={{ margin: 0, fontSize: '70px' }}><b>MENOLONG</b></h1>
                        <h1 style={{ margin: 0, fontSize: '70px' }}><b>SESAMA</b></h1>
                    </div>
                    <div style={{ display: 'inline-block', textAlign: 'right' }}>
                        <p style={{ margin: 0, fontSize: '12px' }}><b>BERBUAT BAIK</b></p>
                        <p style={{ margin: 0, fontSize: '12px' }}><b>HAL YANG MULIA</b></p>
                    </div>
                </Box>

                <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} md={1.5} sx={{ marginTop: "30px" }}>
                        {PictDown({ picture: I1 })}
                    </Grid>
                    <Grid item xs={12} md={1.5}>
                        {PictUp({ picture: I2 })}
                    </Grid>
                    <Grid item xs={12} md={1.5} sx={{ marginTop: "30px" }}>
                        {PictDown({ picture: I3 })}
                    </Grid>
                    <Grid item xs={12} md={1.5}>
                        {PictUp({ picture: I4 })}
                    </Grid>
                    <Grid item xs={12} md={1.5} sx={{ marginTop: "30px" }}>
                        {PictDown({ picture: I5 })}
                    </Grid>
                    <Grid item xs={12} md={1.5}>
                        {PictUp({ picture: I6 })}
                    </Grid>
                </Grid>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                {/* Bagian Lembaga Sosial */}
                <Grid sx={{ justifyItems: 'center' }}>
                    <Typography variant="h5" align="center"><b>Lembaga Sosial</b></Typography>
                </Grid>
                <br />
                <br />
                <br />
                <Grid container spacing={0} direction={'row'} >
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {LembagaSosial({ picture: GSJA, name: "GSJA" })}
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {LembagaSosial({ picture: TzuChi, name: "Tzu Chi" })}
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {LembagaSosial({ picture: TFI, name: "Teach For Indonesia" })}
                    </Grid>
                </Grid>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                {/* <Geolocation /> */}
                {/* <Footer /> */}
            </div>}
        </>
    )
}
