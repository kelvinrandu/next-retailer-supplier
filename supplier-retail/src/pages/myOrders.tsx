import React from 'react'
import App from "../components/App";
import { GET_MY_ORDERS_QUERY } from "../../graphql/queries";
import { withApollo } from "../../graphql/apollo";
import { useQuery } from "@apollo/react-hooks";
import { useUser } from "@auth0/nextjs-auth0";
import { Text, Flex, Spinner } from "@chakra-ui/react";

const myOrders = () => {
      const { user, error, isLoading } = useUser();
      const user_id = "google-oauth2|106706096066760521681";
      const { data, loading } = useQuery(GET_MY_ORDERS_QUERY, {
        variables: { user_id },
      });
      const allOrders = data ? data.orders : [];
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>{error.message}</div>;
    return (
      <App>
        <Text mb={2} fontSize="sm">
          {"Orders for "}
          <b>{"Moir"}</b>
        </Text>
        {loading ? (
          <Flex pt={24} align="center" justify="center">
            <Spinner size="xl" label="Loading items" />
          </Flex>
        ) : (
          <>
            {allOrders.length ? (
              allOrders.map(({ id, receipt }) => (
                <Text>
                  {id}:{receipt}
                </Text>
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
}


export default withApollo(myOrders, {
  ssr: false,
});
