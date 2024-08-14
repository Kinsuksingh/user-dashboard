import React, { useState, useEffect } from 'react';
import MyNavbar from '../../components/MyNavbar';
import MySidebar from '../../components/MySidebar';
import MyCard from '../../components/MyCard';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import MyLoader from '../../components/MyLoader';
import MyApiFailure from '../../components/MyApiFailure';

const apiDiffState = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
};

const Home = () => {
  const [apiStatus, setApiStatus] = useState(apiDiffState.progress);
  const [countData, setCountData] = useState([]);

  useEffect(() => {
    const getCountData = async () => {
      setApiStatus(apiDiffState.progress);
      try {
        // Simulate a one-second delay using setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axios.get('/api/home');
        setApiStatus(apiDiffState.success);
        setCountData(response.data);
      } catch (err) {
        setApiStatus(apiDiffState.failure);
        console.error(err);
      }
    };

    getCountData();
  }, []);

  const renderSuccess = () => (
    <>
      <h1 className="mb-4">Data Listing</h1>
      <Row>
        {countData.map((data) => (
          <MyCard key={data.id} dataDetails={data} margin='m-3'/>
        ))}
      </Row>
    </>
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

export default Home;


