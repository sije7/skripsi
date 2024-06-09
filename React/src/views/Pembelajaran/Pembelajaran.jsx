import { Button, Grid, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from "react-router-dom";
import axiosClient from "../../axios-client";
import CardPembelajaran from "../../components/CardPembelajaran/CardPembelajaran";

export default function Pembelajaran() {
    const [search, setSearch] = useState('')
    const [role, setRole] = useState('')
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
        axiosClient.get('/user')
            .then((res) => {
                setRole(res.data.role)
            })
        location.state ? location.state.message ? setMessage(location.state.message) : '' : ''
        location.state ? location.state.message ? setOpen(true) : '' : ''
        window.history.replaceState({}, '')

        let fd = new FormData()
        fd.append('status', 1)
        axiosClient.post('/getLearnings', fd)
            .then(({ data }) => {
                console.log(data)
            })

        axiosClient.get('/getLearningCategories', fd)
            .then(({ data }) => {
                console.log(data)
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

            <Grid container direction={'row'}>
                <Grid container md={2} sx={{ borderRight: '1px solid', minHeight: '700px', padding: '30px' }} direction={'column'}>
                    <h1>Kategori</h1>
                    <Grid item>
                        <ul style={{ cursor: 'pointer' }} >
                            <b>Kategori 1</b>
                            <li style={{ paddingLeft: '20px', cursor: 'pointer' }}>SubKategori 1</li>
                            <li style={{ paddingLeft: '20px', cursor: 'pointer' }}>SubKategori 2</li>
                            <li style={{ paddingLeft: '20px', cursor: 'pointer' }}>SubKategori 3</li>
                            <li style={{ paddingLeft: '20px', cursor: 'pointer' }}>SubKategori 4</li>
                            <li style={{ paddingLeft: '20px', cursor: 'pointer' }}>SubKategori 5</li>
                        </ul>
                        <ul style={{ cursor: 'pointer' }} >
                            <b>Kategori 2</b>
                            <li style={{ paddingLeft: '20px', cursor: 'pointer' }}>SubKategori 1</li>
                            <li style={{ paddingLeft: '20px', cursor: 'pointer' }}>SubKategori 2</li>
                            <li style={{ paddingLeft: '20px', cursor: 'pointer' }}>SubKategori 3</li>
                            <li style={{ paddingLeft: '20px', cursor: 'pointer' }}>SubKategori 4</li>
                            <li style={{ paddingLeft: '20px', cursor: 'pointer' }}>SubKategori 5</li>
                        </ul>
                    </Grid>
                </Grid>
                <Grid container md={10} direction={'column'}>
                    {/* Header */}
                    <Grid container direction={'row'} sx={{ marginTop: '20px', padding: '20px' }}>
                        <Grid item xs={10} md={9} sx={{ display: 'flex', justifyContent: 'center', paddingLeft: '19%' }}>
                            <h1>Pembelajaran</h1>
                        </Grid>
                        <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <TextField
                                value={search}
                                onChange={event => setSearch(event.target.value)}
                                style={{ width: '230px' }}
                                label="Search..."
                                size="small"
                            />
                            <SearchIcon style={{ height: '40px', width: '40px' }} />
                        </Grid>
                    </Grid>
                    {/* Buttons */}
                    <Grid container direction={'row'} sx={{ justifyContent: 'space-between', paddingLeft: '30px', paddingRight: '30px' }}>
                        <Grid item>
                            <Link to={'/pembelajaran/upload'}>
                                <Button variant="contained" style={{ backgroundColor: '#66AB92' }}>
                                    Upload Pembelajaran
                                </Button>
                            </Link>
                        </Grid>
                        {role !== 'user' && <Grid item>
                            <Link to={'/donasi/approve'}>
                                <Button variant="contained" style={{ backgroundColor: '#66AB92' }}>
                                    Approve Pembelajaran
                                </Button>
                            </Link>
                        </Grid>}
                    </Grid>
                    {/* Cards */}
                    <Grid container direction={'row'} sx={{ padding: '30px' }} spacing={3}>
                        <Grid item>
                            <CardPembelajaran />
                        </Grid>
                        <Grid item>
                            <CardPembelajaran />
                        </Grid>
                        <Grid item>
                            <CardPembelajaran />
                        </Grid>
                        <Grid item>
                            <CardPembelajaran />
                        </Grid>
                        <Grid item>
                            <CardPembelajaran />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}