import React from "react";
import {renderToString} from "react-dom/server";
import {onPageLoad} from "meteor/server-render";
import fetch from "cross-fetch";
import {App} from "../imports/ui/App";
import {object} from 'prop-types';
import {applyMiddleware, createStore} from 'redux';
import Reducers from "../imports/Reducer";
import {Helmet} from 'react-helmet'
import {Provider} from "react-redux";
import {SchemaLink} from '@apollo/client/link/schema';
import {
  ApolloClient, ApolloProvider, createHttpLink, gql, InMemoryCache, useQuery
} from '@apollo/client';
import {Route, Switch, StaticRouter} from "react-router-dom";
import thunk from "redux-thunk";

//Define le store redux
let store = createStore(Reducers)
let initialData = null

onPageLoad(sink => {
  //Configuration of the context with the different parameters related to the ssr
  const context = {
    client: new ApolloClient({
      ssrMode: true, link: createHttpLink({
        uri: 'http://localhost:4000', credentials: 'same-origin', headers: {
          // cookie: req.header('Cookie'),
        }, fetch
      }), cache: new InMemoryCache(),
    }), store: store
  };

  const Home = props => (<Provider store={context.store}>
      <ApolloProvider client={context.client}>
        <StaticRouter location={sink.request.url}>
          {/*<Route  exact path='/' component=<App dataContact={initialData}/>}/>*/}
          <App/>
        </StaticRouter>
      </ApolloProvider>
    </Provider>
  );


  //Render page in ssr mode
  sink.renderIntoElementById('react-target', renderToString(<Home location={sink.request.url}/>));

  const helmet = Helmet.renderStatic()
  sink.appendToHead(helmet.meta.toString())
  sink.appendToHead(helmet.title.toString())

  sink.appendToBody (`
        <script id="preloaded-state">
            window.__PRELOADED_STATE__ = ${JSON.stringify(initialData).replace(/</g, '\\u003c')}
         </script>
        `)
});

// //Launching a subscription once the dispatch has been executed
// store.subscribe(() => {
//   initialData = store.getState()
//   console.log(initialData)
//
// })
//
// //Use of dispatch to launch the contact recovery action
// store.dispatch({type: 'GET_CONTACTS'})

