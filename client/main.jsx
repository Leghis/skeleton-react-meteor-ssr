import React from "react";
import {onPageLoad} from "meteor/server-render";
import {App} from '/imports/ui/App';
import {renderToString} from "react-dom/server";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider, HttpLink
} from "@apollo/client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ReactDOM from "react-dom";


//Configuring the Apollo Client
export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  ssrForceFetchDelay: 100,
});


onPageLoad(() => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={App}/>
        </Switch>
      </Router>
    </ApolloProvider>,
    document.getElementById('react-target'));
});
