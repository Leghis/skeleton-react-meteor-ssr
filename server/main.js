import React from "react";
import {renderToString} from "react-dom/server";
import {onPageLoad} from "meteor/server-render";
import fetch from 'cross-fetch';
import {App} from "../imports/ui/App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider, HttpLink
} from "@apollo/client";


onPageLoad(sink => {
  const cache = new InMemoryCache();
  const context = {
    client: new ApolloClient({
      link: new HttpLink({uri: 'http://localhost:4000', fetch}),
      cache
    })
  };
  sink.renderIntoElementById("app", renderToString(
    <ApolloProvider client={context.client}>
      <App location={sink.request.url}/>
    </ApolloProvider>
  ));
});
