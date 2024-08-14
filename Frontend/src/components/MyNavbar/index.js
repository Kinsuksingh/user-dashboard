import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { BiLogoReact } from "react-icons/bi";


const MyNavbar = () =>  {

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/"><span><BiLogoReact /></span></Navbar.Brand>
        <Nav>
          <div className='d-flex d-md-none'>
            <Nav.Link as={Link} to="/"><span><FaHome /></span></Nav.Link>
            <Nav.Link as={Link} to="/users"><span><FaUser /></span></Nav.Link>
            <Nav.Link as={Link} to="/posts"><span><AiFillFileText /></span></Nav.Link>
          </div>
          <Nav.Link as={Link} to="/login"><span><MdLogout/></span></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
