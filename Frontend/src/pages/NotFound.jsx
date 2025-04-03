import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          textAlign: "center",
          mt: { xs: 5, sm: 10 },
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          boxShadow: 4,
          bgcolor: "background.default",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          color="error.main"
          gutterBottom
          sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}
        >
          404 - Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          gutterBottom
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          Sorry, the page you are looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{
            mt: 2,
            px: 3,
            py: 1,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
