import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import TransParentButton from '../Components/TransParentButton';
import TransParentInputs from '../Components/TransParentInputs';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function SignUpform() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Validation function
  const validateForm = () => {
    let isValid = true;
  
    // Validate username
    if (!username) {
      toast.error('Username field is required', {
        position: 'top-right',
        duration: 5000,
      });
      isValid = false;
    }
  
    // Validate email
    if (!email) {
      toast.error('Email field is required', {
        position: 'top-right',
        duration: 5000,
      });
      isValid = false;
    } else if (!emailRegex.test(email)) {
      toast.error('Input a valid email', {
        position: 'top-right',
        duration: 5000,
      });
      isValid = false;
    }
  
    // Validate password
    if (!password) {
      toast.error('Password field is required', {
        position: 'top-right',
        duration: 5000,
      });
      isValid = false;
    } else if (password.length < 4) {
      toast.error('Password must be at least 4 characters long', {
        position: 'top-right',
        duration: 5000,
      });
      isValid = false;
    }
  
    // Check if all fields are valid
    return isValid;
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if there are validation errors
    }

    console.log('Registering:', { username, email, password });

    try {
      const response = await axios.post(
        'http://localhost:5000/newuser', // API endpoint
        { username, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        toast.success('Registration Successful!', {
          position: 'top-right',
          duration: 5000,
        });
        console.log('Registration Response:', response.data);
        navigate('/'); // Redirect to login  page
      }
    } catch (error) {
      console.error('Registration Error:', error);
      toast.error(
        error.response?.data?.error || 'Registration failed. Please try again.',
        {
          position: 'top-right',
          duration: 5000,
        }
      );
    }
  };

  return (
    <div
      className="position-relative w-100 vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'transparent', overflow: 'hidden' }}
    >
      <div className="rounded p-4 bg-dark bg-opacity-75 backdrop-blur shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Sign In</h1>
        <form onSubmit={handleRegister}>
          <div className="mt-4 mx-2 p-6 rounded-lg">
            <TransParentInputs
              label="Username"
              height="40px"
              width="210px"
              fontSize="20px"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <TransParentInputs
              label="Email"
              height="40px"
              marginLeft="39.5px"
              width="210px"
              fontSize="20px"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
          <div className="mb-4">
            <TransParentInputs
              label="Password"
              height="40px"
              marginLeft="8px"
              width="210px"
              fontSize="20px"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <TransParentButton
            Name="Sign In"
            height="45px"
            width="120px"
            fontSize="1.2rem"
            type="submit"
          />
          <div className="d-flex justify-content-between mt-4 small text-white">
            <motion.div
              whileHover={{ x: -5, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link to="/forgot" className="text-white text-decoration-none">
                Forgot Password?
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ x: -5, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link to="/existinguser" className="text-decoration-none text-white">
                Already a user?
                              </Link>
            </motion.div>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default SignUpform;
