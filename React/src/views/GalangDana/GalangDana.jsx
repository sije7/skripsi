import { Box, Button, Grid, Snackbar, TextField } from "@mui/material";
import CardGalangDana from "../../components/GalangDana/CardGalangDana";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import SearchIcon from '@mui/icons-material/Search';

export default function GalangDana() {

    const [crowdfunding, setCrowdfunding] = useState([{}])
    const [role, setRole] = useState('')
    const [statusRequest] = useState([1])
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
    const [search, setSearch] = useState('')

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        location.state ? location.state.message ? setMessage(location.state.message) : '' : ''
        location.state ? location.state.message ? setOpen(true) : '' : ''
        window.history.replaceState({}, '')

        axiosClient.get('/user')
            .then(({ data }) => {
                setRole(data.role)
            })

        const fd = new FormData()
        fd.append("status", statusRequest)

        axiosClient.post('/crowdfundings', fd)
            .then(({ data }) => {
                setCrowdfunding(data.crowdfundings)
                setLoading(false)
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
            {loading && <CircularIndeterminate />}
            {!loading && <Grid container sx={{ direction: 'row', padding: '10px' }}>
                {/* Grid Content */}
                <Grid item xs={6} md={12} sx={{ padding: '20px' }} >
                    {/* Header Content */}
                    <Grid container direction={'row'}>
                        <Grid item xs={10} md={10} sx={{ display: 'flex', justifyContent: 'center', paddingLeft:'19%' }}>
                            <h1>Galang Dana</h1>
                        </Grid>
                        <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            
                            <TextField
                                value={search}
                                onChange={event => setSearch(event.target.value)}
                                style={{ width:'320px'}}
                                label="Search..."
                                size="small"
                            />
                            <SearchIcon style={{height:'40px', width:'40px'}}/>
                        </Grid>
                    </Grid>
                    <Grid item sx={{marginTop:'20px'}}>
                        <Grid container direction={'row'} xs={6} md={12} spacing={3}>
                            <Grid container xs={12} md={6} spacing={3}>
                                <Grid item sx={{ marginTop: '20px' }}>
                                    <Link to='/galangdana/request'>
                                        <Button variant="contained" style={{ backgroundColor: '#66AB92' }}>
                                            Request Galang Dana
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid container xs={12} md={6} sx={{ justifyContent: 'right' }} spacing={3}>
                                <Grid item sx={{ marginTop: '20px' }}>
                                    {role === 'admin' && <Link to='/galangdana/approvepage'>
                                        <Button variant="contained" style={{ backgroundColor: '#66AB92' }}>
                                            Approve Galang Dana
                                        </Button>
                                    </Link>}
                                </Grid>
                                <Grid item sx={{ marginTop: '20px' }}>
                                    {role === 'admin' && <Link to='/galangdana/payment/approve'>
                                        <Button variant="contained" style={{ backgroundColor: '#66AB92' }}>
                                            Approve Pembayaran
                                        </Button>
                                    </Link>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Content*/}
                    <Grid container spacing={5} direction='row' sx={{ padding: '30px' }}>
                        {crowdfunding.filter((cr)=>{
                            return search.toLowerCase() === '' ? cr : cr.title.toLowerCase().includes(search) || cr.username.toLowerCase().includes(search)
                        }).map(cr => (
                            <Grid item>
                                <CardGalangDana
                                    key={cr.id}
                                    id={cr.id}
                                    title={cr.title}
                                    image={cr.image}
                                    progress={cr.progress}
                                    fund={cr.fund ? cr.fund.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : cr.fund}
                                    target={null}
                                    deadline={cr.deadline}
                                    username={cr.username}
                                    status={cr.status}
                                />
                            </Grid>
                        ))}
                    </Grid>

                </Grid>
            </Grid>}
        </>
    )
}