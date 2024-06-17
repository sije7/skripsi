import { Box, Card, Grid, Typography } from '@mui/material';
import CardAboutUs from '../components/AboutUs/Card';
import Logo from '../assets/Logo.jpg'

export default function AboutUs() {
    return (
        <>
            <Grid container direction={'column'} sx={{ padding: '50px' }}>
                <Grid item>
                    <h1>Tentang Kami</h1>
                </Grid>
                <Grid container direction={'row'}>
                    <Grid item md={6} xs={12} sx={{ padding: '100px' }}>
                        <h2>Apa itu HopefulHarbor?</h2>
                        &nbsp;
                        <h3>HopefulHarbor merupakan media untuk berdonasi dengan galang dana,  </h3>
                        <h3> donasi barang-barang konsumsi dan barang-barang bekas, serta berbagi </h3>
                        <h3>ilmu pengetahuan untuk korban-korban bencana alam.</h3>
                    </Grid>
                    <Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                            component="img"
                            sx={{
                                height: '300px',
                                width: '300px',
                                backgroundColor: '#4287f5',
                                borderRadius: '1000px',
                            }}
                            src={Logo}
                        />
                    </Grid>
                </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '50px' }}>
                    <b><p>Terima kasih atas cinta dan kasih yang diberikan kepada </p>
                        <p>sesama saudara kita, hingga hari ini, HopefulHarbour telah membantu</p></b>
                </Grid>

                <Grid container direction={'row'} spacing={10} sx={{ display: 'flex', justifyContent: 'center', marginTop: '1px' }}>
                    <Grid item>
                        <Card sx={{ width: '300px', height: '250px', borderRadius: '50px', padding: '20px', textAlign: 'center' }}>
                            <Grid item>
                                <p style={{ fontSize: '50px', color: '#66AB92' }}>100 Juta +</p>
                            </Grid>

                            <Grid item sx={{ marginTop: '50px' }}>
                                <p>Dana telah kami kumpulkan untuk membantu korban bencana melalui galang dana.</p>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card sx={{ width: '300px', height: '250px', borderRadius: '50px', padding: '20px', textAlign: 'center' }}>
                            <Grid item>
                                <p style={{ fontSize: '50px', color: '#FFD438' }}>712</p>
                            </Grid>

                            <Grid item sx={{ marginTop: '50px' }}>
                                <p>Lokasi telah kami bantu melalui media donasi yang kami sediakan.</p>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card sx={{ width: '300px', height: '250px', borderRadius: '50px', padding: '20px', textAlign: 'center' }}>
                            <Grid item>
                                <p style={{ fontSize: '50px', color: '#BEDAB1' }}>21</p>
                            </Grid>

                            <Grid item sx={{ marginTop: '50px' }}>
                                <p>Pembelajaran materi pembelajaran online tersedia dalam media yang kami sediakan.</p>
                            </Grid>
                        </Card>
                    </Grid>

                </Grid>

                <Grid container direction={'row'} sx={{padding:'80px'}}>
                    <Grid item xs={12} md={6} sx={{display:'flex', justifyContent:'center'}}>
                        <Box
                            component="img"
                            sx={{
                                height: '600px',
                                width: '500px',
                                borderRadius: '100px',
                            }}
                            src={`http://localhost:8000/storage/images/HelpingHand.jpg`}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{padding:'50px'}}>
                        <p style={{fontSize:'20px'}}>
                        HopefulHarbor bertujuan untuk dapat mendukung para lembaga sosial dalam melaksanakan kegiatan penyaluran donasi dengan menyediakan media dimana para donatur dapat memberikan donasi mereka, baik secara material maupun ilmu pengetahuan.
                        </p>
                        &nbsp;
                        <p style={{fontSize:'20px'}}>
                        Dengan opsi donasi yang dapat memberikan barang/material bekas, kami ingin mendukung dan menarik para donatur yang ingin melakukan donasi, namun tidak dapat memberikan dalam bentuk uang. 
                        </p>
                        &nbsp;
                        <p style={{fontSize:'20px'}}>
                        Kami berharap untuk dapat membantu para penerima donasi untuk dapat mempelajari dan memahami bencana alam yang dihadapi agar dapat mengurangi kerusakan yang dapat ditimbulkan oleh sebuah bencana alam. 
                        </p>
                        &nbsp;
                        <p style={{fontSize:'20px'}}>
                        Artikel dan media online learning yang kami sediakan diharapkan mendukung semua pihak yang terlibat dalam penyaluran donasi bencana alam dapat lebih waspada dan lebih memahami kondisi dan situasi apa saja yang dihadapi oleh para korban bencana alam. 
                        </p>
                        

                    </Grid>

                </Grid>


            </Grid>

        </>
    )
}
