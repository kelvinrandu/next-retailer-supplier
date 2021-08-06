import React, { ReactNode, useState } from "react";
import { Text, Flex, Spinner, Box, Image } from "@chakra-ui/react";
import { useItems, useCategories } from "../../graphql/hooks";
import { withApollo } from "../../graphql/apollo";
import { useUser } from "@auth0/nextjs-auth0";

import App from "../components/App";

const dashboard2 = () => {
  const { data, loading } = useItems();

  const allItems = data ? data.items : [];
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <App>
      <Text mb={2} fontSize="sm">
        {"Active "}
        <b>{"Items"}</b>
      </Text>

      {loading ? (
        <Flex pt={24} align="center" justify="center">
          <Spinner size="xl" label="Loading items" />
        </Flex>
      ) : (
        <>
          {allItems.length ? (
            allItems.map((item) => <Text key={item.id}>{item.name}</Text>)
          ) : (
            <Text>no items</Text>
          )}
        </>
      )}
    </App>
  );
};

export default withApollo(dashboard2, {
  ssr: false,
});
