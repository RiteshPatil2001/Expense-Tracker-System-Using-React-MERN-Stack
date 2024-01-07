import { message } from 'antd';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const [loginUser, setLoginUser] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setLoginUser(user)
        }
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem("user");
        message.success("Logout Successfully")
        navigate("/login")
    }
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <img class="header-logo" src={process.env.PUBLIC_URL + '/' + 'logo.png'}  />
                    <Link to="/" className="navbar-brand">Expense Management</Link>
                    <ul className="navbar-nav ms-auto mt-3">
                        <li className="nav-item active item1">
                            {" "}<p to="/user" className="nav-link">Welcome, {loginUser && loginUser.name}</p>{" "}
                        </li>
                        <li className="nav-item active item2">
                            <button className="btn btn-primary" onClick={logoutHandler}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    );
};

export default Header;