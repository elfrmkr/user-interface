import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Tooltip,
} from '@mui/material';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import MainPage from './components/MainPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreatePost from './components/Post/CreatePost'; // Replace with your actual component

const App = () => {
  const [posts, setPosts] = useState([]);

  const handlePost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              component={Link}
              to="/"
              variant="h6"
              sx={{
                width: 'fit-content',
                fontFamily: 'cursive',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                letterSpacing: '0.1rem',
                textTransform: 'uppercase',
              }}
            >
              SocialSpot
            </Button>

            <div>
              <Tooltip title="Create a post" placement="top">
                <Button component={Link} to="/createPost">
                  <ControlPointRoundedIcon
                    sx={{ color: 'white', fontSize: '30px' }}
                  />
                </Button>
              </Tooltip>

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
                    backgroundColor: '#56c1e0',
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
                    backgroundColor: '#56c1e0',
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
                    backgroundColor: '#56c1e0',
                  },
                }}
              >
                Sign Up
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        <Container>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/createPost" element={<CreatePost onPost={handlePost} />} />
          </Routes>
        </Container>
      </div>
    </Router>

  );
};

export default App;
