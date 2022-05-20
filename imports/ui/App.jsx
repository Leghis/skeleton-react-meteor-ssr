import React from 'react';
import {useSelector} from "react-redux";

export function App(props){
  const dataContact = useSelector(state => state)
  console.log(dataContact)

  return(
    <div>
      <h1>Welcome to Meteor!</h1>
      <div>
        {props.dataContacts ? (<h1>true</h1>):(<h1>false</h1>)}
      </div>
    </div>
  );
}
