import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      products {
        id
        title
        description
        images
        quantity
        price
      }
      orderNumber
      status
      totalPrice
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: ID!) {
    getOrderById(id: $id) {
      id
      products {
        id
        title
        description
        images
        quantity
        price
      }
      orderNumber
      status
      totalPrice
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      description
      images
      price
      stock
    }
  }
`;
