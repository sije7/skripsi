import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from '../assets/Logo.jpg'
import Sushi from '../assets/sushi.jpg'

export default function HeaderMain() {
    return (
        <>
            <Grid container sx={{
                width: '100%',
                height: '90px',
                backgroundColor: '#ffffff',
                justifyContent: 'space-around',
                alignItems: 'center',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);',
                fontSize: '12px',
            }}>
                <Grid item sx={{ display: 'flex', zIndex: '1' }}>
                    <Link to='/'>
                        <Box
                            component="img"
                            sx={{
                                height: '80px',
                                width: '80px',
                                backgroundColor: '#4287f5',
                                borderRadius: '50px',
                            }}
                            src={Logo}
                        />
                    </Link>
                    <Link to={'/landingpage'} style={{ textDecoration: 'none' }}>
                        <h1 style={{ marginLeft: '10px', color: 'black', marginTop: '25px' }}>HopefulHarbor</h1>
                    </Link>
                </Grid>
                <Grid item sx={{ height: '80px', width: '80px' }}>

                </Grid>
                <Grid item sx={{ fontSize: '10px' }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/beranda'><h1>Beranda</h1></Link>
                </Grid>
                <Grid item sx={{ fontSize: '10px' }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/beranda'><h1>Pembelajaran</h1></Link>
                </Grid>
                <Grid item sx={{ fontSize: '10px' }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/beranda'><h1>Donasi</h1></Link>
                </Grid>
                <Grid item sx={{ fontSize: '10px' }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/beranda'><h1>Tentang Kami</h1></Link>
                </Grid>
                <Grid item sx={{ fontSize: '10px' }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/beranda'><h1>Galang Dana</h1></Link>
                </Grid>
                <Grid item sx={{ fontSize: '10px' }}>
                    <Link to='beranda'>
                        <Box
                            component="img"
                            sx={{
                                height: '60px',
                                width: '60px',
                                backgroundColor: '#4287f5',
                                borderRadius: '50px',
                            }}
                            src={Sushi}
                        />
                    </Link>
                </Grid>
            </Grid >
        </>
    )
}