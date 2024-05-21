import { Button, Grid } from "@mui/material";
import CardGalangDana from "../../components/GalangDana/CardGalangDana";
import CardPayment from "../../components/GalangDana/CardPayment";
import { Link } from "react-router-dom";

export default function ApprovePayment() {
    return (
        <>
            {/* {message && <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={5000}
                message={message}
                key={vertical + horizontal}
                onClose={handleClose}
            />} */}
            <Grid container sx={{ direction: 'row', padding: '10px' }}>
                {/* Grid Content */}
                <Grid item xs={6} md={12} sx={{ direction: 'column', padding: '20px' }} >
                    {/* Header Content */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <h1>Approve Payment</h1>
                    </Grid>
                    <Grid item sx={{ direction: 'row' }}>
                        <Grid container direction={'row'} xs={12} spacing={3}>
                            <Grid container xs={12} md={6} spacing={3}>
                                <Grid item>
                                    <Link to='/galangdana'>
                                        <Button variant="contained" style={{ backgroundColor: '#66AB92' }}>
                                            Galang Dana
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Content*/}
                    <Grid container spacing={5} direction='row' sx={{ padding: '30px' }}>
                        <Grid item>
                            <CardPayment />
                        </Grid>
                        <Grid item>
                            <CardPayment />
                        </Grid>
                        <Grid item>
                            <CardPayment />
                        </Grid>
                        {/* {crowdfunding.map(cr => (
                            <Grid item>
                                <CardPayment

                                />
                            </Grid>
                        ))} */}
                    </Grid>

                </Grid>
            </Grid>
        </>
    )
}