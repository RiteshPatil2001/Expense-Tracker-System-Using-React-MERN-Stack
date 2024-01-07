import React, { useEffect, useState } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
const Register = () => {
    const navigate = useNavigate()
    const [laoding, setLaoding] = useState(false)
    //Form Submit
    const submitHandler = async (values) => {
        try {
            setLaoding(true)
            await axios.post('/users/register', values)
            message.success('Registration Successful')
            setLaoding(false)
            navigate('/login')
        } catch (error) {
            setLaoding(false)
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
        <div className='register'>  
            <div className='register-loading'>
                {laoding && <Spinner />}
            </div>
            <div className='register-page'>
                <Form layout='vertical' onFinish={submitHandler}>
                    <h1>Registration Form</h1>
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" />
                    </Form.Item>
                    <div className='d-flex justify-content-between'>
                        <Link to="/login">Already Registered?<br></br> Click Here To Login!</Link>
                        <button className='btn btn-primary'>Register</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register