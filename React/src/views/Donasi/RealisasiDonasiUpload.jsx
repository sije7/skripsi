import { Button, Grid, styled } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import addImage from "../../assets/t.png"
import CircularIndeterminate from "../../components/CircularIndeterminate";

export default function RealisasiDonasiUpload() {
    const [preview, setPreview] = useState([])
    const [image, setImage] = useState([])

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const id = useParams()

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleImage = (e) => {
        const file = e.target.files[0]
        setImage(prevImage => [...prevImage, file])
        setPreview(prevPreview => [...prevPreview, URL.createObjectURL(file)])
    }

    const handleSubmit = (e) => {
        setLoading(true)
        let fd = new FormData()
        fd.append('id', id.id)
        for (let i = 0; i < image.length; i++) {
            fd.append('images[]', image[i]);
        }
        axiosClient.post('/donation/proof/upload', fd)
            .then((res) => {
                setLoading(false)
                return navigate(-1)
            })
    }

    return (
        <>
            {loading && <CircularIndeterminate />}
            {!loading && <Grid container direction={'column'} sx={{ minHeight: '500px' }}>
                <Grid item>
                    <Button variant="contained" sx={{ width: '100px', marginLeft: "30px", backgroundColor: '#66AB92' }} onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Grid>
                <Grid item sx={{ textAlign: 'center' }}>
                    <h1>Upload Gambar Realisasi</h1>
                </Grid>
                <Grid container direction={'row'} sx={{ display: 'flex', justifyContent: 'center', marginTop:'20px' }}>
                    {preview ? preview.map((p) => (
                        <Grid item>
                            <img src={p} style={{ width: '200px', height: '100px', marginLeft: '20px' }}></img>
                        </Grid>
                    )) : " "}
                </Grid>
                {image.length === 0 && <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={addImage} style={{ width: '100px', height: '100px' }}></img>
                    <VisuallyHiddenInput type="file" onChange={handleImage} />
                </Grid>}
                <Grid item sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Gambar
                        <VisuallyHiddenInput type="file" onChange={handleImage} />
                    </Button>
                </Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#66AB92', width: '20%', height: '40px' }}>
                        Upload Bukti Realisasi
                    </Button>
                </Grid>
            </Grid >}
        </>
    )
}