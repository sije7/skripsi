import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axiosClient from "../axios-client";


export default function UploadPembelajaran(){

    const [title, setTitle] = useState('')
    const [userId, setUserId] = useState({})
    const [uploadVideo, setUploadVideo] = useState('')
    const [uploadImage, setUploadImage] = useState('')
    const [description, setDescription] = useState('')
    const [titleDescription, setTitleDescription] = useState('')
    const [preview, setPreview] = useState('')

    //Set Error
    const [errorTitle, setErrorTitle] = useState('')
    const [errorUploadVideo, setErrorUploadVideo] = useState('')
    const [errorUploadImage, setErrorUploadImage] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [errorTitleDescription, setErrorTitleDescription] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUserId(data.id)
            })
    }, [])

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
        setUploadImage(file)
        setPreview(URL.createObjectURL(file))

      }

      const handleVideo = (e) => {
        const file = e.target.files[0]
        setUploadVideo(file)
        setPreview(URL.createObjectURL(file))

      }

      const onSubmit = () => {
        let formData = new FormData();

        formData.append("title",title);
        formData.append("description", description);
        formData.append("title_description", titleDescription);
        formData.append("user", userId);
        formData.append("upload_video",uploadVideo);
        formData.append("upload_image",uploadImage);

        axiosClient.post('/uploads', formData)
        .then((res) => {
            return navigate('/beranda', { state: { message: res.data } })
        })
        .catch(err =>{
            setErrorTitle('')
            setErrorDescription('')
            setErrorTitleDescription('')
            setErrorUploadVideo('')
            setErrorUploadImage('')

            const response = err.response.data.errors;
            response.Title ? setErrorTitle(response.Title) : ""
            response.Description ? setErrorDescription(response.Description) : ""
            response.TitleDescription ? setErrorTitleDescription(response.TitleDescription) : ""
            response.UploadVideo ? setErrorUploadVideo(response.UploadVideo) : ""
            response.UploadImage ? setErrorUploadImage(response.UploadImage) : ""
        })
        }



    return (
        <>
        <Grid container xs={12} md= {6} direction={"column"} sx={{paddingLeft: '100px'}}>
            <h3 style={{padding: '20px'}}>Title</h3>
            <Grid item>
                <TextField
                    required
                    label='Judul'
                    style={{minWidth: '100%'}}
                    onChange={event => setTitle(event.target.value)}
                />
            </Grid>
            {errorTitle ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorJudul}</small> : ""}
            <h3 style={{padding: '20px'}}>Upload Video</h3>
            {errorUploadVideo ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorUploadVideo}</small> : ""}
                {preview ? (
                    <Grid item>
                        <img src={preview} style={{ width: '100px', height: '100px' }}></img>
                    </Grid>
                ) : " "}
            <Grid item>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload File
              <VisuallyHiddenInput type="file" onChange={handleVideo} />
            </Button>
            </Grid>
            {errorTitleDescription ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorTitleDescription}</small> : ""}
            <h3 style={{padding: '20px'}}>Title Description</h3>
            <Grid item>
                <TextField
                    required
                    style={{minWidth: '100%'}}
                    onChange={event => setTitleDescription(event.target.value)}
                />
            </Grid>
            {errorDescription ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorDescription}</small> : ""}
            <h3 style={{padding: '20px'}}>Description</h3>
            <Grid item>
                <TextField
                    required
                    multiline
                    style={{minWidth: '100%'}}
                    onChange={event => setDescription(event.target.value)}
                />
            </Grid>
            <h3 style={{padding: '20px'}}>Upload Image</h3>
            {errorUploadImage ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorUploadImage}</small> : ""}
                {preview ? (
                    <Grid item>
                        <img src={preview} style={{ width: '100px', height: '100px' }}></img>
                    </Grid>
                ) : " "}
            <Grid item>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload File
              <VisuallyHiddenInput type="file" onChange={handleImage} />
            </Button>
            </Grid>
            <Grid item style={{paddingTop:'10px', textAlign:'center'}} >
            <Button onClick={onSubmit} variant="contained" style={{ backgroundColor: '#66AB92', width: '150px', height: '50px', fontSize: '14px' }}>
                Submit
            </Button>
            </Grid>
        </Grid>
        </>

    )
}

