import { Box } from '@mui/material';

export default function CardAboutUs(props) {
    return (
        <>
            <Box sx={{
                width: '400px',
                height: '300px',
                borderRadius: '48px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            }}>
                <Box
                    component="img"
                    sx={{
                        display: 'flex',
                        height: '200px',
                        width: '300px',
                        marginLeft:'48px',
                    }}
                    src={props.image}
                />
                <div style={{ textAlign: 'center' }}>
                    <h2>{props.title}</h2>
                    <p style={{marginTop:"15px"}}>{props.content}</p>
                </div>
            </Box>
        </>
    )
}
