import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';


let theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#FF5722',
    },
  },
});

theme = responsiveFontSizes(theme);

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h2" fontWeight="bold" color="primary">
            Welcome to Task Manager
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Manage your tasks efficiently with role-based access.
          </Typography>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="large"
            sx={{ mt: 3, px: 4, py: 1.5 }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
