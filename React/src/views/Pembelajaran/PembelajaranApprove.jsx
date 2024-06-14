import { Button, Grid, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import CardPembelajaran from "../../components/CardPembelajaran/CardPembelajaran";
import CircularIndeterminate from "../../components/CircularIndeterminate";

export default function PembelajaranApprove() {
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
    const [learnings, setLearnings] = useState([])
    const [categories, setCategories] = useState([])
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/user')
            .then((res) => {
                if(res.data.role !== 'admin'){
                    return navigate('/')
                }
                setRole(res.data.role)
            })
        location.state ? location.state.message ? setMessage(location.state.message) : '' : ''
        location.state ? location.state.message ? setOpen(true) : '' : ''
        window.history.replaceState({}, '')

        let fd = new FormData()
        fd.append('status', 0)
        axiosClient.post('/getLearnings', fd)
            .then(({ data }) => {
                setLearnings(data.learnings)
                setLoading(false)
            })

        axiosClient.get('/getLearningCategories', fd)
            .then(({ data }) => {
                setCategories(data.categories)
            })
    }, [])

    function getBySubCategory(id) {
        let fd = new FormData()
        fd.append('id', id)
        fd.append('status', 0)
        axiosClient.post('/getLearningBySubCategory', fd)
            .then(({ data }) => {
                setLearnings(data.learnings)
            })

    }
    function getByCategory(id) {
        let fd = new FormData()
        fd.append('id', id)
        fd.append('status', 0)
        axiosClient.post('/getLearningByCategory', fd)
            .then(({ data }) => {
                setLearnings(data.learnings)
            })

    }

    
    function getAll() {
        let fd = new FormData()
        fd.append('status', 0)
        axiosClient.post('/getLearnings', fd)
            .then(({ data }) => {
                setLearnings(data.learnings)
                setLoading(false)
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
                <Grid container md={2} sx={{ borderRight: '1px solid', minHeight: '700px', padding: '30px' }} direction={'column'}>
                <Grid onClick={() => getAll()} sx={{cursor: 'pointer'}}>
                    <h1>Kategori</h1>
                    </Grid>
                    <Grid item>
                        {categories ? categories.map((c) => (
                            <ul style={{ cursor: 'pointer' }} >
                                <b onClick={() => getByCategory(c.id)}>{c.name}</b>
                                {c.sub_categories ? c.sub_categories.map((sc) => (
                                    <li style={{ paddingLeft: '20px', cursor: 'pointer' }} onClick={() => getBySubCategory(sc.id)}>{sc.name}</li>
                                )) : ''}
                            </ul>
                        )) : ''}
                    </Grid>
                </Grid>
                <Grid container md={10} direction={'column'}>
                    {/* Header */}
                    <Grid container direction={'row'} sx={{ marginTop: '20px', padding: '20px' }}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <h1>Approve Pembelajaran</h1>
                        </Grid>
                        <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                            <Link to={'/pembelajaran'}>
                                <Button variant="contained" style={{ backgroundColor: '#66AB92' }}>
                                    Pembelajaran
                                </Button>
                            </Link>
                        </Grid>
                        {/* {role !== 'user' && <Grid item>
                            <Link to={'/donasi/approve'}>
                                <Button variant="contained" style={{ backgroundColor: '#66AB92' }}>
                                    Approve Pembelajaran
                                </Button>
                            </Link>
                        </Grid>} */}
                    </Grid>
                    {/* Cards */}
                    <Grid container direction={'row'} sx={{ padding: '30px' }} spacing={3}>
                        {learnings ? learnings.map((l) => (
                            <Grid item>
                                <CardPembelajaran
                                    id={l.id}
                                    image={l.thumbnail}
                                    title={l.title}
                                    year={l.created_at.slice(0, 4)}
                                    username={l.username}
                                    subCategory={l.sub_category}
                                />
                            </Grid>
                        )) : ''}
                    </Grid>
                </Grid>
            </Grid>}
        </>
    )
}