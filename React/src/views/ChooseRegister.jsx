import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Container from '@mui/material/Container';
import Lembaga from '../assets/Lembaga.jpg'
import Timoty from '../assets/Timoty.jpg'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Footer from "../components/Footer";

export default function ChooseRegistration() {
    const styles = {
        backgroundColor: '#E1F3D8',
        padding: 4
    }

    return (
        <div style={styles}>
            <Container>
                <Typography variant="h3" align="center" gutterBottom>Register</Typography>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
                            <h1>As User</h1>
                            <Link to='/signup'>
                                <Box
                                    component="img"
                                    sx={{
                                        height: '400px',
                                        width: '400px',
                                        backgroundColor: '#f0f0f0',
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                        marginBottom: 2
                                    }}
                                    src={Timoty}
                                />
                                <Box mt={3}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>Register as User</Button>
                                </Box>
                            </Link>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
                            <h1>As Lembaga</h1>
                            <Link to='/signupLembaga'>
                                <Box
                                    component="img"
                                    sx={{
                                        height: '400px',
                                        width: '400px',
                                        backgroundColor: '#f0f0f0',
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                        marginBottom: 2
                                    }}
                                    src={Lembaga}
                                />
                                <Box mt={3}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>Register as Lembaga</Button>
                                </Box>
                            </Link>
                        </Card>
                    </Grid>
                </Grid>
            </Container >
            <Footer />
        </div>
    )
}
