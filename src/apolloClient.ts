import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "https://node-graphql-server-mu.vercel.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
