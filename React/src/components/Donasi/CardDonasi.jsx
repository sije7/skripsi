import { Box, Button, Card, CardContent, Grid, styled } from "@mui/material";
import LinearDeterminate from "../LinearDeterminate";
import { Link } from "react-router-dom";



export default function CardDonasi(props) {
    function removeDuplicates(arr) {
        return [...new Set(arr)];
    }
    let sub_categories = removeDuplicates( props.subCategory)

    let path = props.image
    let image = `http://localhost:8000${path}`
    return (
        <>
            <Link to={`/donasi/${props.id}`} style={{ textDecoration: 'none' }}>
                {/* <Link to={`/donasi/${props.id}`} style={{ textDecoration: 'none' }}> */}
                <Card sx={{ width: '250px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                    <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={image} style={{ width: '100%', height: '200px' }} />
                    </Grid>
                    <CardContent>
                        <Grid container direction='column' rowSpacing={1} >
                            <Grid item sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', minHeight: '70px' }}>
                                <h2>{props.title}</h2>
                            </Grid>
                            <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                <LinearDeterminate progress={props.progress} />
                            </Grid>
                            <Grid item sx={{ textAlign: 'center' }}>
                                <p>{props.progress}%</p>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Grid container direction={'row'} spacing={1} sx={{ padding: '10px 20px 10px 20px' }}>
                        {props.subCategory ? sub_categories.map((sc) => (
                            <Grid item>
                                <p style={{ backgroundColor: '#FFD438', padding: '5px', borderRadius: '5px' }}>{sc}</p>
                            </Grid>
                        )) : ''}
                    </Grid>
                    <Grid item sx={{ textAlign: 'center' }}>
                        <p><b>{props.deadline} hari lagi</b></p>
                    </Grid>
                    <Grid sx={{ backgroundColor: '#66AB92', textAlign: 'center' }}><h2>{props.username}</h2></Grid>
                </Card>
            </Link>
        </>
    )
}