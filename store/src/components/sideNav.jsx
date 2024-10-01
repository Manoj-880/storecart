import React from 'react'
import Logo from "../assets/logo.svg";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const SideNavBar = ({navActive, setNavActive}) => {
    const navigate = useNavigate();
    const navItems = [
        {
            id: 1,
            name: 'Dashboard',
            path: '/',
            icon: <DashboardOutlinedIcon/>,
        },
        {
            id: 2,
            name: 'Stores',
            path: '/stores',
            icon: <StorefrontOutlinedIcon/>,
        },
        {
            id: 3,
            name: 'Orders',
            path: '/orders',
            icon: <LocalGroceryStoreOutlinedIcon/>,
        },
        {
            id: 4,
            name: 'Bills',
            path: '/bills',
            icon: <ReceiptLongOutlinedIcon/>,
        },
        {
            id: 5,
            name: 'Stock',
            path: '/stock',
            icon: <Inventory2OutlinedIcon/>,
        },
        {
            id: 6,
            name: 'Employees',
            path: '/employees',
            icon: <Groups3OutlinedIcon/>,
        },
        {
            id: 7,
            name: 'Categories',
            path: '/categories',
            icon: <CategoryOutlinedIcon/>,
        },
        {
            id: 8,
            name: 'Products',
            path: '/products',
            icon: <LocalMallOutlinedIcon/>,
        },
        {
            id: 9,
            name: 'Customers',
            path: '/customers',
            icon: <PeopleAltOutlinedIcon/>,
        },
        {
            id: 10,
            name: 'Analytics',
            path: '/analytics',
            icon: <InsertChartOutlinedIcon/>,
        },
    ];

    const navStyle = {
        active: 'nav-item active',
        inactive: 'nav-item',
    }

    const handleOnClick = (id, path) => {
        setNavActive(id);
        navigate(path);
    }

    return (
        <div className="side col-sm-12">
            <div className="brand">
                <img src= {Logo} alt="logo" />
            </div>
            <div className="nav-list">
                {navItems.map((navItem) => (
                    <div key={navItem.id} className={navItem.id === navActive ? navStyle.active : navStyle.inactive} onClick={() => handleOnClick(navItem.id, navItem.path)}>
                        <p className="icon">{navItem.icon}</p>
                        <p className="link-name">{navItem.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideNavBar