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
                                    <Grid container direction={'column'} sx={{ minHeight: '300px' }}>
                                        <CardContent>
                                            <Grid item sx={{ textAlign: 'center' }}>
                                                <h2>Progress Donasi</h2>
                                            </Grid>
                                            {userId !== detail.user_id && progressDonation ? progressDonation.map((pd, i) => (
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
                                            {userId === detail.user_id || role === 'admin' && progressDonation ? progressDonation.map((pd, i) => (
                                                <Grid item sx={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                                    <Checkbox 
                                                    checked={pd.status} 
                                                    color="secondary" 
                                                    onChange={() => { onChangeCheckbox(pd, i) }}    
                                                    />
                                                    <p>{pd.item.name} {pd.quantity} {pd.item.currency}</p>
                                                </Grid>
                                            )) : ''}

                                            <Grid item sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                                <Button variant="contained" color="success" style={{ backgroundColor: '#66AB92' }} onClick={onUpdate}>
                                                    Update Progress Donasi
                                                    {/* <EditIcon /> */}
                                                </Button>
                                            </Grid>
                                        </CardContent>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            }
        </>
    )
}