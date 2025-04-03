import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, Paper, Box, TextField, Button, Typography, Alert } from "@mui/material";


// Custom theme with primary and secondary colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Green
    },
    secondary: {
      main: "#FF9800", // Orange
    },
  },
});

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/user/register", formData);
      if (response.data.success) {
        navigate("/login");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <ThemeProvider theme={theme}>

      <Grid container justifyContent="center" sx={{ mt: 5 }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" gutterBottom>
              Sign Up
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: "bold",
                  ":hover": { backgroundColor: theme.palette.primary.dark },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Signup;
