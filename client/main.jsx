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

//connecting the Graphql client to the Apollo server
// const client = new ApolloClient({
//   link: new HttpLink({uri: 'http://localhost:4000', fetch}),
//   cache : new InMemoryCache()
// })

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  ssrForceFetchDelay: 100,
});

onPageLoad(sink => {
  sink.renderIntoElementById("react-target", renderToString(
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={App}/>
        </Switch>
      </Router>
    </ApolloProvider>
  ))
})


// if (Meteor.isClient) {
//   // subscribe by name to the publication.
//   Meteor.startup(function () {
//     // Meteor.subscribe('todos');
//     let data = Meteor.subscribe('load-data',{
//       onReady: function () {
//         console.log('ready')
//       },
//
//       onStop: function () {
//         console.log('stop')
//       }
//     })
//
//     console.log()
//   })
// }
