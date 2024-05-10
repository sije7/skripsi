import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider"
import { useEffect } from "react";
import axiosClient from "../axios-client";
import Footer from "../components/Footer";
import HeaderMain from "../components/Header";
import { Button } from "@mui/material";

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken } = useStateContext()

    if (!token) {
        return <Navigate to="/landingpage" />
    }

    const onLogout = (event) => {
        event.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])


    return (
        <>
            <HeaderMain />
            <Button onClick={onLogout}>Logout</Button>
                <Outlet />
            <Footer />
        </>
    )
}