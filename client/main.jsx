import React from "react";
import { onPageLoad } from "meteor/server-render";
import { App } from '/imports/ui/App';
import {renderToString} from "react-dom/server";

onPageLoad(sink => {
  sink.renderIntoElementById("react-target", renderToString(
    <App />
  ))
})





// import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { render } from 'react-dom';
// import { App } from '/imports/ui/App';
//
// Meteor.startup(() => {
//   render(<App/>, document.getElementById('react-target'));
// });
