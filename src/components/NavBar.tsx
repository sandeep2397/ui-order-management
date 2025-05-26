import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const NavBar: React.FC = () => {
  const location = useLocation(); // ✅ Detect current route

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#2E3B55" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "flex-start", gap: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocalMallIcon fontSize="large" />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Shopping Cart
          </Typography>
        </Box>

        {/* ✅ Dynamic Highlight for Active Menu Item */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color={location.pathname === "/" ? "secondary" : "inherit"} // ✅ Highlights when active
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            sx={{
              textTransform: "none",
              fontWeight: location.pathname === "/" ? "bold" : "normal",
              color: location.pathname === "/" ? "#FF5722" : "inherit", // ✅ Fancy color (Deep Orange)
              borderBottom:
                location.pathname === "/" ? "2px solid #FF5722" : "none", // ✅ Adds underline effect
            }}
          >
            Home
          </Button>

          <Button
            color={
              location.pathname.includes("/products") ? "secondary" : "inherit"
            } // ✅ Highlights Products when active
            component={Link}
            to="/products"
            startIcon={<ShoppingCartIcon />}
            sx={{
              textTransform: "none",
              fontWeight: location.pathname.includes("/products")
                ? "bold"
                : "normal",
              color: location.pathname.includes("/products")
                ? "#FF5722"
                : "inherit", // ✅ Fancy color (Indigo)
              borderBottom: location.pathname.includes("/products")
                ? "2px solid #FF5722"
                : "none", // ✅ Adds underline effect
            }}
          >
            Products
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
