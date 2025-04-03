import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Paper, Typography, Box, CircularProgress } from "@mui/material";

import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const logoutUser = async () => {
      try {
        await axios.get("http://localhost:8080/api/user/logout", {
          withCredentials: true,
          signal: signal,
        });
        setIsLoggedIn(false);
        navigate("/");
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Logout error", err);
        }
      }
    };

    logoutUser();

    return () => {
      controller.abort();
    };
  }, [navigate, setIsLoggedIn]);

  return (
    <>
  
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
            Logging Out...
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            Please wait while we securely log you out.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress color="primary" />
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Logout;
