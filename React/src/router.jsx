import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from './views/Login'
import Signup from './views/Signup'
// import Users from './views/Users'
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
import ChooseRegistration from './views/ChooseRegister';
import SignupLembaga from './views/SignupLembaga';
import Donasi from './views/Donasi/Donasi';
import DonasiDetail from './views/Donasi/DonasiDetail';
import RequestDonasi from './views/Donasi/RequestDonasi';
import UploadPembelajaran from './views/UploadPembelajaran';
import AboutUs from './views/AboutUs';
import ApproveDonasi from './views/Donasi/ApproveDonasi';
import Pembelajaran from './views/Pembelajaran/Pembelajaran';
import UsersPage from './views/Users';
import PembelajaranDetail from './views/Pembelajaran/PembelajaranDetail';
import SignupAll from './views/SignupAll';
import UploadLearning from './views/Pembelajaran/PembelajaranUpload';
import PembelajaranApprove from './views/Pembelajaran/PembelajaranApprove';

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
                element: <UsersPage />
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
            {
                path: '/donasi',
                element: <Donasi />
            },
            {
                path: '/donasi/:id',
                element: <DonasiDetail />
            },
            {
                path: '/donasi/request',
                element: <RequestDonasi />
            },
            {
                path: '/uploads',
                element: <UploadPembelajaran/>
            },
            {
                path: '/aboutus',
                element: <AboutUs />
            },
            {
                path: '/donasi/approve',
                element: <ApproveDonasi />
            },
            {
                path: '/pembelajaran',
                element: <Pembelajaran />
            },
            {
                path: '/pembelajaran/approve',
                element: <PembelajaranApprove />
            },
            {
                path: '/pembelajaran/:id',
                element: <PembelajaranDetail />
            },
            {
                path:'/pembelajaran/upload',
                element: <UploadLearning />
            }
           
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
                path: '/signupLembaga',
                element: <SignupLembaga />
            },
            {
                path: '/landingpage',
                element: <LandingPage />
            },
            {
                path: '/pilihregis',
                element: <ChooseRegistration /> //page
            },
            {
                path: '/signupall',
                element: <SignupAll />
            }
        ]
    },
    {
        path: '*',
        element: <Notfound />
    }
])


export default router
