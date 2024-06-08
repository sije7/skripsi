import { Avatar, Box, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import SignUp from "./Signup";
import SignUpLembaga from "./SignupLembaga";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



export default function SignupAll() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        console.log(value)
        setValue(newValue);
    };

    return (
        <>
        <Grid sx={{display:'flex', justifyContent:'center'}}>
                <Avatar sx={{ m: 1, bgcolor: '#132519' }}>
                    <LockOutlinedIcon />
                </Avatar>
            </Grid>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab style={{marginLeft:'100px'}} label="Signup" />
                    <Tab style={{marginLeft:'150px'}} label="Signup Sebagai Lembaga" />
                </Tabs>
            </Box>
            {value === 0 && <SignUp />}
            {value === 1 && <SignUpLembaga />}

        </>
    )
}