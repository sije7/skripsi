import { Card, CardContent, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function CardPembelajaran(props) {
    return (
        <>
            {/* <Link to={`/pembelajaran/${props.id}`} style={{ textDecoration: 'none' }}> */}
            <Link to={`/pembelajaran/1`} style={{ textDecoration: 'none' }}>
                {/* <Link to={`/donasi/${props.id}`} style={{ textDecoration: 'none' }}> */}
                <Card sx={{ width: '250px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                    <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={'https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                            style={{ width: '100%', height: '200px' }} />
                    </Grid>
                    <CardContent>
                        <Grid container direction='column' rowSpacing={1} >
                            <Grid item sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', minHeight: '70px' }}>
                                <h2>Edukasi Bencana Alam Banjir</h2>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Grid container direction={'row'} sx={{display:'flex', justifyContent:'space-between', padding:'10px'}}>
                        <Grid item sx={{}}>
                            <p><b>2024</b></p>
                        </Grid>
                        <Grid item sx={{}}>
                            <p><b>Banjir</b></p>
                        </Grid>
                    </Grid>
                    <Grid sx={{ backgroundColor: '#66AB92', textAlign: 'center' }}><h2>By - Me</h2></Grid>
                </Card>
            </Link>
        </>
    )
}