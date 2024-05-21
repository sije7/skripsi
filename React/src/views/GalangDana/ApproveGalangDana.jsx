import { Box, Button, Grid, Snackbar } from "@mui/material";
import CardGalangDana from "../../components/GalangDana/CardGalangDana";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";

export default function ApproveGalangDana() {

    const [crowdfunding, setCrowdfunding] = useState([{}])
    const [role, setRole] = useState('')
    const [statusRequest] = useState([0])
    const location = useLocation()
    const [message, setMessage] = useState(null)
    const [stateSnackbar] = useState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = stateSnackbar;
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    useEffect(() => {
        location.state ? location.state.message ? setMessage(location.state.message) : '' : ''
        location.state ? location.state.message ? setOpen(true) : '' : ''
        window.history.replaceState({}, '')

        // setLoca
        axiosClient.get('/user')
            .then(({ data }) => {
                if (data.role !== 'admin') {
                    return <Navigate to='/' />
                }
                setRole(data.role)
            })
        const fd = new FormData()
        fd.append("status", statusRequest)
        axiosClient.post('/crowdfundings', fd)
            .then(({ data }) => {
                setCrowdfunding(data.crowdfundings)
            })

    }, [])

    return (
        <>
            {message && <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={5000}
                message={message}
                key={vertical + horizontal}
                onClose={handleClose}
            />}
            <Grid container sx={{ direction: 'row', padding: '10px' }}>
                {/* Grid Content */}
                <Grid item xs={6} md={12} sx={{ direction: 'column', padding: '20px' }} >
                    {/* Header Content */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <h1>Approve Request Galang Dana</h1>
                    </Grid>
                    <Grid item sx={{ direction: 'row' }}>
                        <Grid container direction={'row'} xs={12}  spacing={3}>
                            <Grid container xs={12} md={6} spacing={3}>
                                <Grid item>
                                    <Link to='/galangdana'>
                                        <Button variant="contained" style={{ backgroundColor: '#66AB92' }}>
                                            Galang Dana
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Content*/}
                    <Grid container spacing={5} direction='row' sx={{ padding: '30px' }}>
                        {crowdfunding.map(cr => (
                            <Grid item>
                                <CardGalangDana
                                    key={cr.id}
                                    id={cr.id}
                                    title={cr.title}
                                    image={cr.image}
                                    progress={cr.progress}
                                    fund = {null}
                                    target={cr.target ? cr.target.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : cr.target}
                                    deadline={cr.deadline}
                                    username={cr.username}
                                />
                            </Grid>
                        ))}
                    </Grid>

                </Grid>
            </Grid>
        </>
    )
}