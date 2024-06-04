import * as React from 'react';
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid, Snackbar } from "@mui/material";
import Typography from '@mui/material/Typography';
import 'react-slideshow-image/dist/styles.css';
import { Fade, Zoom, Slide } from 'react-slideshow-image';
import Footer from '../components/Footer';
import axiosClient from '../axios-client';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import BanjirBandang from '../assets/Beranda/BanjirBandang.jpg'
import BanjirBandang2 from '../assets/Beranda/BanjirBandang2.jpg'
import MeletusJeder from '../assets/Beranda/MeletusJeder.jpg'
import GSJA from '../assets/Beranda/GSJA.jpg'
import TFI from '../assets/Beranda/TFI.jpg'
import TzuChi from '../assets/Beranda/TzuChi.jpg'

export default function Beranda() {
    const theme = useTheme();
    const [crowdfunding, setCrowdfunding] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusRequest] = useState([1]);
    const [role, setRole] = useState('');
    // const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        setLoading(true)

        axiosClient.get('/user')
            .then(({ data }) => {
                setRole(data.role);
                setLoading(false);
            })

        const fd = new FormData()
        fd.append("status", statusRequest)

        axiosClient.post(`/crowdfundings`, fd)
            .then(({ data }) => {
                console.log(data);
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
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '30px', width: '100%' }}>
                <Box
                    component="img"
                    sx={{
                        height: 400,
                        width: '100%'
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
                <Grid rowSpacing={{ xs: 6 }} container sx={{ justifyContent: 'space-evenly', paddingBottom: '0px', paddingTop: '100px' }}>
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
        backgroundColor: '#ffac33',
        textAlign: 'center'
    }

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '600px',
        backgroundSize: 'cover'
    }

    return (
        <>
            {/* Bagian Slide Show */}
            <div style={styles}>
                <Typography variant="h3" align="center"><b>Beranda</b></Typography>
                <div className='slide-container'>
                    <Fade>
                        {latestCrowdfunding.length > 0 && (
                            latestCrowdfunding.map((item, index) => (
                                <Link to={`/galangdana/${item.id}`}>
                                    <div key={index} style={{ ...divStyle, backgroundImage: `url(http://localhost:8000${item.image})` }}>
                                        <Box>
                                            <div style={{ display: 'inline-block', textAlign: 'center', backgroundColor: 'rgba(250, 250, 0, 0.5)', borderRadius: '5px' }}>
                                                <h4 style={{ fontSize: '30px', color: 'black' }}><b>{item.title}</b></h4>
                                                <p style={{ fontSize: '20px',color: 'black' }}>{item.description}</p>
                                            </div>
                                        </Box>
                                    </div>
                                </Link>
                            ))
                        )}
                    </Fade>
                </div>
            </div>
            &nbsp;
            {/* Bagian Donasi Terkini */}
            <Grid sx={{ justifyItems: 'start', marginLeft: '50px' }}>
                <Typography variant="h5" align="left"><b>Donasi Terkini</b></Typography>
            </Grid>
            {processedNonSlide}
            <Box mt={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link to=''>
                    <Button
                        variant="contained"
                        color="warning"
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
                    <p style={{ margin: 0, fontSize: '12px' }}>BERBUAT BAIK</p>
                    <p style={{ margin: 0, fontSize: '12px' }}>HAL YANG MULIA</p>
                </div>
            </Box>
            &nbsp;
            <Grid container spacing={2}>
                <Grid item xs={12} md={2} sx={{ marginTop: "30px" }}>
                    {PictDown({ picture: BanjirBandang })}
                </Grid>
                <Grid item xs={12} md={2}>
                    {PictUp({ picture: BanjirBandang2 })}
                </Grid>
                <Grid item xs={12} md={2} sx={{ marginTop: "30px" }}>
                    {PictDown({ picture: MeletusJeder })}
                </Grid>
                <Grid item xs={12} md={2}>
                    {PictUp({ picture: BanjirBandang })}
                </Grid>
                <Grid item xs={12} md={2} sx={{ marginTop: "30px" }}>
                    {PictDown({ picture: BanjirBandang2 })}
                </Grid>
                <Grid item xs={12} md={2}>
                    {PictUp({ picture: MeletusJeder })}
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
            <Grid container spacing={4} sx={{ justifyItems: 'center' }}>
                <Grid item xs={12} md={4}>
                    {LembagaSosial({ picture: GSJA, name: "GSJA" })}
                </Grid>
                <Grid item xs={12} md={4}>
                    {LembagaSosial({ picture: TzuChi, name: "Tzu Chi" })}
                </Grid>
                <Grid item xs={12} md={4}>
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
            <Footer />
        </>
    )
}
