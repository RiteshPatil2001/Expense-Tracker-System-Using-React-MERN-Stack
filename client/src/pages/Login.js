import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';


const Login = () => {
    const [loading, setLaoding] = useState(false)
    const navigate = useNavigate()
    //Form Submit
    const submitHandler = async (values) => {
        try {
            setLaoding(true);
            const { data } = await axios.post("/users/login", values);
            setLaoding(false);
            message.success("Login Success");
            localStorage.setItem('user', JSON.stringify({ ...data.user, password: " " }))
            navigate("/")
        } catch (error) {
            setLaoding(false);
            message.error("Invalid Something Went Wrong");
        }
    };

    //Prevent for login user
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/')
        }
    }, [navigate]);

    return (
        <>
            <div className='login-loading'>
                {loading && <Spinner />}
            </div>
            <div className="login-content">
                <div className="imagecontainer">
                    <img src={process.env.PUBLIC_URL + '/' + 'Enpense1.1.png'}  />
                </div>
                <div className='login-page'>
                    <Form layout='vertical' onFinish={submitHandler}>
                        <h1>Login Form</h1>
                        <Form.Item label="Email" name="email">
                            <Input type="email" />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input type="password" />
                        </Form.Item>
                        <div className='d-flex justify-content-between'>
                            <Link to="/register">Not A User? <br></br>Click Here To Register!</Link>
                            <button className='btn btn-primary'>Login</button>
                        </div>
                    </Form>
                </div>
            </div>

        </>
    )
}

export default Login