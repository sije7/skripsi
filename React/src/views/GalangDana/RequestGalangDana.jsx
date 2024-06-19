import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../../axios-client";
import { useNavigate } from "react-router-dom";
import CurrencyInput from 'react-currency-input-field';
import CircularIndeterminate from "../../components/CircularIndeterminate";

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
    const [nomorRekening, setNomorRekening] = useState('')
    const [namaRekening, setNamaRekening] = useState('')
    const [bank, setBank] = useState('')

    //error
    const [errorJudul, seterrorJudul] = useState('')
    const [errorDeskripsi, seterrorDeskripsi] = useState('')
    const [errorLokasi, seterrorLokasi] = useState('')
    const [errorTarget, seterrorTarget] = useState('')
    const [errorImage, seterrorImage] = useState('')
    const [errorNomorRekening, seterrorNomorRekening] = useState('')
    const [errorNamaRekening, seterrorNamaRekening] = useState('')
    const [errorBank, seterrorBank] = useState('')
    const [errorDeadline, setErrorDeadline] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/user')
            .then(({ data }) => {
                if(data.role === 'admin'){
                    return navigate('/')
                }
                setUser(data)
                setuserId(data.id)
                setLoading(false)
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
        if (isNaN(parseInt(target))) {
            formData.append("Dana", '')
        } else {
            formData.append("Dana", parseInt(target))
        }

        formData.append("Gambar", image)
        formData.append("Judul", judul)
        formData.append("Deskripsi", keterangan)
        formData.append("user_id", userId)

        formData.append("Lokasi", lokasi)
        formData.append("NomorRekening", nomorRekening)
        formData.append("NamaRekening", namaRekening)
        formData.append("Bank", bank.toUpperCase())

        let nowDate = new Date().toLocaleString()

        let Difference_In_Time =
            new Date(startDate).getTime() - new Date(nowDate).getTime();
        let Difference_In_Days =
            Math.round
                (Difference_In_Time / (1000 * 3600 * 24));
        formData.append("Deadline", Difference_In_Days)

        axiosClient.post('/crowdfunding/request', formData)
            .then((res) => {
                return navigate('/galangdana', { state: { message: res.data } })
            })
            .catch(err => {
                seterrorJudul('')
                seterrorDeskripsi('')
                seterrorLokasi('')
                seterrorImage('')
                seterrorTarget('')
                setErrorDeadline('')
                seterrorNamaRekening('')
                seterrorNomorRekening('')
                seterrorBank('')
                const response = err.response.data.errors;
                response.Judul ? seterrorJudul(response.Judul) : ""
                response.Deskripsi ? seterrorDeskripsi(response.Deskripsi) : ""
                response.Dana ? seterrorTarget(response.Dana) : ""
                response.Lokasi ? seterrorLokasi(response.Lokasi) : ""
                response.Gambar ? seterrorImage(response.Gambar) : ""
                response.Deadline ? setErrorDeadline(response.Deadline) : ""
                response.NomorRekening ? seterrorNomorRekening(response.NomorRekening) : ""
                response.NamaRekening ? seterrorNamaRekening(response.NamaRekening) : ""
                response.Bank ? seterrorBank(response.bank) : ""
            })
    }

    return (
        <>
            <h1 style={{ textAlign: 'center', padding: '20px' }}>Request Galang Dana</h1>
            {loading && <CircularIndeterminate />}
            {!loading && <Grid container direction='row' sx={{ padding: '50px' }} component="form">
                {/* Left Side*/}
                <Grid container xs={12} md={6} direction={"column"} rowSpacing={3} sx={{ paddingLeft: '100px' }}>
                    <Grid item>
                        <TextField
                            required
                            id="outlined-required"
                            label="Penanggung Jawab"
                            style={{ minWidth: '60%', backgroundColor: 'white' }}
                            InputProps={{
                                readOnly: true,
                              }}
                            value={user.name}
                            // onChange={event => setPenanggungjawab(event.target.value)}
                            InputLabelProps={{ shrink: true }}  
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
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Nomor Rekening *"
                            type="number"
                            style={{ minWidth: '50%', backgroundColor: 'white' }}
                            maxRows={4}
                            value={nomorRekening}
                            onChange={event => setNomorRekening(event.target.value)}
                        />
                    </Grid>
                    {errorNomorRekening ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorNomorRekening}</small> : ""}
                    <Grid item>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Nama Rekening *"
                            style={{ minWidth: '50%', backgroundColor: 'white' }}
                            maxRows={4}
                            value={namaRekening}
                            onChange={event => setNamaRekening(event.target.value)}
                        />
                    </Grid>
                    {errorNamaRekening ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorNamaRekening}</small> : ""}
                    <Grid item>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Bank Tujuan *"
                            multiline
                            style={{ minWidth: '50%', backgroundColor: 'white' }}
                            maxRows={4}
                            value={bank}
                            onChange={event => setBank(event.target.value)}
                        />
                    </Grid>
                    {errorBank ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorBank}</small> : ""}
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

                </Grid>
                {/* Right Side */}
                <Grid container xs={12} md={6} direction={"column"} rowSpacing={3} sx={{ paddingLeft: '100px' }}>
                    <Grid item>
                        <p style={{fontWeight:'lighter'}}>Upload Gambar</p>
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
                    <Grid item>
                        <p style={{fontWeight:'lighter'}}>Jumlah Dana yang Dibutuhkan</p>
                        <FormControl >
                            <CurrencyInput
                                id="input-example"
                                name="input-name"
                                placeholder="Rp"
                                // defaultValue={''}
                                prefix="Rp "
                                decimalsLimit={2}
                                style={{ width: '300px', height: '57px' }}
                                value={target}
                                onValueChange={(value) => setTarget(value)}
                            // onChange={event => setTarget(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    {errorTarget ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorTarget}</small> : ""}
                    <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item >
                            <p style={{fontWeight:'lighter'}}>Tanggal Terakhir Penyaluran Dana </p>
                            <DatePicker
                                selected={startDate}
                                dateFormat="yyyy/MM/dd"
                                value={startDate}
                                onChange={(date) => setStartDate(date)} />
                        </Grid>

                    </Grid>
                    {!errorDeadline ? <small style={{fontSize: '13px' }}>jangka waktu minimal 1 minggu</small>: ''}
                    {errorDeadline ? <small style={{ color: "#B00020", fontSize: '13px' }}>jangka waktu minimal 1 minggu</small> : ""}
                    <Grid item>

                        <Button onClick={onSubmit} variant="contained" style={{ backgroundColor: '#66AB92' }}>
                            Request Galang Dana
                        </Button>
                    </Grid>
                </Grid>
            </Grid>}
        </>
    )
}
