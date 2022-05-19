import GetContacts from "../imports/services/graphql/GetContacts";
import {gql, useQuery} from "@apollo/client";

Meteor.methods({
  insertMessage() {
    const getAll = gql`
      query GetContacts {
        getContacts {
          _id
          surname
          name
          email
          phone
          town
          region
          box
          country
          comment1
          comment2
        }
      }`
    const { loading, error, data } = useQuery(getAll);
    if(data) return data
  }
});
