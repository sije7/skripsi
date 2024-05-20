import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../../axios-client";
import { useNavigate } from "react-router-dom";

export default function RequestGalangDana() {
    const [startDate, setStartDate] = useState(new Date());
    const [penanggungjawab, setPenanggungjawab] = useState('')
    const [judul, setJudul] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const [image, setImage] = useState('')
    const [lokasi, setLokasi] = useState('')
    const [target, setTarget] = useState('')
    const [user, setUser] = useState({})
    const [userId, setuserId] = useState('')
    const [preview, setPreview] = useState('')

    //error
    const [errorJudul, seterrorJudul] = useState('')
    const [errorDeskripsi, seterrorDeskripsi] = useState('')
    const [errorLokasi, seterrorLokasi] = useState('')
    const [errorTarget, seterrorTarget] = useState('')
    const [errorImage, seterrorImage] = useState('')
    const [errorDeadline, setErrorDeadline] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
                setuserId(data.id)
            })
    }, [])

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setPreview(URL.createObjectURL(file))

    }

    const onSubmit = () => {
        let formData = new FormData()

        formData.append("gambar", image)
        formData.append("judul", judul)
        formData.append("deskripsi", keterangan)
        formData.append("user_id", userId)
        formData.append("target", target)
        formData.append("lokasi", lokasi)


        let nowDate = new Date().toLocaleString()

        let Difference_In_Time =
           new Date(startDate).getTime() - new Date(nowDate).getTime();
        let Difference_In_Days =
            Math.round
                (Difference_In_Time / (1000 * 3600 * 24));
                console.log(Difference_In_Days)

        formData.append("deadline", Difference_In_Days)


        axiosClient.post('/crowdfunding/request', formData)
            .then((res) => {
                return navigate('/galangdana', {state:{message:res.data}})
            })
            .catch(err => {
                seterrorJudul('')
                seterrorDeskripsi('')
                seterrorLokasi('')
                seterrorImage('')
                seterrorTarget('')
                setErrorDeadline('')
                const response = err.response.data.errors;
                response.judul ? seterrorJudul(response.judul) : ""
                response.deskripsi ? seterrorDeskripsi(response.deskripsi) : ""
                response.target ? seterrorTarget(response.target) : ""
                response.lokasi ? seterrorLokasi(response.lokasi) : ""
                response.gambar ? seterrorImage(response.gambar) : ""
                response.deadline ? setErrorDeadline(response.deadline) : ""
            })
    }

    return (
        <>
            <h1 style={{ textAlign: 'center', padding: '20px' }}>Request Galang Dana</h1>
            <Grid container direction='row' sx={{ padding: '50px' }} component="form">
                {/* Left Side*/}
                <Grid container xs={12} md={6} direction={"column"} rowSpacing={3} sx={{ paddingLeft: '100px' }}>
                    <Grid item>
                        <TextField
                            required
                            id="outlined-required"
                            // label="Penanggung Jawab"
                            style={{ minWidth: '60%', backgroundColor: 'white' }}
                            disabled
                            value={user.name}
                            onChange={event => setPenanggungjawab(event.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="outlined-required"
                            label="Judul Galang Dana"
                            style={{ minWidth: '60%', backgroundColor: 'white' }}
                            value={judul}
                            onChange={event => setJudul(event.target.value)}
                        />
                    </Grid>
                    {errorJudul ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorJudul}</small> : ""}
                    <Grid item>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Deskripsi Galang Dana *"
                            multiline
                            style={{ minWidth: '100%', backgroundColor: 'white' }}
                            maxRows={4}
                            value={keterangan}
                            onChange={event => setKeterangan(event.target.value)}
                        />
                    </Grid>
                    {errorDeskripsi ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorDeskripsi}</small> : ""}
                    <Grid item>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" onChange={handleImage} />
                        </Button>

                    </Grid>
                    {errorImage ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorImage}</small> : ""}
                    {preview ? (
                        <Grid item>
                            <img src={preview} style={{ width: '100px', height: '100px' }}></img>
                        </Grid>
                    ) : " "}

                </Grid>
                {/* Right Side */}
                <Grid container xs={12} md={6} direction={"column"} rowSpacing={3} sx={{ paddingLeft: '100px' }}>
                    <Grid item>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Lokasi Galang Dana *"
                            multiline
                            style={{ minWidth: '100%', backgroundColor: 'white' }}
                            maxRows={4}
                            value={lokasi}
                            onChange={event => setLokasi(event.target.value)}
                        />
                    </Grid>
                    {errorLokasi ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorLokasi}</small> : ""}
                    <Grid item>
                        <FormControl >
                            <InputLabel htmlFor="outlined-adornment-amount">Target *</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                                label="Amount"
                                type="number"
                                style={{ backgroundColor: 'white' }}
                                value={target}
                                onChange={event => setTarget(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    {errorTarget ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorTarget}</small> : ""}
                    <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item >
                            <h4>Tanggal Penyaluran Dana: </h4>
                            <DatePicker
                                selected={startDate}
                                dateFormat="yyyy/MM/dd"
                                value={startDate}
                                onChange={(date) => setStartDate(date)} />
                        </Grid>
                        
                    </Grid>
                    {errorDeadline ? <small style={{ color: "#B00020", fontSize: '13px' }}>jangka waktu minimal 1 minggu</small> : ""}
                    <Grid item>
                    
                        <Button onClick={onSubmit} variant="contained" style={{ backgroundColor: '#66AB92' }}>
                            Request Galang Dana
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}