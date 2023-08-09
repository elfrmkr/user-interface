import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const SignUp = () => {
  // Stat to manage form data
  const [formData, setFormData] = useState({
    photo: '',
    username: '',
    email: '',
    description: '',
    birthdate: '',
    // Add any other additional information fields here
  });
  const [submittedData, setSubmittedData] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle photo input changes
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          photo: reader.result,
        }));
      };
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle saving the profile data here (e.g., send to backend, update state, etc.)
    console.log('Profile data:', formData);
    setSubmittedData(formData);

    // Reset the form after submission
    setFormData({
      photo: '',
      username: '',
      email: '',
      description: '',
      birthdate: '',
      // Reset any other additional information fields here
    });
  };




  return (
    <Container maxWidth="sm">
      <Typography variant="h2">Create Your Profile</Typography>
      <form onSubmit={handleSubmit}>
        <Box mt={2}>
          <InputLabel htmlFor="photo">Photo:</InputLabel>
          <input
            type="file"
            accept="image/*"
            id="photo"
            onChange={handlePhotoChange}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Description"
            variant="outlined"
            multiline
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Birthdate"
            variant="outlined"
            type="date"
            name="birthdate"
            value={formData.birthdate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box mt={2}>

          <TextField
            id="filled-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            onChange={handleChange}
            fullWidth
          />
        </Box>

        {/* Add any other additional information fields here */}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Save Profile
          </Button>
        </Box>
      </form>
      {/* Display the selected photo if available */}
      {submittedData && (
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h4">Your Profile</Typography>
              <IconButton color="primary" onClick={() => setSubmittedData(null)}>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
                <Avatar
                  alt="Profile Picture"
                  src={submittedData.photo}
                  sx={{
                    width: 156,
                    height: 156,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)', // Blurry shadow effect
                    borderRadius: '50%',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="column" spacing={2}>
                  <Grid container item direction="row" alignItems="center" justifyContent="evenly" >
                    <Typography variant="body1" fontWeight="bold">Username:</Typography>
                    <Typography variant="body1">{submittedData.username}</Typography>
                  </Grid>
                  <Grid container item direction="row" alignItems="center" justifyContent="evenly">
                    <Typography variant="body1" fontWeight="bold">Email:</Typography>
                    <Typography variant="body1">{submittedData.email}</Typography>
                  </Grid>
                  <Grid container item direction="row" alignItems="center" justifyContent="evenly">
                    <Typography variant="body1" fontWeight="bold">Description:</Typography>
                    <Typography variant="body1">{submittedData.description}</Typography>
                  </Grid>
                  <Grid container item direction="row" alignItems="center" justifyContent="evenly">
                    <Typography variant="body1" fontWeight="bold">Birthdate:</Typography>
                    <Typography variant="body1">{submittedData.birthdate}</Typography>
                  </Grid>
                  {/* Add any other profile information fields here */}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )}
    </Container>
  );
};

export default SignUp;
