import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'
import { FaHome, FaUser } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";


function MySidebar() {
  return (
    <div className='sidebar pt-5'>
      <Link className='link' to='/'><h5><span><FaHome/></span> Home</h5></Link>
      <Link className='link' to='/users'><h5><span><FaUser/></span> Users</h5></Link>
      <Link className='link' to='/posts'><h5><span><AiFillFileText/></span> Posts</h5></Link>
    </div>
  );
}

export default MySidebar;

