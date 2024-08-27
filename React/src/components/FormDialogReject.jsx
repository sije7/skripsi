import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axiosClient from '../axios-client';

export default function FormDialogReject(props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null)

  const handleSubmit = () => {
    props.setLoading(true)
    let fd = new FormData()
    fd.append("id", props.data.id)
    fd.append("message", message)
    fd.append("email", props.data.email)

    axiosClient.post(`/users/reject`, fd)
      .then(({ res }) => {
        setOpen(false)
        props.setLoading(false)
      })

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <p onClick={handleClickOpen}>Reject</p>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            handleClose();
          },
        }}
      >
        <DialogTitle>Penolakan Akun {props.data.name}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontWeight: 'bold' }}>
            Untuk menolak aktivasi akun lembaga, berikan alasan untuk penolakan.
            Alasan penolakan akan dikirim kepada email lembaga.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            value={message}
            label="Alasan Penolakan"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleSubmit}>Tolak Akun</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
