import {gql} from '@apollo/client'

export const GET_MY_PROFILE = gql`
  query getMyProfile{
    user:myprofile{
      _id
      firstName
      lastName
      email
      tasks{
      _id
        name
        by
        completed
        completedTime
        creationTime
      }
    } 
  }

`



