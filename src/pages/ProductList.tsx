import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import {
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import Grid2 from "@mui/material/Grid"; // ✅ Using Grid2

export interface Item {
  id: string;
  title: string;
  description: string;
  stock: number;
  price: number;
  images: string[];
}

const ProductList: React.FC = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const inventoryItems = data?.products || [];

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error fetching inventory</Typography>;

  return (
    <Container sx={{ marginTop: 4 }}>
      {/* ✅ Title spans full width */}
      <Typography variant="h4" gutterBottom textAlign="left">
        Products
      </Typography>

      {/* ✅ Grid Layout - 3 Cards Per Row */}
      <Grid2 container spacing={3} justifyContent="center">
        {inventoryItems.map((item: Item) => (
          <Grid2 sx={{ width: "340px" }} key={item.id}>
            <Card sx={{ maxWidth: 340, borderRadius: 2, boxShadow: 3 }}>
              {/* ✅ Display Product Image */}
              <CardMedia
                component="img"
                sx={{
                  width: 160, // ✅ Fixed width
                  height: 160, // ✅ Fixed height
                  objectFit: "cover", // ✅ Ensures aspect ratio while filling space
                  borderRadius: 2, // ✅ Adds rounded corners for a sleeker look
                }}
                image={item.images?.[0] || "https://via.placeholder.com/150"}
                alt={item.title}
              />
              <CardContent sx={{ padding: 2 }}>
                {/* ✅ Title with Ellipsis */}
                <Typography
                  variant="h6"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </Typography>

                {/* ✅ Description with Ellipsis */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.description}
                </Typography>

                {/* ✅ Stock & Price */}
                <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                  ₹{item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In Stock: {item.stock}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default ProductList;
