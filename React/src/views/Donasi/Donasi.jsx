import { Button, Grid } from "@mui/material";
import CardDonasi from "../../components/Donasi/CardDonasi";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import { Link } from "react-router-dom";

export default function Donasi() {
    const [donation, setDonation] = useState([{}])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        let fd = new FormData()
        fd.append('status', 2)
        axiosClient.post('/donations', fd)
            .then(({ data }) => {
                setDonation(data.donations)
                setLoading(false)
            })
    }, [])
    

    return (
        <>
            {loading && <CircularIndeterminate />}
            {!loading && <Grid container direction={'row'}>
                {/* Kategori */}
                <Grid container md={2} sx={{ borderRight: '1px solid', minHeight: '700px', padding: '30px' }} direction={'column'}>
                    <h2>Kategori</h2>
                    <Grid item>
                        <ul><b>Konsumsi</b>
                            <li style={{ paddingLeft: '20px' }}>Makanan</li>
                            <li style={{ paddingLeft: '20px' }}>Minuman</li>
                            <li style={{ paddingLeft: '20px' }}>Obat-obatan</li>
                        </ul>
                    </Grid>
                    <Grid item>
                        <ul><b>Non-Konsumsi</b>
                            <li style={{ paddingLeft: '20px' }}>Pakaian</li>
                            <li style={{ paddingLeft: '20px' }}>Peralatan Medis</li>
                            <li style={{ paddingLeft: '20px' }}>Peralatan Rumah Tangga</li>
                            <li style={{ paddingLeft: '20px' }}>Mainan</li>
                            <li style={{ paddingLeft: '20px' }}>Hiburan</li>
                        </ul>
                    </Grid>
                </Grid>
                {/* Content */}
                <Grid container md={10} direction={'column'}>
                    <Grid item sx={{ textAlign: 'center', padding: '30px' }}>
                        <h1>Donasi</h1>
                    </Grid>
                    {/* Buttons */}
                    <Grid container direction={'row'} sx={{ justifyContent: 'space-between', paddingLeft: '30px', paddingRight: '30px' }}>
                        <Grid item>
                            <Link to={'/donasi/request'}>
                            <Button variant="contained" style={{ backgroundColor: '#66AB92' }}>
                                Request Donasi
                            </Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" style={{ backgroundColor: '#66AB92' }}>
                                Approve Donasi
                            </Button>
                        </Grid>
                    </Grid>
                    {/* Cards */}
                    <Grid container direction={'row'} sx={{ padding: '30px' }} spacing={3}>
                        {donation.map((d) => (
                            <Grid item>
                                <CardDonasi
                                key={d.id}
                                id={d.id}
                                title={d.title}
                                progress={d.progress}
                                deadline={d.deadline}
                                username={d.username}
                                image={d.image}
                                subCategory = {d.sub_category}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>}
        </>
    )
}