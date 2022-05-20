import React from "react";
import {onPageLoad} from "meteor/server-render";
import {App} from '/imports/ui/App';
import {renderToString} from "react-dom/server";
import {applyMiddleware, createStore} from 'redux';
import Reducers from "../imports/Reducer";
import {Provider} from "react-redux";

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
import thunk from "redux-thunk";

//connecting the Graphql client to the Apollo server
// const client = new ApolloClient({
//   link: new HttpLink({uri: 'http://localhost:4000', fetch}),
//   cache : new InMemoryCache()
// })

//Define le store redux
const store = createStore(Reducers);


const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  ssrForceFetchDelay: 100,
});


onPageLoad(() => {
  ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/" component={App}/>
          </Switch>
        </Router>
      </ApolloProvider>
    </Provider>, document.getElementById('react-target'));
});
