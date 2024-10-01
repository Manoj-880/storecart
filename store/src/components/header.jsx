import React from 'react';
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';

const Header = () => {
    let userData = window.sessionStorage.getItem('userData');
    return (
        <div className="header col-sm-12">
            <div className="header-content">
                <div className="menu-icon">
                    <DragHandleOutlinedIcon className='menu'/>
                </div>
                <div className="header-note">
                    <h2>Welcome back {userData.name}</h2>
                </div>
            </div>
            <div className="header-buttons">
                <div className="button notification-button">
                    <NotificationsNoneOutlinedIcon/>
                </div>
                <div className="button">
                    <PowerSettingsNewOutlinedIcon/>
                </div>
            </div>
        </div>
    )
}

export default Header