import React from "react";
import App from "../components/App";
import { withApollo } from "../../graphql/apollo";
import { GET_MY_ORDERS_QUERY } from "../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { useUser } from "@auth0/nextjs-auth0";
import { Text, Flex, Spinner } from "@chakra-ui/react";
import OrderRetail from "../components/OrderRetail"

interface Props{}
const orders: React.FC<Props> = () => {
  const { user, error, isLoading } = useUser();
  const user_Id = user ? user.sub : [];
  const { data, loading } = useQuery(GET_MY_ORDERS_QUERY, {
    variables: { user_id: user_Id },
  });
  const allOrders = data ? data.orders : [];
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <App>
      <Text mb={2} fontSize="sm">
        <b>{"Outbox"}</b>
      </Text>
      {loading ? (
        <Flex pt={24} align="center" justify="center">
          <Spinner size="xl" label="Loading outbox" />
        </Flex>
      ) : (
        <>
          {allOrders.length ? (
            allOrders.map((order) => (<OrderRetail order ={order}/>

            ))
          ) : (
            <Text>no items</Text>
          )}
          <Flex justify="flex-end" as="i" color="gray.500">
            {`Showing ${allOrders.length} out of ${allOrders.length} items `}
          </Flex>
        </>
      )}
    </App>
  );
};

export default withApollo(orders, {
  ssr: false,
});
