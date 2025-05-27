import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://node-graphql-server-mu.vercel.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
