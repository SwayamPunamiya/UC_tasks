import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Typography, Paper, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { setToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    age: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate the field on change
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'name':
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          errorMessage = 'Name must contain only letters and spaces.';
        }
        break;
      case 'email':
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          errorMessage = 'Please enter a valid email address.';
        }
        break;
      case 'password':
        if (value.length < 6) {
          errorMessage = 'Password must be at least 6 characters long.';
        }
        break;
      case 'mobile':
        if (!/^\d{10}$/.test(value)) {
          errorMessage = 'Mobile number must be 10 digits.';
        }
        break;
      case 'age':
        if (!/^\d+$/.test(value) || value < 1 || value > 120) {
          errorMessage = 'Please enter a valid age.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if there are any errors before submitting
    if (Object.values(errors).some((error) => error)) {
      console.log('Please fix the errors before submitting.');
      return;
    }

    try {
      const response = await axios.post('/api/signup', formData);
      setToken(response.data.accessToken); // Assume token is returned
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5">Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {Object.keys(formData).map((key) => (
              <Grid item xs={12} key={key}>
                <TextField
                  name={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  onChange={handleChange}
                  fullWidth
                  required
                  type={key === 'password' ? 'password' : 'text'}
                  error={!!errors[key]}
                  helperText={errors[key]}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button component={Link} to="/login" fullWidth>
                Already have an account? Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
