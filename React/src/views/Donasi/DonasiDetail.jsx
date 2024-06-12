import { Box, Button, Card, CardContent, Checkbox, Grid, Snackbar } from "@mui/material";
import LinearDeterminate from "../../components/LinearDeterminate";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useReducer, useState } from "react";
import axiosClient from "../../axios-client";
import { useNavigate, useParams } from "react-router-dom";
import CircularIndeterminate from "../../components/CircularIndeterminate";

export default function DonasiDetail() {

    const [detail, setDetail] = useState([{}])
    const id = useParams()
    const [role, setRole] = useState('')
    const [userId, setUserId] = useState('')
    const navigate = useNavigate()
    const [subCategories, setSubCategories] = useState([])
    const [progressDonation, setprogressDonation] = useState([])
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        axiosClient.post(`/donation/${id.id}`)
            .then(({ data }) => {
                console.log(data.donation)
                setDetail(data.donation)
                setSubCategories(removeDuplicates(data.donation.sub_category))
                setprogressDonation(data.donation.progress_donation)
                setLoading(false)
            })
        axiosClient.get('/user')
            .then(({ data }) => {
                setRole(data.role)
                setUserId(data.id)
            })
    }, [])

    function removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    function onChangeCheckbox(pd, i) {
        let temp = progressDonation
        temp[i].status = temp[i].status === 0 ? 1 : 0
        setprogressDonation(temp)
        forceUpdate()
    }

    function onUpdate() {
        let fd = new FormData()
        let tempStatus = []
        let tempId = []
        for (let i = 0; i < progressDonation.length; i++) {
            tempId[i] = progressDonation[i].id
            tempStatus[i] = progressDonation[i].status
        }
        fd.append('progress_id', tempId)
        fd.append('progress_status', tempStatus)

        axiosClient.post(`/donation/update/${detail.id}`, fd)
            .then((res) => {
                setMessage(res.data)
                setOpen(true)
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            })
    }

    function onApprove() {
        let fd = new FormData()
        if (detail.user_id === detail.pemohon_id && detail.status === 1) {
            fd.append('status', 3)
        } else if (role === 'lembaga') {
            fd.append('status', 3)
        }
        else {
            fd.append('status', 2)
        }
        fd.append('id', detail.id)
        axiosClient.post('/approveDonation', fd)
            .then((res) => {
                return navigate('/donasi', { state: { message: res.data } })
            })

    }

    function onReject() {
        let fd = new FormData()
        fd.append('id', detail.id)
        axiosClient.post('/rejectDonation', fd)
            .then((res) => {
                return navigate('/donasi', { state: { message: res.data } })
            })

    }


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
            {!loading &&
                <Grid>
                    <Button variant="contained" sx={{width:'100px', marginLeft:"30px", backgroundColor: '#FFD438', color:'black'}} onClick={()=>navigate(-1)}>
                    Back
                </Button>
                    <Grid container direction={'row'} sx={{ padding: '100px', paddingBottom: '0' }}>
                        <Grid container md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box
                                component="img"
                                sx={{
                                    height: '400px',
                                    width: '400px',
                                    borderRadius: '40px',
                                    minWidth: '400px',
                                }}
                                src={`http://localhost:8000${detail.image}`}
                            />
                        </Grid>

                        <Grid container md={6} direction={'column'} rowGap={2}>
                            <Grid item sx={{ textAlign: 'center' }}>
                                <h1>{detail.title}</h1>
                            </Grid>
                            <Grid item>
                                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <LinearDeterminate progress={detail.progress} />
                                </Grid>
                                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <h3>{detail.progress}%</h3>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <h2>Bentuk Donasi</h2>
                            </Grid>
                            <Grid container direction={'row'} spacing={1}  >
                                {subCategories ? subCategories.map((sc) => (
                                    <Grid item>
                                        <p style={{ backgroundColor: '#FFD438', padding: '5px', borderRadius: '5px' }}>{sc}</p>
                                    </Grid>
                                )) : ''}
                            </Grid>
                            <Grid item>
                                <h2>Lokasi Donasi</h2>
                            </Grid>
                            <Grid item>
                                <h4>{detail.location}</h4>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid container direction={'row'} sx={{ padding: '100px', paddingTop: '30px' }} spacing={1}>
                        {/* {Left} */}
                        <Grid container xs={12} md={6} sx={{ display: 'block' }}>
                            <Grid item>
                                <h1>Deskripsi</h1>
                            </Grid>
                            <Grid item>
                                <h3 style={{ fontWeight: 'normal' }}>{detail.description}</h3>
                            </Grid>
                        </Grid>
                        {/* Right */}
                        <Grid container xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'self-end' }}>
                            <Grid item >
                                <Card sx={{ width: '550px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                                    <Grid container direction={'column'} sx={{ minHeight: '100px' }}>
                                        <CardContent>
                                            <Grid item sx={{ textAlign: 'center' }}>
                                                <h2>Progress Donasi</h2>
                                            </Grid>
                                            {userId !== detail.user_id || detail.status !== 3 && progressDonation ? progressDonation.map((pd, i) => (
                                                <Grid item sx={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                                    <Checkbox
                                                        checked={pd.status}
                                                        color="secondary"
                                                        onChange={() => { onChangeCheckbox(pd, i) }}
                                                        disabled
                                                    />
                                                    <p>{pd.item.name} {pd.quantity} {pd.item.currency}</p>
                                                </Grid>
                                            )) : ''}
                                            {userId === detail.user_id && detail.status === 3 || role === 'admin' && detail.status === 3 && progressDonation ? progressDonation.map((pd, i) => (
                                                <Grid item sx={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                                    <Checkbox
                                                        checked={pd.status}
                                                        color="secondary"
                                                        onChange={() => { onChangeCheckbox(pd, i) }}
                                                    />
                                                    <p>{pd.item.name} {pd.quantity} {pd.item.currency}</p>
                                                </Grid>

                                            )) : ''}
                                            {userId === detail.user_id && detail.status === 3 &&
                                                <Grid item sx={{ display: 'flex', justifyContent: 'right' }}>
                                                    <Button variant="contained" color="success" style={{ backgroundColor: '#66AB92' }} onClick={onUpdate}>
                                                        Update Progress Donasi
                                                        {/* <EditIcon /> */}
                                                    </Button>
                                                </Grid>
                                            }
                                        </CardContent>

                                    </Grid>
                                </Card>
                                <Grid container direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Grid item sx={{ display: 'flex', marginTop: '30px' }}>
                                        {detail.status !== 3  && <Button variant="contained" color="error" style={{ width: '200px', height: '50px' }} onClick={onReject}>
                                            Reject Donasi
                                            {/* <EditIcon /> */}
                                        </Button>}
                                    </Grid>
                                    <Grid item sx={{ display: 'flex', marginTop: '30px' }}>
                                        {detail.status !== 3 && <Button variant="contained" color="success" style={{ backgroundColor: '#66AB92', width: '200px', height: '50px' }} onClick={onApprove}>
                                            Approve Donasi
                                            {/* <EditIcon /> */}
                                        </Button>}
                                    </Grid>

                                </Grid>


                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            }
        </>
    )
}