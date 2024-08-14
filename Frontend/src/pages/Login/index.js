import React, { useState } from 'react'; // Import useState for form state management
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MyNavbar from '../../components/MyNavbar';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './index.css';

const formStyle = {
  width: '100%',
  maxWidth: '600px',
  backgroundColor: 'grey',
  padding: '25px',
  borderRadius: '5px',
};

function Login() {
  const [loginMessage, setLoginMessage] = useState('')
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showError, setError] = useState(false)
  const navigate = useNavigate(); 

  const handleSubmitEvent = async(event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // You can add form validation and error handling here
    if (formData.email !== '' && formData.password !== '') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await axios.post('/api/login', {
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json' // Explicitly set Content-Type
        }
      })      
      .then(function (response) {
        const resMess = response.data.message
        if(resMess === 'Login Success'){
          setLoginMessage('Login Success  !!!')
          setShow(true)
          setInterval(()=> {
            navigate('/')
          },1000)
        }
        setLoginMessage(`Login Failed due to ${resMess}`)
        setShow(true)
      })
      .catch(function (error) {
        setLoginMessage('Server Error !!')
        setShow(true)
        console.log(error);
      });
    } else {
      // Handle error or display validation message
      setError(true)
    }
    // Reset the form after successful or failed submission
    setFormData({ email: '', password: '' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <MyNavbar />
      <div className="form-section">
        <Form style={formStyle} onSubmit={handleSubmitEvent}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email" // Add `name` attribute for state management
              value={formData.email} // Set value from state
              onChange={handleChange} // Handle changes
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password" // Add `name` attribute for state management
              value={formData.password} // Set value from state
              onChange={handleChange} // Handle changes
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          {showError? <p className='error-message'>*Please Enter Eamil and Password</p>:null}
        </Form>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{loginMessage}</Modal.Title>
        </Modal.Header>
      </Modal>
      </div>
    </>
  );
}

export default Login;




