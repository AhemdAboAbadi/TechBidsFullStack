import React, { useState } from 'react';
import {
  Box, Typography, Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../../Components/SignUpForm';
import logo from '../../images/logo.png';
import { useAuth } from '../../context/useAuth';
import { useSnack } from '../../context/useSnack';

const SignUp : React.FC = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {
    name, email, password, confirmPassword,
  } = formValues;

  const [error, setError] = useState({
    name: false, email: false, password: false, confirmPassword: false,
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const { showSnack } = useSnack();

  const handleChange = (event: any): any => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleError = (callback: any): any => {
    if (name === '') {
      setError({
        name: true, email: false, password: false, confirmPassword: false,
      });
    } else if (email === '') {
      setError({
        name: false, email: true, password: false, confirmPassword: false,
      });
    } else if (password.length < 8) {
      setError({
        name: false, email: false, password: true, confirmPassword: false,
      });
    } else if (password !== confirmPassword || confirmPassword.length < 8) {
      setError({
        name: false, email: false, password: false, confirmPassword: true,
      });
    } else {
      callback();
    }
  };

  const onClickHandle = (): any => {
    handleError(() => {
      signup(name, email, password, confirmPassword, (err: any): any => {
        if (err) {
          showSnack(err.response.data.message, 'error');
        } else {
          navigate('/');
        }
      });
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Left Section */}
      <Box sx={{
        width: '50%',
        height: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Typography variant="h3" align="center" sx={{ color: '#fff', marginBottom: '2rem' }}>
          Make Your Dream
        </Typography>
        <Divider light />
        <Typography align="justify" sx={{ color: '#fff', padding: '0rem 8rem' }}>
          Lorem Ipsum is simply dummy text of the printing anLorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco
          Lorem Ipsum is simply dummy text of the printing anLorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco

        </Typography>
      </Box>

      {/* Right Section, Sign in Form */}
      <Box sx={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Typography variant="h3" align="center">
          Welcome To
        </Typography>
        <img src={logo} alt="Logo" width="35%" />
        <SignUpForm
          name={name}
          nameError={error.name}
          email={email}
          emailError={error.email}
          password={password}
          passwordError={error.password}
          confirmPassword={confirmPassword}
          confirmPasswordError={error.confirmPassword}
          handleChange={handleChange}
          onClickHandle={onClickHandle}
        />
      </Box>
    </Box>
  );
};

export default SignUp;
