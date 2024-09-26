import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faMobile } from '@fortawesome/free-solid-svg-icons';
import signupImage from "../assets/signup.svg";
import logo from "../assets/logo.svg";
import { useNavigate } from 'react-router-dom';
import { message } from 'antd'; // Import Ant Design's message component

const Register = () => {
    let navigate = useNavigate();

    // State to hold form input values (mobile number, password, confirmPassword)
    const [formData, setFormData] = useState({
        mobileNumber: '',
        password: '',
        confirmPassword: '', // Add confirmPassword field
    });

    // State to manage the visibility of the password (show/hide password)
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);

    // Handle input changes and update the form data state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle navigation to the Register page when the user clicks "Register here"
    const handleNavigate = () => {
        navigate('/login');
    }

    // Handle form submission (when user clicks on "Login" button)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the password and confirmPassword fields match
        if (formData.password !== formData.confirmPassword) {
            message.error('Passwords do not match!'); // Show Ant Design error message
        } else {
            console.log('Mobile Number:', formData.mobileNumber);
            console.log('Password:', formData.password);

            // Proceed with the registration process (e.g., API call)

            // Reset the form data after submission
            setFormData({
                mobileNumber: "",
                password: "",
                confirmPassword: "", // Clear confirmPassword as well
            });
        }
    };

    // Toggle the visibility of the password (show/hide password)
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleConfirmShowPassword = () => {
        setConfirmShowPassword(!confirmShowPassword);
    }

    return (
        <div className="login">
            <div className="login-content">
                <div className="login-image col-sm-12 col-md-6">
                    <img src={signupImage} alt="Login" />
                </div>
                <div className="login-form col-sm-12 col-md-6">
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="content">
                        <h5 className='login-head'>Sign in to your account</h5>
                        
                        <form onSubmit={handleSubmit} className='form'>
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
                                <div className="eye">
                                    <FontAwesomeIcon icon={faMobile} />
                                </div>
                            </div>

                            <div className="input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="eye" onClick={handleShowPassword}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </div>
                            </div>

                            <div className="input">
                                <input
                                    type={confirmShowPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="eye" onClick={handleConfirmShowPassword}>
                                    <FontAwesomeIcon icon={confirmShowPassword ? faEyeSlash : faEye} />
                                </div>
                            </div>

                            <button type="submit">Register</button>
                        </form>

                        <p className="note">Already have an account? <span onClick={handleNavigate}>Login here</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;