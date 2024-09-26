import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loginImage from "../assets/login_image.svg";
import logo from "../assets/logo.svg";

const Login = () => {
    // Initial state for form data
    const [formData, setFormData] = useState({
        mobileNumber: '',
        password: '',
    });

    // Handle input changes and update state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Mobile Number:', formData.mobileNumber);
        console.log('Password:', formData.password);
        setFormData({
            mobileNumber: "",
            password: "",
        });
        console.log(formData);
    };

    return (
        <div className="login">
            <div className="login-content">
                <div className="login-image">
                    <img src={loginImage} alt="Login" />
                </div>
                <div className="login-form">
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                        <h5 className='login-head'>Sign in to your account</h5>
                        <form onSubmit={handleSubmit} className='login-form'>
                            <div className="input">
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobileNumber"
                                    placeholder="Enter your mobile number"
                                    pattern="[0-9]{10}"
                                    inputMode='numeric'
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="input">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <FontAwesomeIcon icon="fa-regular fa-eye" />
                            </div>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
