import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      username
      createdAt
      token
    }
  }
`;
