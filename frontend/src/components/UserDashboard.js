/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:8080/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/login");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:8080/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:8080/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

    // const deleteUsers = async () => {
    //     const response = await axios.delete('http://localhost:8080/users', {
    //         user: username
    //     })
    // }

    // const Register = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post('http://localhost:8080/users', {
    //             user: username,
    //             emailAddress: email,
    //             password: password,
    //             confPassword: confPassword
    //         });
    //         navigate("/login");
    //     } catch (error) {
    //         if (error.response) {
    //             setMsg(error.response.data.msg);
    //         }
    //     }
    // }

    return (
        <div className="container mt-5">
            <h1>Welcome Back: <b>{name}</b></h1> <br />
            {/* <button onClick={getUsers} className="button is-info">Get Users</button> */}
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Level</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.userName}</td>
                            <td>{user.emailAddress}</td>
                            <td>{user.userLevel}</td>
                            <td><button onClick={getUsers} className="button is-info is-light">Modify</button></td>
                            <td><button onClick={getUsers} className="button is-danger is-light">Delete</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default Dashboard