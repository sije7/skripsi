import { Box, Grid } from "@mui/material";

export default function PembelajaranDetail() {
    return (
        <>
            <Grid container direction={'column'} spacing={3} rowSpacing={5} sx={{ padding: '50px', paddingTop: '20px' }}>
                <Grid item>
                    <h1>
                        Edukasi Bencana - Banjir
                    </h1>
                </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                    <video width="750" height="500" controls >
                        <source src="./Videos/video1.mp4" type="video/mp4" />
                    </video>=
                </Grid>
                <Grid item>
                    <h1>Penyebab dan Penanggulangan Banjir</h1>
                </Grid>
                <Grid item>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut laoreet sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas non nibh nibh. Ut ac varius turpis. Nulla ultrices at nisl tristique faucibus. Sed et tortor et neque pellentesque euismod vitae sed ante. Proin mollis egestas facilisis.
                        Curabitur eu ante euismod, interdum mi ac, sollicitudin lorem. Mauris tincidunt sapien a tellus ultricies tincidunt. Curabitur fermentum sodales placerat. Vivamus porttitor risus at neque molestie, eu venenatis dolor pharetra. Maecenas aliquam non tortor dapibus bibendum. Cras venenatis varius quam sed eleifend. Donec pulvinar efficitur consectetur. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque vitae tincidunt risus. Vivamus fringilla volutpat eros. Proin vestibulum lorem eget est molestie maximus. Fusce tempor elit nec egestas iaculis. Proin non lacus ultricies, iaculis lacus nec, tristique ipsum. Morbi nec rutrum sapien, nec rhoncus risus. Donec sed nisl ut felis consectetur sodales sit amet vel tellus. Praesent vehicula venenatis elit, at aliquet ligula convallis non.
                    </p>
                </Grid>
                <Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        component="img"
                        sx={{
                            height: '400px',
                            width: '600px',
                            // borderRadius: '40px',
                            minWidth: '400px',
                        }}
                        src={`https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                    />
                </Grid>

            </Grid>
        </>
    )
}