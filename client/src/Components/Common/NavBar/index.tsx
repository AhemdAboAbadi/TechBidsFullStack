import React, { useState } from 'react';
import {
  Box, AppBar, IconButton, Toolbar, Menu, MenuItem, Typography, Divider,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import navLogo from '../../../images/navLogo.png';
import { Search, SearchIconWrapper, StyledInputBase } from './SearchBar';

const NavBar : React.FC = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState('');

  const isMenuOpen = Boolean(anchorEl);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event: any): any => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): any => {
    setAnchorEl(null);
  };

  const handlePress = (data: any): any => {
    if (data.charCode === 13) {
      navigate(`/bids?name=${search}`);
    }
  };

  const handleChange = (event: any): any => {
    setSearch(event.target.value);
  };

  const handleLogout = (): any => {
    logout((err: any): any => {
      if (!err) {
        setAnchorEl(null);
        navigate('/');
      }
    });
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id="userMenu"
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={(): any => { navigate('/user/products'); }}>My Products</MenuItem>
      <MenuItem onClick={(): any => { navigate('/user/win'); }}>Win Items</MenuItem>
      <MenuItem onClick={(): any => { navigate('/user/bids'); }}>My Bids</MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <LogoutIcon sx={{ mr: 0.5 }} />
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            onClick={(): any => { navigate('/'); }}
            sx={{ mr: 4 }}
          >
            <img src={navLogo} alt="Logo" width="80%" />
          </IconButton>

          <Link to="/bids" style={{ textDecoration: 'none', color: '#fff' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Bids
            </Typography>
          </Link>

          <Box width="40%" sx={{ ml: 16 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: '#000' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ color: '#000' }}
                value={search}
                onChange={handleChange}
                onKeyPress={handlePress}
              />
            </Search>
          </Box>

          <Box sx={{ flexGrow: 0.9 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            { !user && (
              <IconButton color="inherit" onClick={() => navigate('/signin')}>
                <AccountCircleOutlinedIcon />
                <Typography sx={{ fontWeight: 'bold', ml: 1 }}> Sign in </Typography>
              </IconButton>
            ) }

            {user && (
            <IconButton
              size="large"
              // edge="end"
              aria-label="account of current user"
              aria-controls="userMenu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleOutlinedIcon />
              <Typography sx={{ fontWeight: 'bold', ml: 1 }}>{user.name}</Typography>
            </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default NavBar;
