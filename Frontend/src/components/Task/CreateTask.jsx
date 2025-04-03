import React, { useState } from "react";
import axios from "axios";
import { Container, Paper, Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Alert } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/task/create", formData, { withCredentials: true });

      if (response.data.success) {
        toast.success("Task created successfully!", { position: "top-right", autoClose: 3000 });
        setMessage(response.data.message);

        setTimeout(() =>{
          navigate("/admin/show");
        },3000
      )

      }
    } catch (err) {
      toast.error("Error creating task!", { position: "top-right", autoClose: 3000 });
      setMessage(err.response?.data?.message || "Error creating task");
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer position="top-right" autoClose={3000} />
      <Paper elevation={4} sx={{ padding: 4, marginTop: 5, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" gutterBottom>
          Create Task
        </Typography>

        {message && <Alert severity="info">{message}</Alert>}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField label="Title" name="title" value={formData.title} onChange={handleChange} variant="outlined" fullWidth required />
            <TextField label="Description" name="description" value={formData.description} onChange={handleChange} variant="outlined" fullWidth required />
            <TextField label="Due Date" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} variant="outlined" fullWidth required />
            <FormControl variant="outlined" fullWidth required>
              <InputLabel>Priority</InputLabel>
              <Select name="priority" value={formData.priority} onChange={handleChange} label="Priority">
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontSize: "16px", fontWeight: "bold", ":hover": { backgroundColor: "#1565C0", transform: "scale(1.05)" } }}>
              Create Task
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateTask;