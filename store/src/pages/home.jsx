import React, { useEffect, useState } from 'react'
import SideNavBar from '../components/sideNav';
import { useLocation } from 'react-router-dom';

const Home = () => {
  let [navActive, setNavActive] = useState(1);
  let location = useLocation();

  useEffect(() => {
    signinCheck();
    switch (location.pathname) {
      case '/':
        setNavActive(1);
        break;
      case '/stores':
        setNavActive(2);
        break;
      case '/orders':
        setNavActive(3);
        break;
      case '/bills':
        setNavActive(4);
        break;
      case '/stock':
        setNavActive(5);
        break;
      case '/employees':
        setNavActive(6);
        break;
      case '/categories':
        setNavActive(7);
        break;
      case '/products':
        setNavActive(8);
        break;
      case '/customers':
        setNavActive(9);
        break;
      case 'analytics':
        setNavActive(10);
        break;
      default:
        setNavActive(1);
        break;
    }
  },[location.pathname]);

  const signinCheck = async () => {
    let status = await window.sessionStorage.getItem('userData');
    if(!status){
      window.location.replace('/login')
    }
  }

  return (
    <div className="main col-sm-12">
      <div className="side-nav col-sm-2">
        <SideNavBar navActive={navActive} setNavActive={setNavActive} />
      </div>
    </div>
  )
}

export default Home