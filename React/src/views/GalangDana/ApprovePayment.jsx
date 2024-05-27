import { Button, Grid, Snackbar } from "@mui/material";
import CardPayment from "../../components/GalangDana/CardPayment";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import CircularIndeterminate from "../../components/CircularIndeterminate";

export default function ApprovePayment() {
    const navigate = useNavigate()
    const [transactions, setTransactions] = useState([{}])
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

    const[loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/user')
            .then(({ data }) => {
                if (data.role !== 'admin') {
                    return navigate('/')
                }
            })
        let fd = new FormData()
        fd.append('status', 1)
        axiosClient.post('/transactions', fd)
            .then(({ data }) => {
                setTransactions(data.transactions)
                setLoading(false)
            })
    }, [])

    return (
        <>
            {loading && 
            <CircularIndeterminate />}
            {message && <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={5000}
                message={message}
                key={vertical + horizontal}
                onClose={handleClose}
            />}
            {!loading && <Grid container sx={{ direction: 'row', padding: '10px' }}>
                {/* Grid Content */}
                <Grid item xs={6} md={12} sx={{ direction: 'column', padding: '20px' }} >
                    {/* Header Content */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <h1>Approve Pembayaran</h1>
                    </Grid>
                    <Grid item sx={{ direction: 'row' }}>
                        <Grid container direction={'row'} xs={12} spacing={3}>
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
                        {transactions.map(tr => (
                            <Grid item>
                                <CardPayment
                                    key={tr.id}
                                    id={tr.id}
                                    crowdfundingId={tr.crowdfunding_id}
                                    title={tr.title}
                                    username={tr.username}
                                    userRek={tr.userRek ? tr.userRek : '-'}
                                    userBank={tr.userBank ? tr.userBank: '-'}
                                    rek={tr.no_rekening}
                                    bank={tr.bank}
                                    fund={tr.fund ? tr.fund.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : tr.fund}
                                    image={tr.image}
                                    setMessage={setMessage}
                                    setOpen={setOpen}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>}
        </>
    )
}