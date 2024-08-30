import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { Link, useNavigate } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider"
import { Button, Grid } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormDialogReject from "../components/FormDialogReject"
import CircularIndeterminate from "../components/CircularIndeterminate"

export default function UsersPage() {
    const [users, setUsers] = useState([{}])
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext()
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        axiosClient.get(`/user`)
            .then(({ data }) => {
                if (data.role !== 'admin') {
                    return navigate('/')
                }
            })
        getUsers()

    }, [])

    const onApprove = (user) => {
        if (!window.confirm(`Apakah anda ingin melakukan approve Lembaga ${user.name}?`)) {
            return
        }

        axiosClient.post(`/users/approve/${user.id}`)
            .then(() => {
                setNotification('User Berhasil Diapprove')
                getUsers()
            })
    }

    const getUsers = () => {
        axiosClient.get('/usersToApprove')
            .then(({ data }) => {
                setUsers(data.users)
            })
            .catch(() => {

            })
            .finally(setLoading(false))
    }

    return (
        <>
            {loading && <CircularIndeterminate />}
            {!loading &&
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650, tableLayout: 'fixed  ' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell width={'200px'}>Data Lembaga</TableCell>
                                <TableCell width={'200px'} align="left">Lokasi</TableCell>
                                <TableCell width={'500px'} align="left">Dekripsi</TableCell>
                                <TableCell width={'100px'} align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow
                                    key={row.name}
                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        Nama: {row.name}
                                        <br />
                                        Penanggung Jawab: {row.penanggung_jawab}
                                        <br />
                                        Email: {row.email}
                                        <br />
                                        No Telepon: {row.nomor_telepon}
                                        <br />
                                        NIK: {row.nik}
                                        <br />
                                        NPWP: {row.npwp}
                                        <br/>
                                        No Rekening: {row.no_req}
                                        <br/>
                                        Bank: {row.bank}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="left">{row.lokasi}</TableCell>
                                    <TableCell component="th" scope="row" align="left">{row.deskripsi}</TableCell>
                                    <TableCell component="th" scope="row" align="left">
                                        <Button variant="contained" color="success" onClick={() => onApprove(row)} style={{ backgroundColor: '#66AB92' }} >
                                            Approve
                                        </Button>
                                        &nbsp;
                                        <br></br>
                                        <Button variant="contained" color="error">
                                            <FormDialogReject data={row} setLoading={loading => setLoading(loading)} getUsers={() => getUsers()} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    )
}