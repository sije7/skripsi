import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from './views/Login'
import Signup from './views/Signup'
import Users from './views/Users'
import Notfound from './views/Notfound';
import DefaultLayout from './layouts/DefaultLayout';
import GuestLayout from './layouts/GuestLayout';
import UserForm from './views/UserForm';
import LandingPage from './views/LandingPage';
import Beranda from './views/Beranda';
import AboutUs from './views/AboutUs';
import Uploads from './views/UploadPembelajaran';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />, //layout
        children: [
            {
                path:'/',
                element: <Navigate to='/users'/>
            },
            {
                path: '/beranda',
                element: <Beranda /> //page
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
            {
                path: '/aboutus',
                element: <AboutUs />
            },
            {
                path: '/uploads',
                element: <Uploads />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/landingpage',
                element: <LandingPage />
            }
        ]
    },
    {
        path: '*',
        element: <Notfound />
    }
])


export default router
