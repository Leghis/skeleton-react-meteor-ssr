import React from "react";
import {renderToString} from "react-dom/server";
import {onPageLoad} from "meteor/server-render";
import fetch from "cross-fetch";
import {App} from "../imports/ui/App";
import { SchemaLink } from '@apollo/client/link/schema';
import {
  ApolloClient, ApolloProvider,
  createHttpLink, gql,
  InMemoryCache, useQuery
} from '@apollo/client';
import {Route, Switch, StaticRouter} from "react-router-dom";

onPageLoad(sink => {
  //Configuration of the context with the different parameters related to the ssr
  const context = {
    client: new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: 'http://localhost:4000',
        credentials: 'same-origin',
        headers: {
          // cookie: req.header('Cookie'),
        },
        fetch
      }),
      cache: new InMemoryCache(),
    }),
  };

  const Home = props => (
    <ApolloProvider client={context.client}>
      <StaticRouter location={props.location}>
        <Switch>
          <Route exact path='/' component={App}/>
        </Switch>
      </StaticRouter>
    </ApolloProvider>
  );

  //Render page in ssr mode
  sink.renderIntoElementById('react-target', renderToString(
    <Home location={sink.request.url}/>
  ));
});

if (Meteor.isServer) {
  Meteor.startup(function () {
  })
}

