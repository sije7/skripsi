import { Card, Grid, Typography } from '@mui/material';
import CardAboutUs from '../components/AboutUs/Card';

export default function AboutUs(){
    return(
        <>
            <Grid sx={{
                textAlign: 'center',
                color: '#66AB92',
                marginTop: '24px'
            }}>
            <   h1>Tentang Kami</h1>
            </Grid>

            <Grid sx={{
                textAlign: 'center',
                marginTop: '36px',
            }}>
                <h2>Apa itu Hopeful Harbor?</h2>
                <p style={{marginTop:'16px', fontSize:'16px'}}>
                HopefulHarbor merupakan media untuk berdonasi dengan galang dana,
                donasi barang-barang konsumsi dan barang-barang bekas,serta berbagi ilmu
                pengetahuan untuk korban-korban bencana alam.
                </p>
            </Grid>

            <Grid container rowSpacing={4} sx={{ justifyContent: 'space-evenly', marginTop: '150px', fontSize:'15px' }}>
                <Grid item>
                    <CardAboutUs
                    title = '100 Juta +'
                    content = 'Dana telah kami kumpulkan untuk membantu korban bencana melalui galang dana.'/>
                </Grid>
                <Grid item>
                    <CardAboutUs
                    title = '100 Juta +'
                    content = 'Dana telah kami kumpulkan untuk membantu korban bencana melalui galang dana.'/>
                </Grid>
                <Grid item>
                    <CardAboutUs
                    title = '100 Juta +'
                    content = 'Dana telah kami kumpulkan untuk membantu korban bencana melalui galang dana.'/>
                </Grid>
            </Grid>

            <Grid rowSpacing={{xs:6}}>
                <Grid item xs={12} md={4}>
                    <p style={{marginTop: '36px', marginLeft:'1000px'}}>
                        HopefulHarbor bertujuan untuk dapat mendukung para lembaga sosial
                        dalam melaksanakan kegiatan penyaluran donasi
                    </p>
                    <p style={{marginLeft:'1000px'}}>
                        dengan menyediakan media dimana para donatur
                        dapat memberikan donasi mereka,baik secara material maupun ilmu pengetahuan.
                    </p>
                </Grid>

                <Grid item xs={12} md={4}>
                    <p style={{marginTop: '36px', marginLeft:'1000px'}}>
                        Dengan opsi donasi yang dapat memberikan barang/material bekas, kami ingin mendukung
                        dan menarik para
                    </p>
                    <p style={{marginLeft:'1000px'}}>
                        donatur yang ingin melakukan donasi,
                        namun tidak dapat memberikan dalam bentuk uang.
                    </p>
                </Grid>

                <Grid item xs={12} md={4}>
                    <p style={{marginTop: '36px', marginLeft:'1000px'}}>
                         Artikel dan media online learning yang kami sediakan diharapkan mendukung semua pihak yang terlibat dalam
                        penyaluran donasi bencana alam dapat lebih waspada
                    </p>
                    <p style={{marginLeft:'1000px'}}>
                        dan lebih memahami kondisi dan situasi apa saja yang dihadapi\
                        oleh para korban bencana alam.
                    </p>
                </Grid>
            </Grid>

            <Grid sx={{textAlign: 'center', marginTop:'64px'}}>
                    <h1>
                         Our Team
                    </h1>
                </Grid>

            <Grid container rowSpacing={4} sx={{ justifyContent: 'space-evenly', marginTop: '64px', fontSize:'15px'}}>
                <Grid item>
                    <CardAboutUs
                    title = 'Christian Jonathan'
                    />
                </Grid>
                <Grid item>
                    <CardAboutUs
                    title = 'Danielson'
                    />
                </Grid>
                <Grid item>
                    <CardAboutUs
                    title = 'Ervindo Wijaya'
                    />
                </Grid>
            </Grid>

            <Grid sx={{textAlign: 'center', marginTop:'96px'}}>
                    <h1>
                         Lembaga Sosial
                    </h1>
                </Grid>

            <Grid container rowSpacing={4} sx={{ justifyContent: 'space-evenly', marginTop: '64px', fontSize:'15px'}}>
                <Grid item>
                    <CardAboutUs
                    title = 'GSJA Gading Serpong'
                    />
                </Grid>
                <Grid item>
                    <CardAboutUs
                    title = 'PT Adicipta Inovasi Teknologi'
                    />
                </Grid>
                <Grid item>
                    <CardAboutUs
                    title = 'Yayasan Tzu Chi'
                    />
                </Grid>
            </Grid>

        </>
    )
}
