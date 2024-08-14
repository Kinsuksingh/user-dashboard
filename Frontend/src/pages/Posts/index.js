import React, { useState, useEffect} from 'react';
import MyNavbar from '../../components/MyNavbar';
import MySidebar from '../../components/MySidebar';
import MyPost from '../../components/MyPost';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import MyLoader from '../../components/MyLoader';
import MyApiFailure from '../../components/MyApiFailure';
import { Pagination } from 'react-bootstrap';
import MyCard from '../../components/MyCard';
import {Table} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const apiDiffState = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
};

const Posts = () => {
  const [show, setShow] = useState(false);
  const [btnName, setBtnName] = useState('')
  const [apiStatus, setApiStatus] = useState(apiDiffState.progress);
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const getPostsData = async () => {
      setApiStatus(apiDiffState.progress);
      try {
        // Simulate a one-second delay using setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axios.get('/api/posts');
        setApiStatus(apiDiffState.success);
        setPostsList(response.data);
      } catch (err) {
        setApiStatus(apiDiffState.failure);
        console.error(err);
      }
    };

    getPostsData();
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

  const onDeleteBtn = () => {
    setBtnName('Delete')
    setShow(true)
  }

  const onHideBtn = () => {
    setBtnName('Hide')
    setShow(true)
  };


  const renderSuccess = () => (
    <div>
      <div className='d-flex'>
      <MyCard margin='m-3' dataDetails={{title: "Total Posts",count: postsList.length}} />
      <MyCard margin='m-3' dataDetails={{title: "Published Posts",count: postsList.length}} />
      </div>
      <Table striped bordered hover className='m-3'>
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Post Caption</th>
            <th>Media URL</th>
            <th>Delete</th>
            <th>Hide</th>
          </tr>
        </thead>
        <tbody>
          {postsList.map((post) => (
            <MyPost key={post.postId} post={post} onDelete={onDeleteBtn} onHide={onHideBtn} />
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

export default Posts;
