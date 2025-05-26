import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apolloClient";

const ApolloAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloAppProvider;
