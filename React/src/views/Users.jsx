import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { Link } from "react-router-dom"
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

    useEffect(() => {
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
                console.log(data.users)
                setUsers(data.users)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Penanggung Jawab</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Lokasi</TableCell>
                            <TableCell align="right">No Telepon</TableCell>
                            <TableCell align="right">No Rekening</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}