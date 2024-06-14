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

export default function UsersPage() {
    const [users, setUsers] = useState([{}])
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext()
    const navigate = useNavigate()

    useEffect(() => {
        axiosClient.get(`/user`)
            .then(({ data }) => {
                if(data.role !== 'admin'){
                    return navigate('/')
                }
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            })
        getUsers()
    }, [])

    const onDelete = (user) => {
        if (!window.confirm("Are you sure to delete this User?")) {
            return
        }

        axiosClient.delete(`/users/${user.id}`)
            .then(() => {
                setNotification('User Deleted')
                getUsers()
            })
    }
    const onApprove = (user) => {
        if (!window.confirm("Are you sure to approve this User?")) {
            return
        }

        axiosClient.post(`/users/approve/${user.id}`)
            .then(() => {
                setNotification('User Berhasil Diapprove')
                getUsers()
            })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/usersToApprove')
            .then(({ data }) => {
                setUsers(data.users)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650, tableLayout: 'fixed  ' }} aria-label="simple table">
                    {/* <colgroup>
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                    </colgroup> */}
                    <TableHead>
                        <TableRow>
                            <TableCell width={'100px'}>Name</TableCell>
                            <TableCell width={'100px'} align="left">Penanggung Jawab</TableCell>
                            <TableCell width={'200px'} align="left">Email</TableCell>
                            <TableCell width={'200px'} align="left">Lokasi</TableCell>
                            <TableCell width={'150px'} align="left">No Telepon</TableCell>
                            <TableCell width={'150px'} align="left">No Rekening</TableCell>
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
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.penanggung_jawab}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell component="th" scope="row" align="left">{row.lokasi}</TableCell>
                                <TableCell align="left">{row.nomor_telepon}</TableCell>
                                <TableCell align="left">{row.no_req}({row.bank})</TableCell>
                                <TableCell component="th" scope="row" align="left">{row.deskripsi}</TableCell>
                                <TableCell component="th" scope="row" align="left">
                                    <Button variant="contained" color="success" onClick={() => onApprove(row)} style={{ backgroundColor: '#66AB92' }} >
                                        Approve
                                    </Button>
                                    &nbsp;
                                    <Button variant="contained" color="error" onClick={() => onDelete(row)}>
                                        Reject
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}