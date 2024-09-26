import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome icons
import { faEye, faEyeSlash, faMobile } from '@fortawesome/free-solid-svg-icons'; // Import eye and eye-slash icons for password toggle
import loginImage from "../assets/login_image.svg"; // Import login image
import logo from "../assets/logo.svg"; // Import logo image
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

const Login = () => {
    let navigate = useNavigate(); // Initialize navigation hook to use for routing

    // State to hold form input values (mobile number and password)
    const [formData, setFormData] = useState({
        mobileNumber: '',
        password: '',
    });

    // State to manage the visibility of the password (show/hide password)
    const [showPassword, setShowPassword] = useState(false);

    // Handle input changes and update the form data state
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the event target
        setFormData({
            ...formData,
            [name]: value, // Update the specific field (mobileNumber or password) with the new value
        });
    };

    // Handle navigation to the Register page when the user clicks "Register here"
    const handleNavigate = () => {
        navigate('/register'); // Navigate to the '/register' route
    }

    // Handle form submission (when user clicks on "Login" button)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log('Mobile Number:', formData.mobileNumber); // Log the mobile number to the console
        console.log('Password:', formData.password); // Log the password to the console

        // Reset the form data after submission
        setFormData({
            mobileNumber: "",
            password: "",
        });
    };

    // Toggle the visibility of the password (show/hide password)
    const handleShowPassword = () => {
        setShowPassword(!showPassword); // Invert the boolean state for showing password
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