import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../gqloperations/mutations';

import { InfinitySpin } from 'react-loader-spinner'
export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [signinUser, { error, loading, data }] = useMutation(LOGIN_USER, {
        onCompleted(data) {
            localStorage.setItem("token", data.user.token)
            navigate('/profile')
        }
    })
    if (localStorage.getItem("token")) {
        navigate("/profile")

    }
    if (loading) return <InfinitySpin
        width='200'
        color="#452c2d"
    />

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await signinUser({
                variables: {
                    userSignin: formData
                }
            })
        }
        catch (err) {
            console.log(err)
        }

    }
    return (<div className="container my-container" >


        <div className='form-container' style={{ display: 'flex', width: "100%", flexDirection: "column" }} >
            {
                error &&
                <div className="red card-panel">{error.message}</div>
            }
            <h5 style={{ color: "#452C2D" }}>Login</h5>
            <form onSubmit={handleSubmit}>
                <input

                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    required
                />
                <input
                    className='login-inputField'
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    required
                />
                <Link className='have-account' to="/signup"><p>Dont have an account ?</p></Link>
                <button className="btn  " type="submit">Login</button>
            </form>

        </div>
    </div>)
}
