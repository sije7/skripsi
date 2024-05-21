import { Button, Card, CardContent, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function openInNewTab(url) {
    window.open(url, '_blank').focus();
}

export default function CardPayment() {
    return (
        <>
            <Card sx={{ width: '250px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                <Grid container direction={'column'}>
                    <CardContent>
                        <Grid item sx={{ textAlign: 'center' }}>
                            <h2>Gempa Bumi Kota Jakarta Barat</h2>
                        </Grid>
                        <Grid item sx={{ marginTop: '20px' }}>
                            <p>Donatur: Danielson</p>
                        </Grid>
                        <Grid item>
                            <p>No Rek: 1231123123</p>
                        </Grid>
                        <Grid item>
                            <p>Bank: BCA</p>
                        </Grid>
                        <Grid item>
                            <p>No Rek Tujuan: 1231123123</p>
                        </Grid>
                        <Grid item>
                            <p>Bank Tujuan: BCA</p>
                        </Grid>
                        <Grid item>
                            <p>Dana: Rp 120,000,000.00</p>
                        </Grid>
                        <Grid item sx={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
                            <Button onClick={() => openInNewTab('http://localhost:8000/galangdana/payment/approve')}>
                                Bukti Pembayaran
                            </Button>
                        </Grid>
                    </CardContent>
                </Grid>
            </Card>
        </>
    )
}