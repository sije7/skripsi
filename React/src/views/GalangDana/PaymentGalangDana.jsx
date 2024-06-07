import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axiosClient from "../../axios-client";
import CurrencyInput from "react-currency-input-field";

export default function PaymentGalangDana() {
  const location = useLocation()
  const navigate = useNavigate()
  const [ detail, setDetail ] = useState('')
  const [username, setUsername] = useState('')
  const [preview, setPreview] = useState('')
  const [image, setImage] = useState()
  const [userId, setuserId] = useState('')
  const [dana, setDana] = useState('')


  // Error
  const [errorImage, seterrorImage] = useState('')
  const [errorDana, seterrorDana] = useState('')

  useEffect(() => {
    location.state === null ? navigate('/') : setDetail(location.state)
    
    axiosClient.get('/user')
      .then(({ data }) => {
        setUsername(data.name)
        setuserId(data.id)
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
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const onSubmit = () => {
    let fd = new FormData()
    if (isNaN(parseInt(dana))) {
      fd.append("Dana", '')
    } else {
      fd.append("Dana", parseInt(dana))
    }
    fd.append("user_id", userId)
    fd.append("crowdfunding_id", detail.id)
    fd.append("Gambar",image)
    axiosClient.post('/crowdfunding/transaction/create', fd)
      .then((res) => {
        return navigate('/galangdana', { state: { message: res.data } })
      })
      .catch(err=>{
        seterrorDana('')
        seterrorImage('')
        const response = err.response.data.errors;
        response.Gambar ? seterrorImage(response.Gambar) : ""
        response.Dana ? seterrorDana(response.Dana) : ""
      }

      )

  }
  return (
    <>
      <h1 style={{ textAlign: 'center', padding: '20px' }}>Pembayaran Galang Dana</h1>
      <Grid container direction='row' sx={{ padding: '50px' }} component="form">
        {/* Left Side*/}
        <Grid container xs={12} md={6} direction={"column"} rowSpacing={3} sx={{ paddingLeft: '100px' }}>
          <Grid item>
            <TextField
              required
              id="outlined-required"
              label="Nama Lengkap"
              style={{ minWidth: '60%', backgroundColor: 'white' }}
              value={username}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              InputProps={{
                readOnly: true,
              }}
              label="Tujuan Sumbangan"
              id="outlined-required"
              value={detail.title}
              style={{ minWidth: '100%', backgroundColor: 'white', fontWeight: 'bold' }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="Nama Rekening Tujuan"
              multiline
              style={{ minWidth: '60%', backgroundColor: 'white' }}
              maxRows={4}
              value={detail.nama_rekening}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="Nomor Rekening Tujuan"
              multiline
              style={{ minWidth: '60%', backgroundColor: 'white' }}
              maxRows={4}
              value={detail.no_rekening}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

        </Grid>
        {/* Right Side */}
        <Grid container xs={12} md={6} direction={"column"} rowSpacing={3} sx={{ paddingLeft: '100px' }}>
          <Grid item>
            <p style={{ fontWeight: 'lighter' }}>Upload Bukti Transfer</p>
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
          {errorImage ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorImage}</small> : ""}
          {preview ? (
            <Grid item>
              <img src={preview} style={{ width: '100px', height: '100px' }}></img>
            </Grid>
          ) : " "}
          <Grid item>
            <p style={{ fontWeight: 'lighter' }}>Dana yang disumbangkan</p>
            <FormControl >
              <CurrencyInput
                id="input-example"
                name="input-name"
                placeholder="Rp"
                // defaultValue={''}
                prefix="Rp "
                decimalsLimit={2}
                style={{ width: '300px', height: '57px' }}
                value={dana}
                onValueChange={(value) => setDana(value)}
              // onChange={event => setTarget(event.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item>

            <Button onClick={onSubmit} variant="contained" style={{ backgroundColor: '#66AB92' }}>
              Melakukan Pembayaran
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}