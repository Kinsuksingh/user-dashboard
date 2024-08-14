import React from 'react';
import './index.css'
import MyNavbar from '../../components/MyNavbar';
import MySidebar from '../../components/MySidebar';


function NotFound() {
  return (
    <>
    <MyNavbar/>
    <div className='d-flex'>
      <div className='d-none d-md-block'><MySidebar /></div>
      <div className='notfound-section'>
          <h1 className="text-center">404</h1>
          <h2 className="text-center">Page Not Found</h2>
          <p className="text-center">
            The page you are looking for could not be found.
          </p>
      </div>
    </div>
    </>
  );
}

export default NotFound;

