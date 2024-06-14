import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from '../assets/Logo.jpg'
import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { useStateContext } from "../context/ContextProvider"

export default function HeaderMain() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const { user, setNotification } = useStateContext()

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/user')
            .then(({ data }) => {
                setUsers(data.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

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
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/pembelajaran'><h1>Pembelajaran</h1></Link>
                </Grid>
                <Grid item sx={{ fontSize: '10px' }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/donasi'><h1>Donasi</h1></Link>
                </Grid>
                {user.role !== 'admin' && <Grid item sx={{ fontSize: '10px' }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/aboutus'><h1>Tentang Kami</h1></Link>
                </Grid>}
                {user.role === 'admin' && <Grid item sx={{ fontSize: '10px' }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/users'><h1>Users</h1></Link>
                </Grid>}
                <Grid item sx={{ fontSize: '10px' }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/galangdana'><h1>Galang Dana</h1></Link>
                </Grid>
                <Grid item sx={{ fontSize: '10px' }}>
                    <Link to={'/profile/' + user.id}>
                        <Box
                            component="img"
                            sx={{
                                height: '60px',
                                width: '60px',
                                // backgroundColor: '#4287f5',
                                borderRadius: '50px',
                            }}
                            src={`http://localhost:8000${user.profile_image}`}
                        />
                    </Link>
                </Grid>
            </Grid >
        </>
    )
}
