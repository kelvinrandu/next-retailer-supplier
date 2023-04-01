import gql from 'graphql-tag';

export  const GET_ITEMS_QUERY = gql`
  query getItems {
    items(where: { is_published: { _eq: true} }) {
      id
      name
      price
      user 
      category 
    }
  }
`;
export const GET_MY_ITEMS_QUERY = gql`
  query getMyItems($user_id: String!) {
    items(where: { user_id: { _eq: $user_id} }) {
      id
      name
      price
      category {
        id
        name
      }
    }
  }
`;

export const GET_CATEGORIES_QUERY = gql`
    query {
        categories {
            id
            name
    
        }
    }
`;

export const GET_ORDERS_QUERY = gql`
  query {
    orders {
      id
      receipt
      total_price
      amount
      user {
        name
        email
      }
      userByTo{
        name
        email
      }
      item {
        id
        name
        price
      }
    }
  }
`;
export const GET_MY_ORDERS_QUERY = gql`
  query ($user_id: String!) {
    orders(where: { from: { _eq: $user_id } }) {
      id
      receipt
      total_price
      amount
      read
      user {
        name
        email
      }
      userByTo {
        name
        email
      }
      item {
        id
        name
        price
      }
    }
  }
`;
export const GET_ORDERS_FOR_ME_QUERY = gql`
  query ($user_id: String!) {
    orders(where: { to: { _eq: $user_id } }) {
      id
      receipt
      total_price
      amount
      read
      user {
        name
        email
      }
      userByTo {
        name
        email
      }
      item {
        id
        name
        price
      }
    }
  }
`;
export const GET_UNREAD_ORDERS_FOR_ME_QUERY = gql`
  query ($user_id: String!) {
    orders(where: { to: { _eq: $user_id } , read: {_eq: false} }) {
      id
      receipt
      total_price
      amount
      read
      user {
        name
        email
      }
      userByTo {
        name
        email
      }
      item {
        id
        name
        price
      }
    }
  }
`;