import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx"; // Adjust the path as needed

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", p: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          Task Manager
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button component={Link} to="/" color="inherit">Home</Button>
          {isLoggedIn ? (
            <>
              <Button component={Link} to="/admin/show" color="inherit">Show Tasks</Button>
              <Button component={Link} to="/admin/create" color="inherit">Create Task</Button>
              <Button component={Link} to="/logout" color="inherit">Logout</Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">Login</Button>
              <Button component={Link} to="/signup" color="inherit">Signup</Button>
            </>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/">Home</MenuItem>
            {isLoggedIn ? (
              <>
                <MenuItem onClick={handleMenuClose} component={Link} to="/admin/show">Show Tasks</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/admin/create">Create Task</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/logout">Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleMenuClose} component={Link} to="/login">Login</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/signup">Signup</MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
