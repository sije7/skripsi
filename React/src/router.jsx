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
import GalangDana from './views/GalangDana/GalangDana';
import GalangDanaDetail from './views/GalangDana/GalangDanaDetail';
import RequestGalangDana from './views/GalangDana/RequestGalangDana';
import ApproveGalangDana from './views/GalangDana/ApproveGalangDana';
import PaymentGalangDana from './views/GalangDana/PaymentGalangDana';
import Profile from './views/Profile';
import ProfileEdit from './views/ProfileEdit';
import ApprovePayment from './views/GalangDana/ApprovePayment';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />, //layout
        children: [
            {
                path:'/',
                element: <Navigate to='/beranda'/>
            },
            {
                path: '/profile/:id',
                element: <Profile key="profileUser" /> //page
            },
            {
                path: '/profileEdit/:id',
                element: <ProfileEdit key="profileEditUser" /> //page
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
                path: '/galangdana',
                element: <GalangDana />
            },
            {
                path: '/galangdana/:id',
                element: <GalangDanaDetail />
            },
            {
                path: '/galangdana/request',
                element: <RequestGalangDana />
            },
            {
                path: '/galangdana/approvepage',
                element: <ApproveGalangDana />
            },
            {
                path: '/galangdana/payment',
                element: <PaymentGalangDana  />
            },
            {   
                path: '/galangdana/payment/approve',
                element: <ApprovePayment  />
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
