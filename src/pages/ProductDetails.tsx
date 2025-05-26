import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
} from "@mui/material";

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      _id
      title
      description
      images
      price
      stock
    }
  }
`;

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id } });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching product details.</Typography>;

  const product = data.product || {};

  return (
    <Container>
      <Card>
        ß
        <CardMedia
          component="img"
          height="200"
          image={product.images[0]}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="h5">{product.title}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h6">Price: ${product.price}</Typography>
          <Typography variant="body2">Stock: {product.stock}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
