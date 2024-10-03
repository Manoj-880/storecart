import React, { useEffect, useState } from 'react'
import SideNavBar from '../components/sideNav';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../components/header';
import Dashboard from './dashboard';
import Stores from './stores';
import Orders from './orders';
import Bills from './bills';
import Stock from './stock';
import Employees from './employees';
import Categories from './categories';
import Products from './products';
import Customers from './customers';
import Analytics from './analytics';

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
      case '/analytics':
        setNavActive(10);
        break;
      default:
        setNavActive(1);
        break;
    };
  },[location.pathname]);

  const signinCheck = async () => {
    let status = await window.sessionStorage.getItem('userData');
    if(!status){
      window.location.replace('/login')
    };
  };

  return (
    <div className="main col-sm-12">
      <div className="side-nav col-sm-2">
        <SideNavBar navActive={navActive} setNavActive={setNavActive} />
      </div>
      <div className="col-sm-10">
        <div className="main-body">
          <Header/>
        </div>
        <div className="component col-sm-12">
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/stores' element={<Stores/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/bills' element={<Bills/>}/>
            <Route path='/stock' element={<Stock/>}/>
            <Route path='/employees' element={<Employees/>}/>
            <Route path='/categories' element={<Categories/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/customers' element={<Customers/>}/>
            <Route path='/analytics' element={<Analytics/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Home