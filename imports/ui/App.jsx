import React from 'react';
import GetContacts from "../services/graphql/GetContacts";
export function App(props){
  GetContacts()
  if (typeof window !== 'undefined') {
    //here `window` is available
    console.log(window.__APOLLO_STATE__)
  }
  return(
    <div>
      <h1>Welcome to Meteor!</h1>
    </div>
  );
}
