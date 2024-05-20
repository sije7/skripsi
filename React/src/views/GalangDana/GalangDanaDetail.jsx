import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import axiosClient from "../../axios-client"
import { useEffect, useState } from "react"
import { Box, Button, Grid } from "@mui/material"
import LinearDeterminate from "../../components/LinearDeterminate"

export default function GalangDanaDetail() {
    const [detail, setDetail] = useState({})
    const id = useParams()
    const [role, setRole] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setRole(data.role)
            })

        axiosClient.get(`/crowdfunding/${id.id}`)
            .then(({ data }) => {
                setDetail(data.crowdfunding)
            })
    }, [])

    let image = `http://localhost:8000${detail.image}`

    const handleApprove = () => {
        axiosClient.post(`/crowdfunding/approve/${id.id}`)
            .then((res) => {
                console.log(res.data)
                return navigate('/galangdana/approvepage',{state:{message:res.data}})
            }
            )
    }

    return (
        <>
            <Grid container direction={'row'} sx={{ padding: '100px', paddingBottom: '0' }}>
                {/* {Left Side} */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        component="img"
                        sx={{
                            height: '400px',
                            width: '400px',
                            borderRadius: '40px',
                            minWidth: '400px',
                        }}
                        src={image}
                    />
                </Grid>
                {/* {Right Side} */}
                <Grid container xs={12} md={6} direction={'column'} rowGap={2} >
                    <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
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
                    <Grid container sx={{ justifyContent: 'space-between' }}>
                        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <h2 style={{ fontWeight: 'normal' }}>Dana Terkumpul</h2>
                        </Grid>
                        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <h2 style={{ fontWeight: 'normal' }}>Target</h2>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ justifyContent: 'space-between' }}>
                        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <h2>Rp {detail.fund}</h2>
                        </Grid>
                        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <h2>Rp {detail.target}</h2>
                        </Grid>
                    </Grid>
                    <Grid item>
                    </Grid>
                    <Grid item>
                    </Grid>
                    <Grid item>
                        <h1>Lokasi</h1>
                    </Grid>
                    <Grid item>
                        <h3>{detail.location}</h3>
                    </Grid>
                </Grid>
            </Grid>
            {/* Bottom */}
            <Grid container direction={'row'} sx={{ padding: '100px', paddingTop: '30px' }} spacing={1}>
                {/* {Left} */}
                <Grid container xs={12} md={8} sx={{display:'block'}}>
                    <Grid item>
                        <h1>Deskripsi</h1>
                    </Grid>
                    <Grid item>
                        <h3 style={{ fontWeight: 'normal' }}>{detail.description}</h3>
                    </Grid>
                </Grid>
                {/* Right */}
                <Grid container xs={12} md={4} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'self-end' }}>
                    <Grid item >
                        {detail.status === 1 &&
                            <Link to='/galangdana/payment' state={{ detail: detail }}>
                                <Button variant="contained" style={{ backgroundColor: '#66AB92', width: '200px', height: '70px', fontSize: '18px' }}>
                                    Beri Bantuan
                                </Button>
                            </Link>}
                        {detail.status === 0 &&
                            <Button onClick={handleApprove} variant="contained" style={{ backgroundColor: '#66AB92', width: '200px', height: '70px', fontSize: '18px' }}>
                                Approve
                            </Button>}
                    </Grid>
                </Grid>

            </Grid>
        </>
    )

}