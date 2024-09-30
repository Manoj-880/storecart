import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome icons
import { faEye, faEyeSlash, faMobile } from '@fortawesome/free-solid-svg-icons'; // Import eye and eye-slash icons for password toggle
import loginImage from "../assets/login_image.svg"; // Import login image
import logo from "../assets/logo.svg"; // Import logo image
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { login } from '../api_calls/login';
import {message} from 'antd';

const Login = () => {
    let navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        mobileNumber: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleNavigate = () => {
        navigate('/register');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await login({
            mobile_number: Number(formData.mobileNumber),
            password: formData.password,
        });
        if(response.success){
            setFormData({
                mobileNumber: "",
                password: "",
            });
            const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
            sessionStorage.setItem('userData', JSON.stringify({
                data: response.data,
                expiration: expirationTime
            }));
            message.success(response.message);
            navigate('/');
        } else {
            message.error(response.message);
        };
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="login">
            {/* Wrapper for the login page content */}
            <div className="login-content">
                {/* Left side image section */}
                <div className="login-image col-sm-12 col-md-6">
                    <img src={loginImage} alt="Login" /> {/* Display the login image */}
                </div>
                {/* Right side form section */}
                <div className="login-form col-sm-12 col-md-6">
                    <div className="logo">
                        <img src={logo} alt="Logo" /> {/* Display the logo */}
                    </div>
                    <div className="content">
                        <h5 className='login-head'>Sign in to your account</h5> {/* Header text for the login form */}
                        
                        {/* Login form */}
                        <form onSubmit={handleSubmit} className='form'>
                            <div className="input">
                                {/* Input for mobile number */}
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobileNumber"
                                    placeholder="Enter your mobile number"
                                    pattern="[0-9]{10}" // Ensure only 10-digit mobile numbers are allowed
                                    inputMode='numeric' // Use numeric keypad on mobile devices
                                    value={formData.mobileNumber} // Bind value to mobileNumber state
                                    onChange={handleInputChange} // Handle input change
                                    required // Make the input required
                                />
                                <div className="eye">
                                    <FontAwesomeIcon icon={faMobile} />
                                </div>
                            </div>

                            <div className="input">
                                {/* Input for password */}
                                <input
                                    type={showPassword ? "text" : "password"} // Toggle between text and password based on the showPassword state
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password} // Bind value to password state
                                    onChange={handleInputChange} // Handle input change
                                    required // Make the input required
                                />
                                {/* Icon to show/hide password */}
                                <div className="eye" onClick={handleShowPassword}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /> {/* Show eye icon for toggle */}
                                </div>
                            </div>

                            {/* Submit button */}
                            <button type="submit">Login</button>
                        </form>

                        {/* Navigation link to register page */}
                        <p className="note">New to StoreCraft? <span onClick={handleNavigate}>Register here</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;