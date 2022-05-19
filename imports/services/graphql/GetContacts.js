import {gql, useQuery} from "@apollo/client";

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

const GetContacts = () => {
    const { loading, error, data } = useQuery(getAll,{pollInterval: 500,})

    return {
        LoadingContacts : loading,
        ErrorGetContacts : error,
        DataGetContacts : data
    }
}

export default GetContacts
