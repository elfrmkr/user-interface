// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import MainPage from './components/MainPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App = () => {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: 'cursive',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                letterSpacing: '0.1rem',
                textTransform: 'uppercase',
              }}
            >
              SocialSpot
            </Typography>
            <Button
              component={Link}
              to="/"
              sx={{
                color: 'inherit',
                marginLeft: '5px',
                borderRadius: '10px',
                padding: '6px 12px',
                transition: 'background-color 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#56c1e0'
                },
              }}
            >
              Main Page
            </Button>
            <Button
              component={Link}
              to="/signin"
              sx={{
                color: 'inherit',
                marginLeft: '5px',
                borderRadius: '10px',
                padding: '6px 12px',
                transition: 'background-color 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#56c1e0'
                },
              }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              to="/signup"
              sx={{
                color: 'inherit',
                marginLeft: '5px',
                borderRadius: '10px',
                padding: '6px 12px',
                transition: 'background-color 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#56c1e0'
                },
              }}
            >
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>

        <Container>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
