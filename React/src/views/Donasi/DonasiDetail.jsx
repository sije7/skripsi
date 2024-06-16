import { Box, Button, Card, CardContent, Checkbox, Grid, Snackbar } from "@mui/material";
import LinearDeterminate from "../../components/LinearDeterminate";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useReducer, useState } from "react";
import axiosClient from "../../axios-client";
import { useNavigate, useParams } from "react-router-dom";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { parse } from "date-fns";

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

    const [location, setLocation] = useState({ lat: null, lon: null });
    const [destination, setDestination] = useState({ lat: '', lon: '' }); // Destination input state
    const [route, setRoute] = useState([]);
    const [distance, setDistance] = useState(null);
    const [deslat, setDeslat] = useState('')
    const [deslon, setDeslon] = useState('')
    // const [destinationName, setDestinationName] = useState("Enter coordinates to get name");
    const [flag, setFlag] = useState(0)


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

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

    const handleCalculateDistance = async () => {
        console.log('yes')
        console.log(location.lat, location.lon , parseFloat(deslat), parseFloat(deslon))
        if (location.lat !== null && location.lon !== null && deslat && deslon) {
            const url = `http://router.project-osrm.org/route/v1/driving/${location.lon},${location.lat};${deslon},${deslat}?overview=full&geometries=geojson`;
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.routes && data.routes.length > 0) {
                    const routeCoords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                    setRoute(routeCoords);
                    setDistance(data.routes[0].distance / 1000); // distance in kilometers
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
        axiosClient.post(`/donation/${id.id}`)
            .then(({ data }) => {
                if (data.donation === null) {
                    return navigate('/')
                }
                // console.log(data.donation)
                setDetail(data.donation)
                setSubCategories(removeDuplicates(data.donation.sub_category))
                setprogressDonation(data.donation.progress_donation)
                setDeslat(data.donation.latitude)
                setDeslon(data.donation.longitude)
                setLoading(false)
            })
            // .catch((err) => {
            //     return navigate('/')
            // })
        axiosClient.get('/user')
            .then(({ data }) => {
                setRole(data.role)
                setUserId(data.id)
            })
    }, [location])

    useEffect(() => {
       
        if (role !== 'admin') {
            if (detail.status !== 3) {
                if (role === 'user') {
                    return navigate('/')
                }
                if (detail.status === 2) {
                    if (role === 'lembaga') {
                        if (detail.user_id !== userId) {
                            return ('/')
                        }
                    }
                }
            }
        }
        
       

    }, [location])

    useEffect(() => {
        if(deslat && deslon && location){
            handleCalculateDistance()
        }
        
    }, [deslat, deslon, location])
    


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
                return navigate('/donasi/approve', { state: { message: res.data } })
            })

    }

    function onReject() {
        let fd = new FormData()
        fd.append('id', detail.id)
        axiosClient.post('/rejectDonation', fd)
            .then((res) => {
                return navigate('/donasi/approve', { state: { message: res.data } })
            })

    }

    // function onTest(){
    //     console.log(deslat, deslon)
    //     console.log(location)
    // }


    return (
        <>
        {/* <Button onClick={onTest}>Test</Button> */}
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
                    <Button variant="contained" sx={{ width: '100px', marginLeft: "30px", backgroundColor: '#66AB92' }} onClick={() => navigate(-1)}>
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
                                <h2>Lokasi Bencana</h2>
                            </Grid>
                            <Grid item>
                                <h4>{detail.location}</h4>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid container direction={'row'} sx={{ padding: '100px', paddingTop: '30px', paddingBottom:'10px' }} spacing={1}>
                        <h1>Lokasi Donasi
                        </h1>
                        {location.lat && location.lon && (
                            <MapContainer center={[location.lat, location.lon]} zoom={8} style={{ height: '300px', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {location.lat && location.lon && (
                                    <Marker position={[location.lat, location.lon]}>
                                        <Popup>Lokasi User</Popup>
                                    </Marker>
                                )}
                                {deslat && deslon  && (
                                    <Marker position={[deslat, deslon]}>
                                        <Popup>Lokasi Lembaga</Popup>
                                    </Marker>
                                )}
                                {route.length > 0 && <Polyline positions={route} color="blue" />}
                            </MapContainer>
                        )}
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
                                {role !== 'admin' &&
                                    <Card sx={{ width: '550px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                                        <Grid container direction={'column'} sx={{ minHeight: '100px' }}>
                                            <CardContent>
                                                <Grid item sx={{ textAlign: 'center' }}>
                                                    <h2>Progress Donasi</h2>
                                                </Grid>
                                                {userId !== detail.user_id && detail.status !== 3 && progressDonation ? progressDonation.map((pd, i) => (
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
                                                {userId !== detail.user_id && detail.status === 3 && progressDonation ? progressDonation.map((pd, i) => (
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
                                                {userId === detail.user_id && detail.status === 3 && progressDonation ? progressDonation.map((pd, i) => (
                                                    <Grid item sx={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                                        <Checkbox
                                                            checked={pd.status}
                                                            color="secondary"
                                                            onChange={() => { onChangeCheckbox(pd, i) }}
                                                        />
                                                        <p>{pd.item.name} {pd.quantity} {pd.item.currency}</p>
                                                    </Grid>

                                                )) : ''}
                                                {userId === detail.user_id && detail.status !== 3 && progressDonation ? progressDonation.map((pd, i) => (
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
                                    </Card>}
                                {role === 'admin' &&
                                    <Card sx={{ width: '550px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                                        <Grid container direction={'column'} sx={{ minHeight: '100px' }}>
                                            <CardContent>
                                                <Grid item sx={{ textAlign: 'center' }}>
                                                    <h2>Progress Donasi</h2>
                                                </Grid>
                                                {detail.status !== 3 && progressDonation ? progressDonation.map((pd, i) => (
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
                                                {detail.status === 3 && progressDonation ? progressDonation.map((pd, i) => (
                                                    <Grid item sx={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                                        <Checkbox
                                                            checked={pd.status}
                                                            color="secondary"
                                                            onChange={() => { onChangeCheckbox(pd, i) }}
                                                        />
                                                        <p>{pd.item.name} {pd.quantity} {pd.item.currency}</p>
                                                    </Grid>

                                                )) : ''}
                                                {detail.status === 3 &&
                                                    <Grid item sx={{ display: 'flex', justifyContent: 'right' }}>
                                                        <Button variant="contained" color="success" style={{ backgroundColor: '#66AB92' }} onClick={onUpdate}>
                                                            Update Progress Donasi
                                                            {/* <EditIcon /> */}
                                                        </Button>
                                                    </Grid>
                                                }
                                            </CardContent>
                                        </Grid>
                                    </Card>}
                                {/* <Card sx={{ width: '550px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                                    <Grid container direction={'column'} sx={{ minHeight: '100px' }}>
                                        <CardContent>
                                            <Grid item sx={{ textAlign: 'center' }}>
                                                <h2>Progress Donasi</h2>
                                            </Grid>
                                            {userId !== detail.user_id && role !== 'admin' || detail.status !== 3 && role !== 'admin' && progressDonation ? progressDonation.map((pd, i) => (
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
                                            {userId === detail.user_id && detail.status === 3 || role === 'admin' &&
                                                <Grid item sx={{ display: 'flex', justifyContent: 'right' }}>
                                                    <Button variant="contained" color="success" style={{ backgroundColor: '#66AB92' }} onClick={onUpdate}>
                                                        Update Progress Donasi
                                                    </Button>
                                                </Grid>
                                            }
                                        </CardContent>
                                    </Grid>
                                </Card> */}
                                {role === 'admin' && <Grid container direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Grid item sx={{ display: 'flex', marginTop: '30px' }}>
                                        {detail.status !== 3 && <Button variant="contained" color="error" style={{ width: '200px', height: '50px' }} onClick={onReject}>
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
                                </Grid>}
                                {role === 'lembaga' && <Grid container direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Grid item sx={{ display: 'flex', marginTop: '30px' }}>
                                        {detail.status === 2 && detail.user_id === userId && <Button variant="contained" color="error" style={{ width: '200px', height: '50px' }} onClick={onReject}>
                                            Reject Donasi
                                            {/* <EditIcon /> */}
                                        </Button>}
                                    </Grid>
                                    <Grid item sx={{ display: 'flex', marginTop: '30px' }}>
                                        {detail.status === 2 && detail.user_id === userId && <Button variant="contained" color="success" style={{ backgroundColor: '#66AB92', width: '200px', height: '50px' }} onClick={onApprove}>
                                            Approve Donasi
                                            {/* <EditIcon /> */}
                                        </Button>}
                                    </Grid>
                                </Grid>}



                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            }
        </>
    )
}