import { Button, Grid, Snackbar, TextField } from "@mui/material";
import CardDonasi from "../../components/Donasi/CardDonasi";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import { Form, Link, useLocation } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

export default function Donasi() {
    const [donation, setDonation] = useState([{}])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
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

    const [role, setRole] = useState('')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/user')
            .then((res) => {
                setRole(res.data.role)
            })
        location.state ? location.state.message ? setMessage(location.state.message) : '' : ''
        location.state ? location.state.message ? setOpen(true) : '' : ''
        window.history.replaceState({}, '')
        let fd = new FormData()
        fd.append('status', 3)

        axiosClient.post('/donations', fd)
            .then(({ data }) => {
                setDonation(data.donations)
                setLoading(false)
            })

        axiosClient.get('/categories')
            .then(({ data }) => {
                setCategories(data.categories)
            })

    }, [])

    function getBySubCategory(id){
        let fd = new FormData()
        fd.append('id',id)
        fd.append('status',3)
        axiosClient.post('/getDonationBySubCategory', fd)
        .then(({data})=>{
            setDonation(data.donations)
        })

    }
    function getByCategory(id){
        let fd = new FormData()
        fd.append('id',id)
        fd.append('status',3)
        axiosClient.post('/getDonationByCategory', fd)
        .then(({data})=>{
            setDonation(data.donations)
        })

    }


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
            {!loading && <Grid container direction={'row'}>
                {/* Kategori */}
                <Grid container md={2} sx={{ borderRight: '1px solid', minHeight: '700px', padding: '30px' }} direction={'column'}>
                    <h2>Kategori</h2>
                    {categories ? categories.map((ct) => (
                        <Grid item>
                            <ul style={{cursor:'pointer'}}><b onClick={()=>getByCategory(ct.id)}>{ct.name}</b>
                            {ct.subcategories ? ct.subcategories.map((sc)=>(
                                <li style={{ paddingLeft: '20px', cursor:'pointer' }} onClick={()=>getBySubCategory(sc.id)}>{sc.name}</li>
                            )) : ''}
                            </ul>
                        </Grid>
                    )) : ''}
                </Grid>
                {/* Content */}
                <Grid container md={10} direction={'column'}>
                    <Grid container direction={'row'} sx={{ marginTop: '20px', padding: '20px' }}>
                        <Grid item xs={10} md={9} sx={{ display: 'flex', justifyContent: 'center', paddingLeft: '19%' }}>
                            <h1>Donasi</h1>
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
                            <Link to={'/donasi/request'}>
                                <Button variant="contained" style={{ backgroundColor: '#66AB92' }}>
                                    Request Donasi
                                </Button>
                            </Link>
                        </Grid>
                        {role !== 'user' && <Grid item>
                            <Link to={'/donasi/approve'}>
                                <Button variant="contained" style={{ backgroundColor: '#66AB92' }}>
                                    Approve Donasi
                                </Button>
                            </Link>
                        </Grid>}
                    </Grid>
                    {/* Cards */}
                    <Grid container direction={'row'} sx={{ padding: '30px' }} spacing={3}>
                        {donation.filter((d) => {
                            return search.toLowerCase() === '' ? d : d.title.toLowerCase().includes(search) || d.username.toLowerCase().includes(search)
                        }).map((d) => (
                            <Grid item>
                                <CardDonasi
                                    key={d.id}
                                    id={d.id}
                                    title={d.title}
                                    progress={d.progress}
                                    deadline={d.deadline}
                                    username={d.username}
                                    image={d.image}
                                    subCategory={d.sub_category}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>}
        </>
    )
}