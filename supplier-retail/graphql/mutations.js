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
export const UPDATE_ITEM_MUTATION = gql`
  mutation updateItem($price: Int!, $name: String!, $item_id: uuid!) {
    update_items(
      where: { id: { _eq: $item_id } }
      _set: { price: $price, name: $name }
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
        read
        item {
          id
          name
          price
        }
      }
    }
  }
`;

export const UPDATE_ORDER_MUTATION = gql`
  mutation updateOrder($order_Id: uuid!) {
    update_orders(
      where: { id: { _eq: $order_Id} }
      _set: { read: true }

    ) {
      returning {
        id
        receipt
        amount
        read
        item {
          id
          name
          price
        }
      }
    }
  }
`;

export const UPDATE_DEAL_MUTATION = gql`
  mutation updateDeal(
    $upvoted: Boolean!
    $dealId: uuid!
    $userId: String!
  ) {
    update_user_deal(
      where: { dealId: { _eq: $dealId }, userId: { _eq: $userId } }
      _set: { upvoted: $upvoted }
    ) {
      returning {
        upvoted
        userId
        id
      }
    }
  }
`;
