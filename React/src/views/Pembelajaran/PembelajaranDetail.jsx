import { Box, Button, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";

export default function PembelajaranDetail() {
    const [role, setRole] = useState('')
    const id = useParams()
    const [detail, setDetail] = useState({})
    const [video, setVideo] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        axiosClient.get('/user')
            .then((res) => {
                setRole(res.data.role)
            })

        axiosClient.post(`/getLearning/${id.id}`)
            .then(({ data }) => {
                setDetail(data.learning)
                setVideo("http://localhost:8000" + data.learning.upload_video)
            })
    }, [])

    function onApprove() {
        let fd = new FormData()
        fd.append('id', detail.id)
        axiosClient.post('/approveLearning',fd)
            .then((res) => {
                return navigate('/pembelajaran/approve', { state: { message: res.data } })
            })
    }

    function onReject() {
        let fd = new FormData()
        fd.append('id', detail.id)
        axiosClient.post('/rejectLearning',fd)
            .then((res) => {
                return navigate('/pembelajaran/approve', { state: { message: res.data } })
            })
    }

    return (
        <>
            <Grid container direction={'column'} spacing={3} rowSpacing={5} sx={{ padding: '50px', paddingTop: '20px' }}>
                <Grid item>
                    <h1>
                        {detail.title}
                    </h1>
                </Grid>
                {video && <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                    <video width="750" height="500" controls >
                        <source src={video} type="video/mp4" />
                    </video>
                </Grid>}
                {/* <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                    <video width="750" height="500" controls>
                        <source src={"http://localhost:8000/storage/videos/videoplayback.mp4"} type="video/mp4" />
                    </video>
                </Grid> */}
                <Grid item>
                    <h1>{detail.title_description}</h1>
                </Grid>
                <Grid item>
                    <p>{detail.description}
                    </p>
                </Grid>
                <Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        component="img"
                        sx={{
                            height: '400px',
                            width: '600px',
                            // borderRadius: '40px',
                            minWidth: '400px',
                        }}
                        src={`http://localhost:8000${detail.upload_image}`}
                    />
                </Grid>
                <Grid container direction={'row'} sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} spacing={10}>
                    <Grid item>
                        {detail?.status === 0 && role === 'admin' && <Button variant="contained" color="error" style={{ width: '200px', height: '50px' }} onClick={onReject}>
                            Reject Donasi
                        </Button>}
                    </Grid>
                    <Grid item>
                        {detail?.status === 0 && role === 'admin' && <Button variant="contained" color="success" style={{ backgroundColor: '#66AB92', width: '200px', height: '50px' }} onClick={onApprove}>
                            Approve Donasi
                        </Button>}
                    </Grid>
                </Grid>

            </Grid>
        </>
    )
}