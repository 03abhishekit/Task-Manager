import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Paper, Box, TextField, Button, Typography, Alert } from "@mui/material";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      toast.info("You are already logged in.");
      navigate("/admin/show");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/user/login", formData, { withCredentials: true });
      if (response.data.success) {
        setIsLoggedIn(true);
        navigate("/admin");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 4 },
          mt: { xs: 3, sm: 5 },
          borderRadius: 3,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          gutterBottom
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
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
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              ":hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
