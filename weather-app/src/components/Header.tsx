import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const Logo = styled('img')({
  height: '6em',
  padding: '1.5em',
  transition: 'filter 300ms',
  '&:hover': {
    filter: 'drop-shadow(0 0 2em #646cffaa)'
  },
  '@media (prefers-reduced-motion: no-preference)': {
    animation: 'logo-spin infinite 20s linear'
  }
});

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          <Logo src="https://cdn.worldvectorlogo.com/logos/weather-ios.svg" alt="logo" />
        </Button>
        <Button color="inherit" component={Link} to="/">
          Weather Details
        </Button>
        <Button color="inherit" component={Link} to="/favorites">
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;