import React from "react";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";

import AddBook from "./components/AddBook";
import ReadBooks from "./components/ReadBooks";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export default function App() {
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <div>
          <h2>My First Apollo Client</h2>
          <AddBook />
          <hr />
          <h2>Book List</h2>
          <ReadBooks />
        </div>
      </ApolloProvider>
    </div>
  );
}
