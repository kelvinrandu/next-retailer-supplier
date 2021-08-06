import React, { ReactNode, useState } from "react";
import {  Text, Flex, Spinner ,Box } from "@chakra-ui/react";
import { useItems } from "../../graphql/hooks";
import { withApollo } from "../../graphql/apollo";
import AllItems from "../components/newapp/AllItems";

import App from "../components/App";

const dashboard2 = () => {
    const { data, loading } = useItems();
    // const allItems = data ? data.items : [];
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
        <AllItems/>
      )}
    </App>
  );
};

export default withApollo(dashboard2, {
  ssr: false,
});
