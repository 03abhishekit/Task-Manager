import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline, Container, Paper } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/navbar/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: { xs: 2, sm: 3, md: 5 },
          px: { xs: 2, sm: 3, md: 5 },
          mb:5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 4 },
              borderRadius: 3,
              backgroundColor: "#f5f5f5",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/admin/*" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Paper>
        </Container>
      </Box>
      <Footer />

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
    </Box>
  );
}

export default App;
