import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Paper, Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Alert } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UpdateTask = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/task/taskList", { withCredentials: true });

        if (response.data.success) {
          const task = response.data.tasks.find((t) => t._id === id);
          if (task) {
            setFormData({
              title: task.title,
              description: task.description,
              dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
              priority: task.priority,
            });
          }
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "Error fetching task details");
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/task/update/${id}`, formData, { withCredentials: true });

      if (response.data.success) {
        toast.success("Task updated successfully!", { position: "top-right", autoClose: 3000 });
        setMessage(response.data.message);
        setTimeout(()=>{
             navigate("/admin/show")
        }, 3000)
      }
    } catch (err) {
      toast.error("Error updating task!", { position: "top-right", autoClose: 3000 });
      setMessage(err.response?.data?.message || "Error updating task");
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer position="top-right" autoClose={3000} />
      <Paper elevation={6} sx={{ padding: { xs: 3, md: 5 }, marginTop: { xs: 2, md: 4 }, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" gutterBottom>
          Update Task
        </Typography>

        {message && <Alert severity="info">{message}</Alert>}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField label="Title" name="title" value={formData.title} onChange={handleChange} variant="outlined" fullWidth required />
            <TextField label="Description" name="description" value={formData.description} onChange={handleChange} variant="outlined" fullWidth required multiline rows={4} />
            <TextField label="Due Date" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} variant="outlined" fullWidth required />
            <FormControl variant="outlined" fullWidth required>
              <InputLabel>Priority</InputLabel>
              <Select name="priority" value={formData.priority} onChange={handleChange} label="Priority">
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontSize: "16px", fontWeight: "bold", transition: "0.3s", ":hover": { backgroundColor: "#1565C0", transform: "scale(1.05)" } }}>
              Update Task
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateTask;