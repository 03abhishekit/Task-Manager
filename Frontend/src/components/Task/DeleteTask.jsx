import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  ThemeProvider,
  createTheme,
  Box,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom theme with updated colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    error: {
      main: "#d32f2f",
    },
  },
});

const DeleteTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate("/admin/show");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/task/delete/${id}`, { withCredentials: true });

      if (response.data.success) {
        toast.success("Task deleted successfully!", { position: "top-right", autoClose: 3000 });
        setTimeout(() => navigate("/admin/show"), 2000);
      }
    } catch (err) {
      toast.error("Error deleting task!", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
     <>
        <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Container maxWidth="sm">
        <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
          <DialogTitle id="dialog-title">Delete Task</DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: "center", padding: 2 }}>
              <Typography variant="body1" color="textSecondary">
                Are you sure you want to delete this task? This action cannot be undone.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
            <Button onClick={handleDelete} variant="contained" color="error" sx={{ minWidth: 120 }}>
              Yes, Delete
            </Button>
            <Button onClick={handleClose} variant="outlined" color="primary" sx={{ minWidth: 120 }}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
     </>
  );
};

export default DeleteTask;