import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/task/taskList", { withCredentials: true });
      if (response?.data?.success) {
        setTasks(response.data.tasks);
      } else {
        toast.info("No tasks exist");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error fetching tasks";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
      <>
             <Container maxWidth="md">
      <Paper elevation={6} sx={{ p: 4, mt: 5, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom align="center">
          Tasks List
        </Typography>
        <List>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <ListItem
                key={task._id}
                sx={{
                  backgroundColor: "#f5f5f5",
                  mb: 1,
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2
                }}
              >
                <Box>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {task.description}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton component={Link} to={`/admin/update/${task._id}`} color="primary" size="large">
                    <EditIcon fontSize="large" />
                  </IconButton>
                  <IconButton component={Link} to={`/admin/delete/${task._id}`} color="error" size="large">
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </Box>
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" align="center">
              No tasks available
            </Typography>
          )}
        </List>
      </Paper>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-toast-progress"
      />
    </Container>
      </>
  );
};

export default ShowTasks;
