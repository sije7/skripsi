import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled } from "@mui/material";
import axiosClient from "../../axios-client";
import { useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

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
    const [selectedDeskripsiLembaga, setSelectedDeskripsiLembaga] = useState('')

    const [listId, setListId] = useState([])
    const [listName, setListName] = useState([])
    const [listQty, setListQty] = useState([])
    const [listCurrency, setListCurrency] = useState([])

    //errors
    const [errorJudul, setErrorJudul] = useState('')
    const [errorDeskripsi, setErrorDeskripsi] = useState('')
    const [errorLokasi, setErrorLokasi] = useState('')
    const [errorDeadline, setErrorDeadline] = useState('')
    const [errorGambar, setErrorGambar] = useState('')
    const [errorLembaga, setErrorLembaga] = useState('')
    const [errorBarang, setErrorBarang] = useState('')

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [location, setLocation] = useState({ lat: null, lon: null });
    const [destination, setDestination] = useState({ lat: '', lon: '' }); // Destination input state
    const [route, setRoute] = useState([]);
    const [distance, setDistance] = useState(null);
    const [destinationName, setDestinationName] = useState("Enter coordinates to get name");

    const [selectedDestinationLat, setSelectedDestinationLat] = useState('')
    const [selectedDestinationLon, setSelectedDestinationLon] = useState('')
    const [selectedRoute, setSelectedRoute] = useState([])




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

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    })

                },
                (error) => {
                    console.error("Error obtaining geolocation:", error);
                    // Fallback ke lokasi manual jika geolocation gagal
                    const jakartaCoords = { lat: -6.2088, lon: 106.8456 };
                    setLocation(jakartaCoords)
                }
            )
        } else {
            // Fallback ke lokasi manual jika geolocation tidak didukung
            const jakartaCoords = { lat: -6.2088, lon: 106.8456 };
            setLocation(jakartaCoords);
        }
    }, [])


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

    const handleSubmit = (event) => {
        let nowDate = new Date().toLocaleString()

        let Difference_In_Time =
            new Date(startDate).getTime() - new Date(nowDate).getTime();
        let Difference_In_Days =
            Math.round
                (Difference_In_Time / (1000 * 3600 * 24));
        let fd = new FormData()
        fd.append('Judul', judul)
        fd.append('Deskripsi', keterangan)
        fd.append('Lokasi', lokasi)
        fd.append('Deadline', Difference_In_Days)
        fd.append('Gambar', image)
        fd.append('Barang', listId)
        fd.append('NamaBarang', listName)
        fd.append('Jumlah', listQty)
        fd.append('Satuan', listCurrency)
        fd.append('Pemohon_id', user.id)
        fd.append('Lembaga_id', selectedLembaga)

        axiosClient.post('/requestDonation', fd)
            .then((res) => {
                return navigate('/donasi', { state: { message: res.data } })
            }
            ).catch((error) => {
                const response = error.response.data.errors
                setErrorJudul('')
                setErrorDeskripsi('')
                setErrorLokasi('')
                setErrorDeadline('')
                setErrorGambar('')
                setErrorLembaga('')
                setErrorBarang('')

                response.Judul ? setErrorJudul(response.Judul) : ""
                response.Deskripsi ? setErrorDeskripsi(response.Deskripsi) : ""
                response.Lokasi ? setErrorLokasi(response.Lokasi) : ""
                response.Gambar ? setErrorGambar(response.Gambar) : ""
                response.Deadline ? setErrorDeadline(response.Deadline) : ""
                response.Barang ? setErrorBarang(response.Gambar) : ""
                response.Lembaga_id ? setErrorLembaga(response.Lembaga_id) : ""
            }
            )
    }

    const handleCalculateDistance = async (data) => {
        let deslat = parseFloat(data.latitude)
        let deslon = parseFloat(data.longitude)
        if (location.lat !== null && location.lon !== null && deslat && deslon) {
            const url = `http://router.project-osrm.org/route/v1/driving/${location.lon},${location.lat};${deslon},${deslat}?overview=full&geometries=geojson`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                let temp = []
                if (data.routes && data.routes.length > 0) {
                    const routeCoords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                    let res = [data.routes[0].distance / 1000, data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]])]
                    return res
                } else {
                    console.error("No route found or invalid response structure");
                    setRoute([]);
                    setDistance(null);
                }
            } catch (error) {
                console.error("Error fetching route data:", error);
                setRoute([]);
                setDistance(null);
            }
        } else {
            alert("Please enter valid coordinates for destination.");
        }
    };

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
                if (data.role === 'admin') {
                    return navigate('/')
                }
            })

        axiosClient.get('/subcategories')
            .then(({ data }) => {
                setJenis(data.subcategories)

            })

        if (location.lat !== null && location.lon !== null) {
            axiosClient.get('/lembaga')
                .then(({ data }) => {
                    data.forEach(data => {
                        if (data) {
                            handleCalculateDistance(data).then((res) => {
                                data.distance = Math.floor(res[0]).toString()
                                data.route = res[1]
                            })
                        }
                    });
                    setLembaga(data)
                    setLoading(false)
                })
        }
    }, [location])

    function onChooseLembaga(lembaga) {
        setSelectedDeskripsiLembaga(lembaga.deskripsi)
        setSelectedDestinationLat(lembaga.latitude)
        setSelectedDestinationLon(lembaga.longitude)
        setSelectedRoute(lembaga.route)

    }


    return (
        <>
            <h1 style={{ textAlign: 'center', padding: '20px' }}>Request Donasi</h1>
            {loading && <CircularIndeterminate />}
            {!loading && <Grid container xs={12} md={12} direction={'row'} sx={{ padding: '50px' }} component="form">
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
                    {errorJudul ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorJudul}</small> : ""}
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
                    {errorDeskripsi ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorDeskripsi}</small> : ""}
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
                    {errorLokasi ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorLokasi}</small> : ""}
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
                    {errorGambar ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorGambar}</small> : ""}
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
                                    <MenuItem onClick={() => onChooseLembaga(lembaga)} value={lembaga.id}>{lembaga.name} {lembaga.distance}km</MenuItem>

                                ))}

                            </Select>
                        </FormControl>
                    </Grid>
                    {selectedDeskripsiLembaga ? selectedDeskripsiLembaga : ''}
                    {errorLembaga ? <small style={{ color: "#B00020", fontSize: '13px' }}>lembaga harus dipilih</small> : ""}
                    {location.lat !== null && location.lon !== null && <Grid item>
                        <MapContainer center={[location?.lat, location?.lon]} zoom={8} style={{ height: '400px' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {location.lat && location.lon && (
                                <Marker position={[location.lat, location.lon]}>
                                    <Popup>Your Location</Popup>
                                </Marker>
                            )}
                            {selectedDestinationLat && selectedDestinationLon && (
                                <Marker position={[selectedDestinationLat, selectedDestinationLon]}>
                                    <Popup>Hehe</Popup>
                                    {/* <Popup>{destinationName}</Popup> */}
                                </Marker>
                            )}
                            {selectedRoute.length > 0 && <Polyline positions={selectedRoute} color="blue" />}
                        </MapContainer>

                    </Grid>}

                </Grid>

                {/* Right */}
                <Grid container xs={12} md={6} direction={"column"} rowSpacing={3} sx={{ paddingLeft: '100px' }}>
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
                    {errorDeadline ? <small style={{ color: "#B00020", fontSize: '13px' }}>jangka waktu minimal 1 minggu</small> : ""}
                    {listId.length !== 0 && <TableContainer component={Paper} sx={{ maxHeight: '200px' }} >
                        <Table sx={{ minWidth: 350, tableLayout: 'fixed  ' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell width={'100px'}>Barang</TableCell>
                                    <TableCell width={'100px'} align="left">Jumlah</TableCell>
                                    <TableCell width={'100px'} align="left">Satuan</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listId.map((row, i) => (
                                    <TableRow
                                        key={row.name}
                                    >
                                        <TableCell component="th" scope="row">
                                            {listName[i]}
                                        </TableCell>
                                        <TableCell align="left">{listQty[i]}</TableCell>
                                        <TableCell align="left">{listCurrency[i]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                    <Grid item sx={{ display: 'flex' }}>
                        <Button onClick={() => setAddFlagJenis(true)}>
                            Tambah Barang
                        </Button>
                    </Grid>
                    {errorBarang ? <small style={{ color: "#B00020", fontSize: '13px' }}>barang harus ditambahkan</small> : ""}
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
                            <Button onClick={handleAddToList} variant="contained" style={{ backgroundColor: '#BEDAB1', color: 'black' }}>
                                Tambah
                            </Button>
                        </Grid>
                    }
                    <Grid item sx={{ display: 'flex' }}>
                        <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#66AB92', color: 'black' }}>
                            Buat Permohonan Donasi
                        </Button>
                    </Grid>

                </Grid>
            </Grid>}
        </>
    )
}