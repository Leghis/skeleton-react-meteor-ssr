import React, {lazy} from "react";
import {renderToString} from "react-dom/server";
import {onPageLoad} from "meteor/server-render";
import fetch from "cross-fetch";
import {App} from "../imports/ui/App";
import {Helmet} from 'react-helmet'
import {getDataFromTree} from "@apollo/client/react/ssr";
import {
  ApolloClient, ApolloProvider, createHttpLink, gql, InMemoryCache, useQuery
} from '@apollo/client';
import {StaticRouter} from "react-router-dom";

//Initial state
 let initialState

onPageLoad(async (sink) => {

  //Configuration of the context with the different parameters related to the ssr
  const context = {
    client: new ApolloClient({
      ssrMode: true, link: createHttpLink({
        uri: 'http://localhost:4000', credentials: 'same-origin', headers: {
          // cookie: req.header('Cookie'),
        }, fetch
      }), cache: new InMemoryCache(),
    }),
  };

  //React tree rendering, dcomponent rendering via static routes
  const Home = () =>(
    <ApolloProvider client={context.client}>
      <StaticRouter location={sink.request.url}>
        <App/>
      </StaticRouter>
    </ApolloProvider>
  );

  //Use of getDataFromTree to retrieve data from our query
  //Graphql executing on our different components
  await getDataFromTree(Home()).then((content) => {
    // Extract the entirety of the Apollo Client cache's current state
    initialState = context.client.extract()
  });


  //Render page in ssr mode
  sink.renderIntoElementById('react-target', renderToString(Home));

  const helmet = Helmet.renderStatic()
  sink.appendToHead(helmet.meta.toString())
  sink.appendToHead(helmet.title.toString())

  sink.appendToBody(`
    <script id="preloaded-state">
        window.__APOLLO_STATE__= ${JSON.stringify(initialState)};
    </script>
  `)
});


