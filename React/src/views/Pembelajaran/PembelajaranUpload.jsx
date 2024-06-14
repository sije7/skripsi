import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, styled } from "@mui/material"
import { useEffect, useState } from "react"
import axiosClient from "../../axios-client"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../../components/CircularIndeterminate";

export default function UploadLearning() {
    const [role, setRole] = useState('')
    const [userId, setUserId] = useState('')
    const [gambar, setGambar] = useState('')
    const [preview, setPreview] = useState('')
    const [video, setVideo] = useState('')
    const [previewVideo, setPreviewVideo] = useState('')
    const [judul, setJudul] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [judulDeskripsi, setJudulDeskripsi] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [thumbnailPreview, setThumbnailPreview] = useState('')
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [subCategory, setSubCategory] = useState([])
    const [selectedSubCategory, setSelectedSubCategory] = useState('')

    const navigate = useNavigate()
    //error
    const [errorJudul, setErrorJudul] = useState('')
    const [errorJudulKonten, setErrorJudulKonten] = useState('')
    const [errorKonten, setErrorKonten] = useState('')
    const [errorGambarKonten, setErrorGambarKonten] = useState('')
    const [errorThumbnail, setErrorThumbnail] = useState('')
    const [errorVideo, setErrorVideo] = useState('')
    const [errorJenisPembelajaran, setErrorJenisPembelajaran] = useState('')
    const [errorTipePembelajaran, setErrorTipePembelajaran] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/user')
            .then(({ data }) => {
                if (data.role === 'admin') {
                    return navigate('/')
                }
                setUserId(data.id)
                setRole(data.role)

            });
        axiosClient.get('/getLearningCategories')
            .then(({ data }) => {
                setCategory(data.categories)
                setLoading(false)
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
        setGambar(file)
        setPreview(URL.createObjectURL(file))

    }

    const handleThumbnail = (e) => {
        const file = e.target.files[0]
        setThumbnail(file)
        setThumbnailPreview(URL.createObjectURL(file))

    }

    const handleVideo = (e) => {
        const file = e.target.files[0]
        setVideo(file)
        setPreviewVideo(file.name)

    }

    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value)
        setSelectedSubCategory('')
        for (let i = 0; i < category.length; i++) {
            if (category[i].id === parseInt(e.target.value)) {
                setSubCategory(category[i].sub_categories)
            }
        }
    }
    const handleChangeSubCategory = (e) => {
        setSelectedSubCategory(e.target.value)
    }



    const onSubmit = () => {
        setLoading(true)
        let formData = new FormData();
        formData.append('Judul', judul)
        formData.append('JudulKonten', judulDeskripsi)
        formData.append('Konten', deskripsi)
        formData.append('Gambar', gambar)
        formData.append('Thumbnail', thumbnail)
        formData.append('Video', video)
        formData.append('user', userId)
        formData.append('TipePembelajaran', selectedSubCategory)
        formData.append('JenisPembelajaran', selectedCategory)

        axiosClient.post('/uploads', formData)
            .then((res) => {
                return navigate('/pembelajaran', { state: { message: res.data } })

            }).catch((error) => {
                const response = error.response.data.errors
                setErrorJudul('')
                setErrorJudulKonten('')
                setErrorKonten('')
                setErrorGambarKonten('')
                setErrorThumbnail('')
                setErrorVideo('')
                setErrorJenisPembelajaran('')
                setErrorTipePembelajaran('')

                response.Judul ? setErrorJudul(response.Judul) : ""
                response.JudulKonten ? setErrorJudulKonten(response.JudulKonten) : ""
                response.Konten ? setErrorKonten(response.Konten) : ""
                response.Gambar ? setErrorGambarKonten(response.Gambar) : ""
                response.Thumbnail ? setErrorThumbnail(response.Thumbnail) : ""
                response.Video ? setErrorVideo(response.Video) : ""
                response.JenisPembelajaran ? setErrorJenisPembelajaran(response.JenisPembelajaran) : ""
                response.TipePembelajaran ? setErrorTipePembelajaran(response.TipePembelajaran) : ""
                setLoading(false)

            })

    }

    return (
        <>
            {loading && <CircularIndeterminate />}
            {!loading && <Grid container direction='column' sx={{ minHeight: '700px', padding: '0px' }}>
                <Grid item sx={{ textAlign: 'center' }}>
                    <h1>Upload Pembelajaran</h1>
                </Grid>
                <Grid container direction={'row'} sx={{ padding: '50px 100px 100px 100px' }}>
                    {/* Left */}
                    <Grid container direction={'column'} md={6} sx={12} spacing={5}>
                        <Grid item>
                            <TextField
                                required
                                id="outlined-required"
                                label="Judul Pembelajaran"
                                style={{ minWidth: '50%', backgroundColor: 'white' }}
                                value={judul}
                                onChange={event => setJudul(event.target.value)}
                            />
                        </Grid>
                        {errorJudul ? <small style={{ color: "#B00020", fontSize: '13px', marginLeft: '50px' }}>{errorJudul}</small> : ""}
                        <Grid item>
                            <TextField
                                required
                                id="outlined-required"
                                label="Judul Konten Pembelajaran"
                                multiline
                                style={{ minWidth: '50%', backgroundColor: 'white' }}
                                value={judulDeskripsi}
                                onChange={event => setJudulDeskripsi(event.target.value)}
                            />
                        </Grid>
                        {errorJudulKonten ? <small style={{ color: "#B00020", fontSize: '13px', marginLeft: '50px' }}>{errorJudulKonten}</small> : ""}
                        <Grid item>
                            <TextField
                                required
                                id="outlined-required"
                                label="Konten Pembelajaran"
                                multiline
                                style={{ minWidth: '80%', backgroundColor: 'white' }}
                                value={deskripsi}
                                onChange={event => setDeskripsi(event.target.value)}
                            />
                        </Grid>
                        {errorKonten ? <small style={{ color: "#B00020", fontSize: '13px', marginLeft: '50px' }}>{errorKonten}</small> : ""}
                        <Grid item>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Gambar Konten
                                <VisuallyHiddenInput type="file" onChange={handleImage} />
                            </Button>
                        </Grid>
                        {errorGambarKonten ? <small style={{ color: "#B00020", fontSize: '13px', marginLeft: '50px' }}>{errorGambarKonten}</small> : ""}
                        {preview ? (
                            <Grid item>
                                <img src={preview} style={{ width: '100px', height: '100px' }}></img>
                            </Grid>
                        ) : " "}
                    </Grid>
                    {/* Right */}
                    <Grid container direction={'column'} md={6} sx={12}>
                        <Grid item>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Thumbnail
                                <VisuallyHiddenInput type="file" onChange={handleThumbnail} />
                            </Button>
                        </Grid>
                        {errorThumbnail ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorThumbnail}</small> : ""}
                        {thumbnailPreview ? (
                            <Grid item>
                                <img src={thumbnailPreview} style={{ width: '100px', height: '100px' }}></img>
                            </Grid>
                        ) : " "}

                        <Grid item sx={{ marginTop: '50px' }}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Video
                                <VisuallyHiddenInput type="file" onChange={handleVideo} />
                            </Button>
                        </Grid>
                        {errorVideo ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorVideo}</small> : ""}
                        {previewVideo ? (
                            <Grid item>
                                <b>{previewVideo}</b>
                            </Grid>
                        ) : " "}
                        <Grid item sx={{ marginTop: '30px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Jenis Pembelajaran</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedCategory}
                                    label="Lembaga"
                                    onChange={handleChangeCategory}
                                    style={{ width: '60%' }}
                                >
                                    {category.map((cat) => (
                                        <MenuItem value={cat.id}>{cat.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {errorJenisPembelajaran ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorJenisPembelajaran}</small> : ""}
                        {subCategory.length !== 0 && <Grid item sx={{ marginTop: '30px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tipe Pembelajaran</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedSubCategory}
                                    label="Lembaga"
                                    onChange={handleChangeSubCategory}
                                    style={{ width: '60%' }}
                                >
                                    {subCategory.map((cat) => (
                                        <MenuItem value={cat.id}>{cat.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        }
                        {errorTipePembelajaran ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorTipePembelajaran}</small> : ""}
                        <Grid item sx={{ display: 'flex', marginTop: '50px' }}>
                            <Button onClick={onSubmit} variant="contained" style={{ backgroundColor: '#66AB92', color: 'black' }}>
                                Upload Pembelajaran
                            </Button>
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>}
        </>
    )
}