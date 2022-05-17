import React from "react";
import { renderToString } from "react-dom/server";
import { onPageLoad } from "meteor/server-render";

import { App } from "../imports/ui/App";

onPageLoad(sink => {
  sink.renderIntoElementById("app", renderToString(
    <App location={sink.request.url} />
  ));
});









// import { Meteor } from 'meteor/meteor';
// import { LinksCollection } from '/imports/api/links';
//
// function insertLink({ title, url }) {
//   LinksCollection.insert({title, url, createdAt: new Date()});
// }

// Meteor.startup(() => {
//   // If the Links collection is empty, add some data.
//   if (LinksCollection.find().count() === 0) {
//     insertLink({
//       title: 'Do the Tutorial',
//       url: 'https://www.meteor.com/tutorials/react/creating-an-app'
//     });
//
//     insertLink({
//       title: 'Follow the Guide',
//       url: 'http://guide.meteor.com'
//     });
//
//     insertLink({
//       title: 'Read the Docs',
//       url: 'https://docs.meteor.com'
//     });
//
//     insertLink({
//       title: 'Discussions',
//       url: 'https://forums.meteor.com'
//     });
//   }
// });
