import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const NavBar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#2E3B55" }}>
      {" "}
      {/* ✅ Custom Background Color */}
      <Toolbar sx={{ display: "flex", justifyContent: "flex-start", gap: 4 }}>
        {/* ✅ Logo and Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocalMallIcon fontSize="large" />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Shopping Cart
          </Typography>
        </Box>

        {/* ✅ Navigation Items */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            sx={{ textTransform: "none" }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/products"
            startIcon={<ShoppingCartIcon />}
            sx={{ textTransform: "none" }}
          >
            Products
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
