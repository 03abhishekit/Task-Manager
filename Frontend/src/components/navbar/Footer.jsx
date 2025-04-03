import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        {/* First Row */}
        <Grid container spacing={3} justifyContent="center">
          {/* About Us Column */}
          <Grid item xs={12} spacing={3} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are committed to providing the
              <br />
              best task management solutions.
            </Typography>
          </Grid>
          {/* Contact Column */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              Email: support@taskmanager.com
            </Typography>
            <Typography variant="body2">
              Phone: +1 (555) 123-4567
            </Typography>
          </Grid>
          {/* Follow Us Column */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link href="#" color="inherit" variant="body2">
              Facebook
            </Link>
            <br />
            <Link href="#" color="inherit" variant="body2">
              Twitter
            </Link>
            <br />
            <Link href="#" color="inherit" variant="body2">
              LinkedIn
            </Link>
          </Grid>
        </Grid>
        {/* Second Row */}
        <Box textAlign="center" pt={3}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Task Manager. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
