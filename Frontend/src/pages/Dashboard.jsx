import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";

import CreateTask from "../components/Task/CreateTask";
import UpdateTask from "../components/Task/UpdateTask";
import DeleteTask from "../components/Task/DeleteTask";
import ShowTasks from "../components/Task/ShowTasks";


import { Container, Paper, Box, Typography, Button, Grid } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {

  const {isLoggedIn} = useContext(AuthContext);
  return (
    <>
  
      <Container maxWidth="md">
      <Container maxWidth="md">
      <Paper 
        elevation={6} 
        sx={{ 
          padding: 4, 
          marginTop: 5, 
          borderRadius: 3, 
          textAlign: "center", 
          background: "linear-gradient(to right, #1565C0, #4CAF50)", 
          color: "#fff" 
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Manage Your Tasks
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Organize and track tasks efficiently with the tools below.
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2} justifyContent="center">
            {
              isLoggedIn && <>
                <Grid item xs={12} sm={6}>
               <Link to={"/admin/create"}>
               <Button variant="contained" color="success" fullWidth>
                Create Task
              </Button>
               </Link>
            </Grid>
              </>
            }
            {
              isLoggedIn && <>

            <Grid item xs={12} sm={6}>
                <Link to={"/admin/show"}>
                    <Button variant="contained" color="warning" fullWidth>
                    View Tasks
                  </Button>
                </Link>
            </Grid>
              </>
            }
          </Grid>
        </Box>
      </Paper>
    </Container>

        <Box sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="create" element={<CreateTask />} />
            <Route path="update/:id" element={<UpdateTask />} />
            <Route path="delete/:id" element={<DeleteTask />} />
            <Route path="show" element={<ShowTasks />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;



