import React, { useEffect, useState } from "react";
import App from "../components/App";
import { Text, Flex, Spinner } from "@chakra-ui/react";
import { withApollo } from "../../graphql/apollo";
import { GET_MY_ITEMS_QUERY } from "../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { useUser } from "@auth0/nextjs-auth0";
import SearchBar from "../components/SearchBar";
import ItemSingle from "../components/ItemSingle";
import { useSearch } from "../utils/search";


interface Props {}
const items: React.FC<Props> = () => {
  const { user, error, isLoading } = useUser();
  const user_Id = user ? user.sub : [];
  const { data, loading } = useQuery(GET_MY_ITEMS_QUERY, {
    variables: { user_id: user_Id },
  });

  const allItems = data ? data.items : [];
  const { categoryFilter, search, onSearch } = useSearch();
  const matchesSearch = (item) =>
    item.name.toLowerCase().includes(search.toLowerCase());
  const matchesAlcoholType = (item) =>
    categoryFilter.includes(item.category.name);
  const filteredItems = allItems
    .filter(matchesSearch)
    .filter(matchesAlcoholType);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <App>
      <Text mb={2} fontSize="sm">
        {"My "}
        <b>{"Items"}</b>
      </Text>
      <SearchBar search={search} onSearch={onSearch} />

      {loading ? (
        <Flex pt={24} align="center" justify="center">
          <Spinner size="xl" label="Loading items" />
        </Flex>
      ) : (
        <>
          {filteredItems.length ? (
            filteredItems.map((item) => (
              <ItemSingle myItem={true} item={item} />
            ))
          ) : (
            <Text>no items</Text>
          )}
          <Flex justify="flex-end" as="i" color="gray.500">
            {`Showing ${filteredItems.length} out of ${allItems.length} items `}
          </Flex>
        </>
      )}
    </App>
  );
};

export default withApollo(items, {
  ssr: false,
});
