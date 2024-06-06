import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from '../../assets/Logo.jpg'

export default function HeaderLandingPage() {
    return (
        <>
            <Grid container sx={{
                width: '100%',
                height: '90px',
                backgroundColor: '#ffffff',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);',
                fontSize: '12px',
                padding: '10px'
            }}>
                <Grid item sx={{ display: 'flex', zIndex: '1' }}>
                    <Link>
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

                <Grid item>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/login'><h1>Sign In</h1></Link>
                </Grid>

            </Grid >
        </>
    )
}