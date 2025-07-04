import React from 'react';
import { Link } from 'react-router-dom';
import {
  TextField, Button, Box, Typography,
} from '@mui/material';

interface Props {
  name: string,
  nameError: any,
  email: string,
  emailError: any,
  password: string,
  passwordError: any,
  confirmPassword: string,
  confirmPasswordError: any,
  handleChange: any,
  onClickHandle: any,
}

const SignUpForm : React.FC<Props> = ({
  name,
  nameError,
  email,
  emailError,
  password,
  passwordError,
  confirmPassword,
  confirmPasswordError,
  handleChange,
  onClickHandle,
}) => (
  <Box sx={{ padding: '1rem 8rem' }}>

    <TextField
      id="name"
      name="name"
      label="Name"
      type="text"
      value={name}
      fullWidth
      size="small"
      margin="normal"
      required
      error={nameError}
      helperText={
          nameError
            ? 'Please enter your Name'
            : ''
        }
      onChange={handleChange}
    />

    <TextField
      id="email"
      name="email"
      label="Email"
      type="text"
      value={email}
      fullWidth
      size="small"
      margin="normal"
      required
      error={emailError}
      helperText={
          emailError
            ? 'Please enter your Email'
            : ''
        }
      onChange={handleChange}
    />

    <TextField
      id="password"
      name="password"
      label="password"
      type="password"
      value={password}
      fullWidth
      size="small"
      margin="normal"
      required
      error={passwordError}
      helperText={
                  passwordError
                    ? 'Please enter Password with at least 8 characters'
                    : ''
                }
      onChange={handleChange}
    />

    <TextField
      id="confirmPassword"
      name="confirmPassword"
      label="Confirm Password"
      type="password"
      value={confirmPassword}
      fullWidth
      size="small"
      margin="normal"
      required
      error={confirmPasswordError}
      helperText={
        confirmPasswordError
          ? 'Confirm password must equal Password, with at least 8 characters'
          : ''
      }
      onChange={handleChange}
    />

    <Button
      variant="contained"
      fullWidth
      type="submit"
      onClick={onClickHandle}
      sx={{ mb: 2, mt: 2 }}
    >
      CREATE YOUR ACCOUNT
    </Button>

    <Typography variant="body1" gutterBottom className="paragraph-description" sx={{ paddingTop: '15px', color: '#9AA1B9' }}>
      Already have an account ?
      <Link to="/signin"> Sign in </Link>
    </Typography>
  </Box>
);

export default SignUpForm;
