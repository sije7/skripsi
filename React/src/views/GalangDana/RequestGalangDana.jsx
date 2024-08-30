import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
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

    const [addFlagDana, setAddFlagDana] = useState(false)
    const [selectedAllocation, setSelectedAllocation] = useState('')
    const [selectedTarget, setSelectedTarget] = useState('')

    const [listAllocation, setListAllocation] = useState([])
    const [listFund, setListFund] = useState([])

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/user')
            .then(({ data }) => {
                if (data.role === 'admin') {
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
        let total = 0
        for(let f of listFund){
            total += parseInt(f)
        }

        formData.append("Dana", total)
        formData.append("Gambar", image)
        formData.append("Judul", judul)
        formData.append("Deskripsi", keterangan)
        formData.append("user_id", userId)

        formData.append("Lokasi", lokasi)
        formData.append("NomorRekening", nomorRekening)
        formData.append("NamaRekening", namaRekening)
        formData.append("Bank", bank)

        formData.append("Alokasi", listAllocation)
        formData.append("DanaAlokasi", listFund)

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

    function handleAddAllocation() {
        setListAllocation(prevList => [...prevList, selectedAllocation])
        setListFund(prevList => [...prevList, selectedTarget])
        setAddFlagDana(false)
        setSelectedAllocation('')
        setSelectedTarget('')
    }

    function deleteFromList(i) {
        setListAllocation(listAllocation.filter((ids, index) => index !== i))
        setListFund(listFund.filter((ids, index) => index !== i))
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
                        <FormControl fullWidth>
                            <InputLabel id="bank-label">Bank</InputLabel>
                            <Select
                                labelId="bank-label"
                                id="bank-select"
                                value={bank}
                                onChange={(event) => setBank(event.target.value)}
                                label="Bank"
                                style={{ height: '50px' }}
                            >
                                <MenuItem value="BCA">BCA</MenuItem>
                                <MenuItem value="Mandiri">Mandiri</MenuItem>
                                <MenuItem value="BNI">BNI</MenuItem>
                                <MenuItem value="BRI">BRI</MenuItem>
                                <MenuItem value="CIMB">CIMB</MenuItem>
                                <MenuItem value="Panin">Panin</MenuItem>
                            </Select>
                        </FormControl>
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
                        <p style={{ fontWeight: 'lighter' }}>Upload Gambar</p>
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
                    {/* <Grid item>
                        <p style={{ fontWeight: 'lighter' }}>Jumlah Dana yang Dibutuhkan</p>
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
                            />
                        </FormControl>
                    </Grid> */}
                    {/* {errorTarget ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorTarget}</small> : ""} */}

                    {listAllocation.length !== 0 && <TableContainer component={Paper} sx={{ maxHeight: '200px', marginTop: '20px' }} >
                        <Table sx={{ minWidth: 350, tableLayout: 'fixed  ' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell width={'150px'}>Alokasi</TableCell>
                                    <TableCell width={'150px'} align="left">Dana</TableCell>
                                    <TableCell width={'50px'} align="left">Aksi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listAllocation.map((row, i) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">{listAllocation[i]}</TableCell>
                                        <TableCell align="left">Rp {listFund[i]}</TableCell>
                                        <TableCell align="left" onClick={() => deleteFromList(i)} > <DeleteOutlinedIcon /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}

                    <Grid item sx={{ display: 'flex' }}>
                        <Button onClick={() => setAddFlagDana(true)}>
                            Tambah Alokasi Dana
                        </Button>
                    </Grid>
                    {addFlagDana && (
                        <>
                            <Grid item>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Alokasi Dana *"
                                    style={{ minWidth: '100%', backgroundColor: 'white' }}
                                    maxRows={4}
                                    value={selectedAllocation}
                                    onChange={event => setSelectedAllocation(event.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <CurrencyInput
                                    id="input-example"
                                    name="input-name"
                                    placeholder="Rp"
                                    // defaultValue={''}
                                    prefix="Rp "
                                    decimalsLimit={2}
                                    style={{ width: '300px', height: '57px' }}
                                    value={selectedTarget}
                                    onValueChange={(value) => setSelectedTarget(value)}
                                />
                                {/* <TextField
                                    id="outlined-multiline-flexible"
                                    label="Dana *"
                                    style={{ minWidth: '50%', backgroundColor: 'white' }}
                                    // maxRows={4}
                                    value={selectedTarget}
                                    type="number"
                                    onChange={event => setSelectedTarget(event.target.value)}
                                /> */}
                            </Grid>
                            {selectedAllocation && selectedTarget && (
                                <Button onClick={handleAddAllocation} variant="contained" style={{ backgroundColor: '#BEDAB1', color: 'black', width: '50%', marginTop: '20px' }}>Tambah Alokasi Dana</Button>
                            )}
                        </>
                    )}
                    {errorTarget ? <small style={{ color: "#B00020", fontSize: '13px' }}>alokasi dana wajib diisi</small> : ""}
                    <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item >
                            <p style={{ fontWeight: 'lighter' }}>Tanggal Terakhir Penyaluran Dana </p>
                            <DatePicker
                                selected={startDate}
                                dateFormat="yyyy/MM/dd"
                                value={startDate}
                                onChange={(date) => setStartDate(date)} />
                        </Grid>

                    </Grid>
                    {!errorDeadline ? <small style={{ fontSize: '13px' }}>jangka waktu minimal 1 minggu</small> : ''}
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
