import {gql} from '@apollo/client'
export const SIGNUP_USER = gql`
    mutation createUser($userNew:UserInput!){
        user:signupUser(userNew:$userNew){ 
           firstName
        }
    }
`
export const LOGIN_USER = gql`
mutation SigninUser($userSignin:UserSigninInput!){
    user:signinUser(userSignin:$userSignin){ 
      token
    }
  }
`

export const CREATE_TASK = gql`
  mutation createTask($name:String!){
    task:createTask(name:$name)
  }
`

export const DELETE_TASK  = gql`
  mutation deleteTask($_id:ID!){
    task:deleteTask(_id:$_id)
  }
`

export const UPDATE_TASK  = gql`
  mutation updateTask($_id:ID!){
    task:updateTask(_id:$_id)
  }
`