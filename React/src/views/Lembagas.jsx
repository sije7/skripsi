import { Box, Card, Grid, Typography } from "@mui/material"
import GSJA from '../assets/Beranda/GSJA.jpg'
import logo2 from '../assets/Beranda/a.jpg'
import logo3 from '../assets/Beranda/b.jpg'

export default function Lembagas(){

    const LembagaSosial = ({ picture, name }) => {
        return (
            <Card sx={{ borderRadius: '30px', width: '50%' }}>
                <Box
                    component="img"
                    sx={{
                        height: 245,
                        width: '100%',
                        borderRadius: '30px'
                    }}
                    src={picture}
                />
                <br />
                <br />
                <Typography variant="h4" align="center"><b>{name}</b></Typography>
            </Card>
        )
    }
    return(
        <>
        <h1 style={{textAlign:'center'}}>Lembaga Sosial</h1>
        <Grid container spacing={0} direction={'row'} sx={{marginTop:'100px'}}>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {LembagaSosial({ picture: GSJA, name: "GSJA" })}
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {LembagaSosial({ picture: logo2, name: "Thu Chu" })}
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {LembagaSosial({ picture: logo3, name: "Teach For Tangerang" })}
                    </Grid>
                </Grid>
        </>
    )
}