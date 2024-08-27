import Box from '@mui/material/Box';
import HeroImage from '../assets/LandingPage/Bersama.jpg'
import HeaderLandingPage from '../components/LandingPage/Header';
import CardLandingPage from '../components/LandingPage/Card';
import { Card, Grid, Typography } from '@mui/material';
import Footer from '../components/Footer';
import axiosClient from "../axios-client";
import Money from '../assets/LandingPage/Money.png'
import Item from '../assets/LandingPage/Item.png'
import Learn from '../assets/LandingPage/Learn.png'
import HeroImage1 from '../assets/LandingPage/HeroLanding1.jpg'
import HeroImage2 from '../assets/LandingPage/HeroLanding2.jpg'
export default function LandingPage() {
    return (
        <>
            <HeaderLandingPage />
            <Box
                component="img"
                sx={{
                    height: 500,
                    width: '100%',
                    position: 'absolute',
                    zIndex: -1,
                }}
                src={HeroImage}
            />
            <Box sx={{
                textAlign: 'center',
                marginTop: '20px',
                color: 'white'
            }}>
                <h1><b>Bersama Kita dapat Membuat Perubahan</b></h1>
                <br></br>
                <h2>“The purpose of life is not to be happy. </h2>
                <h2>It is to be useful, to be honorable, to be compassionate, to have it make </h2>
                <h2>some difference that you have lived and lived well.”</h2>
                <h2>~ Ralph Waldo Emerson</h2>
            </Box>

            <Grid container rowSpacing={4} sx={{ justifyContent: 'space-evenly', marginTop: '150px', fontSize:'15px' }}>
                <Grid item>
                    <CardLandingPage
                    title='Donasi Barang'
                    content='Memberi barang tidak terpakai untuk korban bencana alam yang membutuhkan.'
                    image={Item} />
                </Grid>
                <Grid item>
                    <CardLandingPage
                    title='Galang Dana'
                    content='Membantu korban bencana alam yang membutuhkan dana untuk bertahan hidup dalam kondisi sulit.'
                    image={Money} />
                </Grid>
                <Grid item>
                    <CardLandingPage
                    title='Pembelajaran'
                    content='Mengedukasi masyarakat yang mengalami bencana alam dalam hal penanganan bencana alam dan informasi yang membantu'
                    image={Learn} />
                </Grid>
            </Grid>

            <Grid rowSpacing={{xs: 6}} container sx={{justifyContent:'space-evenly', paddingBottom: '0px', paddingTop:'100px' }}>
                <Grid item xs={12} md={4}>
                    <h1>Kebaikan, Kekuatan dalam Memberi</h1>
                    <p style={{marginTop:'30px', fontSize:'16px'}}>Di dunia yang sering terasa kacau, tindakan kebaikan kecil dapat membuat dampak yang signifikan.
                        Baik itu menyumbang ke badan amal setempat, menjadi sukarelawan,
                        atau hanya membantu tetangga yang membutuhkan, tindakan ini menciptakan efek riak positif.
                        Dengan memberi kembali, kita tidak hanya meningkatkan kehidupan orang lain tetapi juga memelihara jiwa kita sendiri.
                        Mari kita rangkul semangat kemurahan hati dan kasih sayang, mengetahui bahwa bahkan gerakan terkecil pun dapat mengubah dunia. </p>
                    <p style={{fontWeight:'bold', fontSize:'16px', marginTop:'10px'}}>Ingat, kebaikan itu menular — sebarkanlah dengan bebas! </p>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box
                        component="img"
                        sx={{
                            height: 300,
                            width: '100%',
                            backgroundColor: '#4287f5',
                            minWidth: '400px',
                            boxShadow: '20px 20px'
                        }}
                        src={HeroImage1}
                    />
                </Grid>
            </Grid>

            <Grid rowSpacing={{xs: 6}} container sx={{justifyContent:'space-evenly', paddingBottom: '100px', paddingTop:'100px' }}>
                <Grid item xs={12} md={4}>
                    <Box
                        component="img"
                        sx={{
                            height: 300,
                            width: '100%',
                            backgroundColor: '#4287f5',
                            boxShadow: '20px 20px'
                        }}
                        src={HeroImage2}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <h1>Harapan Muncul: Belas Kasihan di Tengah Bencana Alam</h1>
                    <p style={{marginTop:'30px', fontSize:'16px'}}>Ketika bencana alam melanda, mereka meninggalkan jejak kehancuran yang mengguncang kehidupan dan komunitas. Namun, di tengah kekacauan, muncul kekuatan yang luar biasa: belas kasihan kemanusiaan. Orang-orang dari berbagai latar belakang bersatu, mengulurkan tangan kepada mereka yang terkena dampak banjir, gempa bumi, kebakaran hutan, dan badai. Baik itu dengan mendonasikan makanan, pakaian, atau memberikan tempat berlindung, atau dengan menjadi relawan di lapangan, tindakan-tindakan kecil ini menjadi cahaya harapan. </p>
                    <p style={{fontWeight:'bold', fontSize:'16px', marginTop:'10px'}}>Ingatlah, upaya bersama kita dapat menyembuhkan dan memulihkan. Mari berdiri bersatu, saling mendukung melalui badai kehidupan.</p>
                </Grid>

            </Grid>
            <Footer />
        </>
    )
}
