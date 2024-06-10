import { Card, CardContent, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function CardPembelajaran(props) {
    return (
        <>
            <Link to={`/pembelajaran/${props.id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ width: '250px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                    <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={'http://localhost:8000'+props.image}
                            style={{ width: '100%', height: '200px' }} />
                    </Grid>
                    <CardContent>
                        <Grid container direction='column' rowSpacing={1} >
                            <Grid item sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', minHeight: '70px' }}>
                                <h2>{props.title}</h2>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Grid container direction={'row'} sx={{display:'flex', justifyContent:'space-between', padding:'10px'}}>
                        <Grid item sx={{}}>
                            <p><b>{props.year}</b></p>
                        </Grid>
                        <Grid item sx={{}}>
                            <p><b>{props.subCategory}</b></p>
                        </Grid>
                    </Grid>
                    <Grid sx={{ backgroundColor: '#66AB92', textAlign: 'center' }}><h2>By - Me</h2></Grid>
                </Card>
            </Link>
        </>
    )
}