import React, { useState, useEffect } from 'react';
import MyNavbar from '../../components/MyNavbar';
import MySidebar from '../../components/MySidebar';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import MyLoader from '../../components/MyLoader';
import MyApiFailure from '../../components/MyApiFailure';
import MyUser from '../../components/MyUser';
import MyCard from '../../components/MyCard';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

const apiDiffState = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
};

const Users = () => {
  const [show, setShow] = useState(false);
  const [btnName, setBtnName] = useState('')
  const [apiStatus, setApiStatus] = useState(apiDiffState.progress);
  const [usersList, setUsersList] = useState([]);

  
  useEffect(() => {
    const getUsersData = async () => {
      setApiStatus(apiDiffState.progress);
      try {
        // Simulate a one-second delay using setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axios.get('/api/users');
        setApiStatus(apiDiffState.success);
        setUsersList(response.data);
      } catch (err) {
        setApiStatus(apiDiffState.failure);
        console.error(err);
      }
    };
    getUsersData();
  }, []);


  let active = 3;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  const handleClose = () => setShow(false);

  const onEdit = () => {
    setBtnName('Edit')
    setShow(true)
  }

  const onBan = () => {
    setBtnName('Ban')
    setShow(true)
  };


  const renderSuccess = () => (
    <div>
      <div className='d-flex'>
      <MyCard margin='m-3' dataDetails={{title: "Total Users",count: usersList.length}} />
      <MyCard margin='m-3' dataDetails={{title: "Active Users",count: usersList.length}} />
      </div>
      <Table striped bordered hover className='m-3'>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Ban</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
            <MyUser key={user.userId} user={user} onEdit={onEdit} onBan={onBan} />
          ))}
        </tbody>
      </Table>
      <div className='m-3'>
        <Pagination>
          {items}
        </Pagination>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{btnName} Button Clicks!!</Modal.Title>
        </Modal.Header>
      </Modal>
      
    </div>
  );

  const renderDiffView = () => {
    switch (apiStatus) {
      case apiDiffState.progress:
        return <MyLoader />;
      case apiDiffState.success:
        return renderSuccess();
      case apiDiffState.failure:
        return <MyApiFailure />;
      default:
        return null;
    }
  };

  return (
    <>
      <MyNavbar />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <MySidebar />
        </div>
        <Container className="m-4">
          {renderDiffView()}
        </Container>
      </div>
    </>
  );
};

export default Users;
