// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext'; // Adjust path accordingly
import Signup from './components/Signup';
import Login from './components/Login';
import OrderHistory from './components/OrderHistory';
import { Button, Container, Typography, AppBar, Toolbar } from '@mui/material';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
};

const Main = () => {
  const { token, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Signup Form
          </Typography>
          {token ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button
                style={{
                  backgroundColor: '#1976d2', // Blue color for Login
                  color: '#fff',
                  marginRight: '8px',
                }}
                variant="contained"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                style={{
                  backgroundColor: '#4caf50', // Green color for Sign Up
                  color: '#fff',
                }}
                variant="contained"
                component={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: '16px', textAlign: 'center' }}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/" element={
            <Typography variant="h5">
              Welcome! 
            </Typography>
          } />
        </Routes>
      </Container>
    </Container>
  );
};

export default App;
