import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);



  const handleClickOpen = () => {
    console.log(props.data)
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
          <DialogContentText style={{fontWeight:'bold'}}>
            Untuk menolak aktivasi akun lembaga, berikan alasan untuk penolakan.
            Alasan penolakan akan dikirim kepada email lembaga.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Alasan Penolakan"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="error" type="submit">Tolak Akun</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
