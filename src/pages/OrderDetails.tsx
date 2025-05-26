import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Container,
  Paper,
  Typography,
  Chip,
  Divider,
  CardMedia,
} from "@mui/material";
import Grid2 from "@mui/material/Grid"; // ✅ Using Grid2
import { GET_ORDER_BY_ID } from "../graphql/queries";

const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ORDER_BY_ID, {
    variables: { id },
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error)
    return <Typography color="error">Error fetching order details.</Typography>;

  const order = data?.getOrderById || {};

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Order Details
        </Typography>

        {/* ✅ Order Number & Status */}
        <Grid2 container spacing={2}>
          <Grid2 sx={{ flex: 1 }}>
            <Typography variant="body1">
              <strong>Order Number:</strong> {order.orderNumber}
            </Typography>
          </Grid2>
          <Grid2 sx={{ textAlign: "right" }}>
            <Chip
              label={order.status}
              color={
                order.status === "pending"
                  ? "warning"
                  : order.status === "intransit"
                  ? "info"
                  : "success"
              }
              sx={{ fontSize: "16px", fontWeight: "bold" }}
            />
          </Grid2>
        </Grid2>

        <Divider sx={{ my: 2 }} />

        {/* ✅ Product List */}
        <Typography variant="h5" fontWeight="medium" sx={{ mb: 2 }}>
          Products
        </Typography>

        {order.products.map((product: any) => (
          <Paper key={product.id} sx={{ padding: 2, borderRadius: 2, mb: 2 }}>
            <Grid2 container spacing={2}>
              <Grid2 sx={{ width: 100 }}>
                <CardMedia
                  component="img"
                  sx={{ width: "100%", borderRadius: "6px" }}
                  image={
                    product.images?.[0] || "https://via.placeholder.com/100"
                  }
                  alt={product.title}
                />
              </Grid2>
              <Grid2 sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body1">
                  <strong>Quantity:</strong> {product.quantity}
                </Typography>
                <Typography variant="body1">
                  <strong>Price:</strong> ₹{product.price}
                </Typography>
              </Grid2>
            </Grid2>
          </Paper>
        ))}

        {/* ✅ Order Total */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" fontWeight="bold">
          Total Price: ₹{order.totalPrice}
        </Typography>
      </Paper>
    </Container>
  );
};

export default OrderDetails;
