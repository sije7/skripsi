import { Button, Grid, styled } from "@mui/material"
import { useNavigate } from "react-router-dom"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function RealisasiGalangDanaUpload() {
    const [preview, setPreview] = useState([])
    const [image, setImage] = useState([])

    const navigate = useNavigate()

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
        axiosClient.post('/crowdfunding/proof/upload')
            .then((res) => {
                console.log('yes')
            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        console.log(image)
    }, [image])


    return (
        <>
            <Grid container direction={'column'}>
                <Grid item>
                    <Button variant="contained" sx={{ width: '100px', marginLeft: "30px", backgroundColor: '#66AB92' }} onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <h2>Upload Gambar Realisasi</h2>
                </Grid>
                <Grid container direction={'row'}>
                {preview ? preview.map((p) => (
                    <Grid item>
                        <img src={p} style={{ width: '100px', height: '100px' }}></img>
                    </Grid>
                )) : " "}
                </Grid>
                <Grid item>
                    <p style={{ fontWeight: 'lighter' }}>Upload Gambar</p>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={handleImage} />
                    </Button>
                </Grid>
                <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#66AB92', width:'40%' }}>
                    Upload Bukti Realisasi
                </Button>
            </Grid>
        </>
    )
}