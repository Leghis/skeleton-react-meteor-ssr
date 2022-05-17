import React from "react";
import {onPageLoad} from "meteor/server-render";
import {App} from '/imports/ui/App';
import {renderToString} from "react-dom/server";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider, HttpLink
} from "@apollo/client";

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/',
//   cache: new InMemoryCache()
// });

//connecting the Graphql client to the Apollo server
const cache = new InMemoryCache();
let client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:4000', fetch}),
  cache
})

onPageLoad(sink => {
  sink.renderIntoElementById("react-target", renderToString(
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  ))
})
