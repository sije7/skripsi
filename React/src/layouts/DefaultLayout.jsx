import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider"
import { useEffect } from "react";
import axiosClient from "../axios-client";
import Footer from "../components/Footer";

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
            <div id="defaultLayout">
                <aside>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/users">Users</Link>
                </aside>
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        {<a href="#" onClick={onLogout} className="btn-logout">Logout</a>}
                    </div>
                </header>
                {notification &&
                    <div className="notification">
                        {notification}
                    </div>
                }
                <main>
                    <Outlet />
                </main>
                {/* <Footer /> */}
            </div>
        </>
    )
}