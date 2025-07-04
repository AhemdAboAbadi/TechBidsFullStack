import React from 'react';
import { Link } from 'react-router-dom';
import {
  TextField, Button, Box, Typography,
} from '@mui/material';

interface Props {
  email: string,
  emailError: any,
  password: string,
  passwordError: any,
  handleChange: any,
  onClickHandle: any,
}

const SignInForm : React.FC<Props> = ({
  email,
  password,
  emailError,
  passwordError,
  handleChange,
  onClickHandle,
}) => (
  <Box sx={{ padding: '1rem 8rem' }}>

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
      helperText={
          emailError
            ? 'Please enter your Email'
            : ''
        }
      error={emailError}
      onChange={handleChange}
    />

    <TextField
      error={passwordError}
      id="password"
      name="password"
      label="password"
      type="password"
      value={password}
      fullWidth
      size="small"
      margin="normal"
      required
      helperText={
                  passwordError
                    ? 'Please enter Password with at least 8 characters'
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
      Sign In
    </Button>

    <Typography variant="body1" gutterBottom className="paragraph-description" sx={{ paddingTop: '15px', color: '#9AA1B9' }}>
      Dont have an account ?
      <Link to="/signup"> Sign up </Link>
    </Typography>
  </Box>
);

export default SignInForm;
