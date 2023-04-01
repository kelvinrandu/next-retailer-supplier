import React, { useEffect, useState } from "react";
import { Text, Flex, Spinner } from "@chakra-ui/react";
import { useItems } from "../../graphql/hooks";
import { withApollo } from "../../graphql/apollo";
import { useUser } from "@auth0/nextjs-auth0";
import App from "../components/App";
import ItemSingle from "../components/ItemSingle";
import SearchBar from "../components/SearchBar";
import EmptySearch from "../components/EmptySearch";
import { useSearch } from "../utils/search";

interface Props {}
const dashboard: React.FC<Props> = () => {
  const { data, loading } = useItems();
  console.log('data -->',data)
  const allItems = data ? data.items : [];
  const { categoryFilter, search, onSearch } = useSearch();
  const matchesSearch = (item) =>
    item.name.toLowerCase().includes(search.toLowerCase());
  const matchesAlcoholType = (item) =>
    categoryFilter.includes(item.category.name);
  const filteredItems = allItems
    .filter(matchesSearch)
    .filter(matchesAlcoholType);

  const { error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <App>
      <Text mb={2} fontSize="sm">
        {"Active "}
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
            filteredItems.map((item) => <ItemSingle item={item} />)
          ) : (
            <EmptySearch />
          )}
          <Flex justify="flex-end" as="i" color="gray.500">
            {`Showing ${filteredItems.length} out of ${allItems.length} items `}
          </Flex>
        </>
      )}
    </App>
  );
};

export default withApollo(dashboard, {
  ssr: false,
});
