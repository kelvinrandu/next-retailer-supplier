import gql from 'graphql-tag';

export const CREATE_ITEM_MUTATION = gql`
  mutation createItem(
    $name: String!
    $price: Int!
    $user_id: String!
    $category_id: uuid!
    $amount: Int!
  ) {
    insert_items(
      objects: {
        name: $name
        price: $price
        amount: $amount
        user_id: $user_id
        category_id: $category_id
      }
    ) {
      returning {
        id
        name
        price
        amount
        user {
          name
          email
        }
        category {
          id
          name
          description
        }

      }
    }
  }
`;
export const CREATE_ORDERS_MUTATION = gql`
  mutation createOrder(
    $amount: Int!
    $item_id: uuid!
    $total_price: Int!
    $to: String!
    $from: String!
  ) {
    insert_orders(
      objects: {
        total_price: $total_price
        amount: $amount
        to: $to
        from: $from
        item_id: $item_id
      }
    ) {
      returning {
        id
        receipt
        amount
        item {
          id
          name
          price
        }
      }
    }
  }
`;
export const UPDATE_USER_DEAL_MUTATION = gql`
    mutation updateUserDeal($upvoted: Boolean!, $dealId: uuid!, $userId: String!) {
        update_user_deal(where: {dealId: {_eq: $dealId}, userId: {_eq: $userId}}, _set: {upvoted: $upvoted}) {
            returning {
                upvoted
                userId
                id
            }
        }
    }
`;

export const INSERT_USER_DEAL_MUTATION = gql`
    mutation insertUserDeal($upvoted: Boolean!, $dealId: uuid!, $userId: String!) {
        insert_user_deal(objects: {upvoted: $upvoted, dealId: $dealId, userId: $userId}) {
            returning {
                upvoted
                userId
                id
            }
        }
    }
`;
