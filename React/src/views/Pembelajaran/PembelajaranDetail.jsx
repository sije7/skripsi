import { Box, Button, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import CircularIndeterminate from "../../components/CircularIndeterminate";

export default function PembelajaranDetail() {
    const [role, setRole] = useState('')
    const id = useParams()
    const [detail, setDetail] = useState({})
    const [video, setVideo] = useState('')
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/user')
            .then((res) => {
                setRole(res.data.role)
            })

        axiosClient.post(`/getLearning/${id.id}`)
            .then(({ data }) => {
                if(data.learning === null){
                    return navigate('/')
                }
                setDetail(data.learning)
                setVideo("http://localhost:8000" + data.learning.upload_video)
                setLoading(false)
                
            })
    }, [])

    useEffect(() => {
      if(detail.status === 0 && role !=='admin'){
        return navigate('/')
      }
    }, [detail])
    

    function onApprove() {
        let fd = new FormData()
        fd.append('id', detail.id)
        axiosClient.post('/approveLearning', fd)
            .then((res) => {
                return navigate('/pembelajaran/approve', { state: { message: res.data } })
            })
    }

    function onReject() {
        let fd = new FormData()
        fd.append('id', detail.id)
        axiosClient.post('/rejectLearning', fd)
            .then((res) => {
                return navigate('/pembelajaran/approve', { state: { message: res.data } })
            })
    }

    return (
        <>
            {loading &&
                <CircularIndeterminate />}
            {!loading && <Grid container direction={'column'} spacing={3} rowSpacing={5} sx={{ padding: '50px', paddingTop: '20px' }}>
                <Button variant="contained" sx={{ width: '100px', marginLeft: "30px", backgroundColor: '#66AB92' }} onClick={() => navigate(-1)}>
                    Back
                </Button>
                <Grid item>
                    <h1>
                        {detail.title}
                    </h1>
                </Grid>
                {video && <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                    <video width="750" height="500" controls>
                        <source src={video} type="video/mp4" />
                    </video>
                </Grid>}
                <Grid container sx={{ paddingLeft: '200px', paddingRight: '200px', paddingTop:'50px', display:'block' }}>
                    <Grid item >
                        <h1>{detail.title_description}</h1>
                    </Grid>
                    <Grid item>
                        <p style={{fontSize:'20px'}}>{detail.description}
                        </p>
                    </Grid>
                </Grid>
                <Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        component="img"
                        sx={{
                            height: '400px',
                            width: '600px',
                            minWidth: '400px',
                        }}
                        src={`http://localhost:8000${detail.upload_image}`}
                    />
                </Grid>
                <Grid container direction={'row'} sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} spacing={10}>
                    <Grid item>
                        {detail?.status === 0 && role === 'admin' && <Button variant="contained" color="error" style={{ width: '200px', height: '50px' }} onClick={onReject}>
                            Reject Artikel
                        </Button>}
                    </Grid>
                    <Grid item>
                        {detail?.status === 0 && role === 'admin' && <Button variant="contained" color="success" style={{ backgroundColor: '#66AB92', width: '200px', height: '50px' }} onClick={onApprove}>
                            Approve Artikel
                        </Button>}
                    </Grid>
                </Grid>

            </Grid>}
        </>
    )
}