import { Button, Card, CardContent, Grid } from "@mui/material";
import axiosClient from "../../axios-client";


export default function CardPayment(props) {
    function openInNewTab(url) {
        window.open(url, '_blank').focus();
    }
    const handleApprove = () => {
        let fd = new FormData()
        fd.append('transaction_id', props.id)
        fd.append('crowdfunding_id', props.crowdfundingId)
        axiosClient.post(`/transaction/approve`, fd)
            .then((res) => {
                props.setMessage(res.data)
                props.setOpen(true)
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            }
            )
    }

    const handleReject = () => {
        let fd = new FormData()
        fd.append('transaction_id', props.id)
        axiosClient.post(`/transaction/reject`, fd)
            .then((res) => {
                props.setMessage(res.data)
                props.setOpen(true)
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            }
            )
    }
    return (
        <>
            <Card sx={{ width: '250px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                <Grid container direction={'column'} sx={{minHeight:'300px'}}>
                    <CardContent>
                        <Grid item sx={{ textAlign: 'center' }}>
                            <h2>{props.title}</h2>
                        </Grid>
                        <Grid item sx={{ marginTop: '20px' }}>
                            <p>Donatur: {props.username}</p>
                        </Grid>
                        <Grid item>
                            <p>No Rek: {props.userRek}</p>
                        </Grid>
                        <Grid item>
                            <p>Bank Donatur: {props.userBank}</p>
                        </Grid>
                        <Grid item>
                            <p>No Rek Tujuan: {props.rek}</p>
                        </Grid>
                        <Grid item>
                            <p>Bank Tujuan: {props.bank}</p>
                        </Grid>
                        <Grid item>
                            <p>Dana: Rp {props.fund}</p>
                        </Grid>
                        <Grid item sx={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
                            <Button onClick={() => openInNewTab(`http://localhost:8000${props.image}`)}>
                                Bukti Pembayaran
                            </Button>
                        </Grid>
                        <Grid item sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Button variant="contained" color="error" onClick={handleReject}>
                                Reject
                            </Button>
                            <Button variant="contained" color="success" onClick={handleApprove} style={{backgroundColor: '#66AB92'}} >
                                Approve
                            </Button>
                        </Grid>
                    </CardContent>
                </Grid>
            </Card>
        </>
    )
}