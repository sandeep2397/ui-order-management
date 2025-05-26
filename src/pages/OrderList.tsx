import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../graphql/queries";
import {
  CircularProgress,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PendingIcon from "@mui/icons-material/HourglassEmpty";
import InTransitIcon from "@mui/icons-material/LocalShipping";
import CompletedIcon from "@mui/icons-material/CheckCircle";

const OrderList: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ORDERS);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <PendingIcon sx={{ color: "orange", marginRight: "8px" }} />;
      case "in transit":
        return <InTransitIcon sx={{ color: "blue", marginRight: "8px" }} />;
      case "completed":
        return <CompletedIcon sx={{ color: "green", marginRight: "8px" }} />;
      default:
        return null;
    }
  };

  const statusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "orange";
      case "in transit":
        return "blue";
      case "completed":
        return "green";
      default:
        return "gray";
    }
  };

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error fetching orders</Typography>;

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom textAlign="left">
        Your Orders
      </Typography>

      {data.orders?.map((order: any, index: number) => {
        const totalQuantity = order.products.reduce(
          (sum: number, product: any) => sum + product.quantity,
          0
        );

        return (
          <Accordion
            key={order.id}
            defaultExpanded={index === 0}
            sx={{ marginBottom: "16px", borderRadius: "8px", boxShadow: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ padding: "12px 24px" }}
            >
              <Typography variant="h6">
                <Link
                  href={`/orders/${order.id}`}
                  underline="hover"
                  color="primary"
                >
                  {order.orderNumber}
                </Link>
              </Typography>

              <Box sx={{ display: "flex", gap: "24px", marginLeft: "16px" }}>
                <Typography
                  sx={{ color: "green", fontWeight: "bold", fontSize: "18px" }}
                >
                  ₹{order.totalPrice}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontWeight: "medium",
                    fontSize: "14px",
                  }}
                >
                  Quantity: {totalQuantity}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontWeight: "medium",
                    fontSize: "14px",
                  }}
                >
                  Products: {order?.products?.length}
                </Typography>

                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: statusColor(order.status),
                  }}
                >
                  {getStatusIcon(order.status)}
                  {order.status}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                backgroundColor: "#f9f9f9",
                padding: "16px",
                borderRadius: "4px",
              }}
            >
              <List>
                {order.products.map((product: any) => (
                  <ListItem
                    key={product.id}
                    sx={{
                      marginBottom: "8px",
                      padding: "12px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {/* ✅ Display product image */}
                    <CardMedia
                      component="img"
                      sx={{
                        width: 100,
                        height: 100,
                        marginRight: 2,
                        borderRadius: 2,
                      }}
                      image={
                        product.images?.[0] || "https://via.placeholder.com/100"
                      }
                      alt={product.title}
                    />
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight="bold">
                          {product.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {product.quantity} | ₹{product.price}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default OrderList;
