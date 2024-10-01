import React, { useEffect, useState } from 'react';
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    let [notifications, setNotifications] = useState([]);

    let notificationIdentifier = {
        visible : 'button notification-button',
        notVisible : 'button',
    }

    useEffect(() => {
        let userDataString = window.sessionStorage.getItem('userData');
        if (userDataString) {
            setUserData(JSON.parse(userDataString));
        }
        setNotifications([]);
    }, []);

    const handleLogout = () => {
        window.sessionStorage.removeItem('userData');
        navigate('/login');
    }

    return (
        <div className="header col-sm-12">
            <div className="header-content">
                <div className="menu-icon">
                    <DragHandleOutlinedIcon className='menu'/>
                </div>
                <div className="header-note">
                    <h2>Welcome back {userData.name ? userData.name : 'User'}</h2>
                </div>
            </div>
            <div className="header-buttons">
                <div className={notifications.length > 0 ? notificationIdentifier.visible : notificationIdentifier.notVisible}>
                    <NotificationsNoneOutlinedIcon/>
                </div>
                <div className="button" onClick={handleLogout}>
                    <PowerSettingsNewOutlinedIcon/>
                </div>
            </div>
        </div>
    );
}

export default Header;
