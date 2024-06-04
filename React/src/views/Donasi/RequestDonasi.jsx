import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextField, Typography, styled } from "@mui/material";
import axiosClient from "../../axios-client";
import { useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DatePicker from "react-datepicker";

export default function RequestDonasi() {
    const [user, setUser] = useState('')
    const [judul, setJudul] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const [lokasi, setLokasi] = useState('')
    const [preview, setPreview] = useState('')
    const [image, setImage] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [lembaga, setLembaga] = useState([])
    const [selectedLembaga, setSelectedLembaga] = useState('')
    const [jenis, setJenis] = useState([])
    const [selectedJenis, setSelectedJenis] = useState('')
    const [barang, setBarang] = useState([])
    const [selectedBarang, setSelectedBarang] = useState('')
    const [satuan, setSatuan] = useState('')
    const [jumlah, setJumlah] = useState('')
    const [namaBarang, setNamaBarang] = useState('')
    const [addFlagJenis, setAddFlagJenis] = useState(false)
    const [addFlagBarang, setAddFlagBarang] = useState(false)
    const [addFlagJumlah, setAddFlagJumlah] = useState(false)

    // const [listItems, setListItems] = useState([[]])
    const [listId, setListId] = useState([])
    const [listName, setListName] = useState([])
    const [listQty, setListQty] = useState([])
    const [listCurrency, setListCurrency] = useState([])


    //modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleChange = (event) => {
        setSelectedLembaga(event.target.value);
    };
    const handleChangeJenisBarang = (event) => {
        setSelectedJenis(event.target.value);
        for (let i = 0; i < jenis.length; i++) {
            if (jenis[i].id === event.target.value) {
                setBarang(jenis[i].items)
                break;
            }
        }
        setSelectedBarang('')
        setAddFlagBarang(true)
        setAddFlagJumlah(false)
    };
    const handleChangeBarang = (event) => {
        setSelectedBarang(event.target.value)
        for (let i = 0; i < barang.length; i++) {
            if (barang[i].id === event.target.value) {
                setSatuan(barang[i].currency)
                setNamaBarang(barang[i].name)
            }
        }
        setJumlah('')
        setAddFlagJumlah(true)
    };

    const handleChangeJumlah = (event) => {
        setJumlah(event.target.value)
    }

    const handleAddToList = () => {
        setListId(oldList => [...oldList, selectedBarang])
        setListName(oldList => [...oldList, namaBarang])
        setListQty(oldList => [...oldList, jumlah])
        setListCurrency(oldList => [...oldList, satuan])
        setSelectedJenis('')
        setSelectedBarang('')
        setSatuan('')
        setJumlah('')
        setAddFlagJenis(false)
        setAddFlagBarang(false)
        setAddFlagJumlah(false)

    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
        axiosClient.get('/lembaga')
            .then(({ data }) => {
                setLembaga(data)
            })

        axiosClient.get('/subcategories')
            .then(({ data }) => {
                setJenis(data.subcategories)
            })
    }, [])


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container direction={'row'}>
                        <Grid container direction={'column'} xs={6} md={6} sx={{ borderBlock: '2px solid' }}>
                            <Grid item sx={{ borderBottom: '2px solid' }}>
                                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Barang</p>
                            </Grid>
                            {listName?.map((name)=>(
                                <Grid item>
                                <p style={{ fontSize: '24px' }}>{name}</p>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container direction={'column'} xs={3} md={3} sx={{ borderBlock: '2px solid' }}>
                            <Grid item sx={{ borderBottom: '2px solid' }}>
                                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Jumlah</p>
                            </Grid>
                            {listQty?.map((qty)=>(
                                <Grid item>
                                <p style={{ fontSize: '24px' }}>{qty}</p>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container direction={'column'} xs={3} md={3} sx={{ borderBlock: '2px solid' }}>
                            <Grid item sx={{ borderBottom: '2px solid' }}>
                                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Satuan</p>
                            </Grid>
                            {listCurrency?.map((satuan)=>(
                                <Grid item>
                                <p style={{ fontSize: '24px' }}>{satuan}</p>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <h1 style={{ textAlign: 'center', padding: '20px' }}>Request Donasi</h1>
            <Grid container xs={12} md={12} direction={'row'} sx={{ padding: '50px' }} component="form">
                {/* Left */}
                <Grid container xs={12} md={6} direction={"column"} rowSpacing={3} sx={{ paddingLeft: '100px' }}>
                    <Grid item>
                        <TextField
                            required
                            id="outlined-required"
                            // label="Penanggung Jawab"
                            style={{ minWidth: '60%', backgroundColor: 'white' }}
                            InputProps={{
                                readOnly: true,
                            }}
                            value={user.name + ' (Pemohon)'}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="outlined-required"
                            label="Judul Donasi"
                            style={{ minWidth: '60%', backgroundColor: 'white' }}
                            value={judul}
                            onChange={event => setJudul(event.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Deskripsi Donasi *"
                            multiline
                            style={{ minWidth: '100%', backgroundColor: 'white' }}
                            maxRows={4}
                            value={keterangan}
                            onChange={event => setKeterangan(event.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Lokasi Donasi *"
                            multiline
                            style={{ minWidth: '100%', backgroundColor: 'white' }}
                            maxRows={4}
                            value={lokasi}
                            onChange={event => setLokasi(event.target.value)}
                        />
                    </Grid>
                    <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item >
                            <p style={{ fontWeight: 'lighter' }}>Tanggal Penyaluran Bantuan </p>
                            <DatePicker
                                selected={startDate}
                                dateFormat="yyyy/MM/dd"
                                value={startDate}
                                onChange={(date) => setStartDate(date)} />
                        </Grid>

                    </Grid>
                </Grid>

                {/* Right */}
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
                    {/* {errorImage ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorImage}</small> : ""} */}
                    {preview ? (
                        <Grid item>
                            <img src={preview} style={{ width: '100px', height: '100px' }}></img>
                        </Grid>
                    ) : " "}
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Lembaga</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedLembaga}
                                label="Lembaga"
                                onChange={handleChange}
                                style={{ width: '50%' }}
                            >
                                {lembaga.map((lembaga) => (
                                    <MenuItem value={lembaga.id}>{lembaga.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{ display: 'flex' }}>
                        <Button onClick={() => setAddFlagJenis(true)}>
                            Tambah Barang
                        </Button>
                        {listId && <Button onClick={handleOpen} style={{ background: '#BEDAB1', color: 'black', marginLeft: '30px' }} >
                            Lihat Barang
                        </Button>}
                    </Grid>
                    {addFlagJenis && <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Jenis Barang</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedJenis}
                                label="Jenis Barang"
                                onChange={handleChangeJenisBarang}
                                style={{ width: '50%' }}
                            >
                                {jenis ? jenis.map((jenis) => (
                                    <MenuItem value={jenis.id}>{jenis.name}</MenuItem>
                                )) : ''}
                            </Select>
                        </FormControl>
                    </Grid>}
                    {addFlagBarang && <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Barang</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedBarang}
                                label="Barang"
                                onChange={handleChangeBarang}
                                style={{ width: '50%' }}
                            >
                                {barang.map((barang) => (
                                    <MenuItem value={barang.id}>{barang.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>}
                    {addFlagJumlah &&
                        <Grid item>
                            <FormControl sx={{ width: '25ch' }} variant="outlined">
                                <OutlinedInput
                                    value={jumlah}
                                    onChange={handleChangeJumlah}
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position="end">{satuan}</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    }
                    {jumlah &&
                        <Grid item>
                            <Button onClick={handleAddToList} variant="contained" style={{ backgroundColor: '#BEDAB1', color:'black' }}>
                                Tambah
                            </Button>
                        </Grid>
                    }

                </Grid>
            </Grid>
        </>
    )
}