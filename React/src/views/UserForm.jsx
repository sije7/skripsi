import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import { useStateContext } from "../context/ContextProvider"

export default function UserForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const { setNotification } = useStateContext()
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setUser(data.data)
                    setLoading(false)
                })
                .catch(
                    setLoading(false)
                )
        }, [])
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification('User was successfully updated')
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            axiosClient.post('/users', user)
                .then(() => {
                    setNotification('User was successfully created')
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center"></div>
                )}
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
                }
            </div>
            {!loading &&
                <form onSubmit={onSubmit}>
                    <input type="" value={user.name} onChange={event => setUser({ ...user, name: event.target.value })} placeholder="Name"></input>
                    <input type="email" value={user.email} onChange={event => setUser({ ...user, email: event.target.value })} placeholder="Email"></input>
                    <input type="password" placeholder="Password" onChange={event => setUser({ ...user, password: event.target.value })}></input>
                    <input type="password" placeholder="Password Confirmation" onChange={event => setUser({ ...user, password_confirmation: event.target.value })}></input>
                    <button className="btn">Save</button>
                </form>
            }
        </>
    )
}
