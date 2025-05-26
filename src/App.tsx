import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApolloAppProvider from "./context/ApolloProvider";
import { Container, Typography } from "@mui/material";
import NavBar from "./components/NavBar";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import OrderDetails from "./pages/OrderDetails";
import OrderList from "./pages/OrderList";

const App: React.FC = () => {
  return (
    <ApolloAppProvider>
      <BrowserRouter>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/" element={<OrderList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ApolloAppProvider>
  );
};

export default App;
