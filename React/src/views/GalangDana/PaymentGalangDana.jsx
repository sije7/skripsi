import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useEffect } from "react"
import { useLocation } from "react-router-dom";

export default function PaymentGalangDana() {
  const location = useLocation()
  const { detail } = location.state;
  useEffect(() => {
    console.log(detail)
  }, [])


  const onSubmit = () => {

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
            // value={user.name}
            // onChange={event => setPenanggungjawab(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              disabled
              id="outlined-required"
              value={detail.title}
              style={{ minWidth: '60%', backgroundColor: 'white', fontWeight:'bold' }}
            // value={judul}
            // onChange={event => setJudul(event.target.value)}
            />
          </Grid>
          {/* {errorJudul ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorJudul}</small> : ""} */}
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="Nomor Rekening"
              multiline
              style={{ minWidth: '60%', backgroundColor: 'white' }}
              maxRows={4}
            // value={keterangan}
            // onChange={event => setKeterangan(event.target.value)}
            />
          </Grid>
          {/* {errorDeskripsi ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorDeskripsi}</small> : ""} */}
        </Grid>
        {/* Right Side */}
        <Grid container xs={12} md={6} direction={"column"} rowSpacing={3} sx={{ paddingLeft: '100px' }}>
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="Lokasi Galang Dana *"
              multiline
              style={{ minWidth: '100%', backgroundColor: 'white' }}
            // maxRows={4}
            // value={lokasi}
            // onChange={event => setLokasi(event.target.value)}
            />
          </Grid>
          {/* {errorLokasi ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorLokasi}</small> : ""} */}
          <Grid item>
            <FormControl >
              <InputLabel htmlFor="outlined-adornment-amount">Target *</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                label="Amount"
                type="number"
                style={{ backgroundColor: 'white' }}
              // value={target}
              // onChange={event => setTarget(event.target.value)}
              />
            </FormControl>
          </Grid>
          {/* {errorTarget ? <small style={{ color: "#B00020", fontSize: '13px' }}>{errorTarget}</small> : ""} */}
          <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid item >
              <TextField
                required
                id="outlined-required"
                label="Judul Galang Dana"
                style={{ minWidth: '60%', backgroundColor: 'white' }}
              // value={judul}
              // onChange={event => setJudul(event.target.value)}
              />

            </Grid>
          </Grid>
          {/* {errorDeadline ? <small style={{ color: "#B00020", fontSize: '13px' }}>jangka waktu minimal 1 minggu</small> : ""} */}
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