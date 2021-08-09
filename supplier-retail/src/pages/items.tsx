import React from 'react'
import App from "../components/App";
import { Text } from "@chakra-ui/react";
import { withApollo } from "../../graphql/apollo";

const items = () => {
  return (
    <App>
      <Text mb={2} fontSize="sm">
        {"Active "}
        <b>{"Items"}</b>
      </Text>
    </App>
  );
}

export default withApollo(items, {
  ssr: false,
});


