import { Box, Grid } from "@mui/material";
import Logo from '../assets/Logo.jpg'
import { Link } from "react-router-dom";
import Facebook from '../assets/Facebook.png'
import Instagram from '../assets/Instagram.png'
import Telegram from '../assets/Telegram.png'

export default function Footer() {
    return (
        <>
            <Box sx={{ backgroundColor: '#132519', padding: '50px', color: 'white', paddingBottom:'10px', marginTop:'30px' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid sx={{ display: 'flex' }}>
                        <Box
                            component="img"
                            sx={{
                                height: '80px',
                                width: '80px',
                                borderRadius: '50px'
                            }}
                            src={Logo}
                        />
                        <Grid sx={{ display: 'block' ,marginLeft:'20px'}}>
                            <h1>HopefulHarbor</h1>
                            <Grid>
                                <Box
                                    component="img"
                                    sx={{
                                        height: '40px',
                                        width: '40px',
                                        borderRadius: '50px',
                                    }}
                                    src={Facebook}
                                />
                                <Box
                                    component="img"
                                    sx={{
                                        height: '40px',
                                        width: '40px',
                                        borderRadius: '50px',
                                        marginLeft:'20px'
                                    }}
                                    src={Instagram}
                                />
                                <Box
                                    component="img"
                                    sx={{
                                        height: '40px',
                                        width: '40px',
                                        borderRadius: '50px',
                                        marginLeft:'20px'
                                    }}
                                    src={Telegram}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid>
                        <h2 style={{ marginBottom: '20px' }}>Contact</h2>
                        <p style={{ marginBottom: '20px' }}>HopefulHarbor24@gmail.com</p>
                        <p>+62 8787612361239</p>
                    </Grid>
                </Grid>
                <Grid spacing={2} container sx={{ display: 'block', justifyContent: 'center', padding: '20px' }}>
                    <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid sx={{ marginRight: '20px' }}>
                            <Link style={{ textDecoration: 'none', color: 'white' }}><h2>About</h2></Link>
                        </Grid>
                        <Grid sx={{ marginRight: '20px' }}>
                            <Link style={{ textDecoration: 'none', color: 'white' }}><h2>Faq</h2></Link>
                        </Grid>
                        <Grid sx={{ marginRight: '20px' }}>
                            <Link style={{ textDecoration: 'none', color: 'white' }}><h2>Lembaga Sosial</h2></Link>
                        </Grid>
                    </Grid >
                    <hr></hr>
                    <p style={{ textAlign: 'center', fontWeight:'10' }}>© 2024 All Right Reserved</p>
                </Grid>
            </Box>
        </>
    )
}