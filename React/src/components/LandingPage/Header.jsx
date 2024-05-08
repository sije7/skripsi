import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from '../../assets/Logo.jpg'

export default function HeaderLandingPage() {
    return (
        <Box sx={{
            width: '100%',
            height: '80px',
            padding: '2rem',
            backgroundColor: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);'
        }}>
            <Box
                component="img"
                sx={{
                    height: '80px',
                    width: '80px',
                    position: 'absolute',
                    backgroundColor: '#4287f5',
                    borderRadius: '50px'
                }}
                src={Logo}
            />
            <Link to={'/landingpage'} style={{ textDecoration: 'none' }}>
                <h1 style={{ marginLeft: '90px', color: 'black' }}>HopefulHarbor</h1>
            </Link>
            <Link style={{ textDecoration: 'none', color: 'black' }} to='/login'><h1>Masuk</h1></Link>
        </Box >

    )
}