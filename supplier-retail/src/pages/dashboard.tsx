import React, { useEffect, useState } from "react";
import { Text, Flex, Spinner } from "@chakra-ui/react";
import { useItems } from "../../graphql/hooks";
import { withApollo } from "../../graphql/apollo";
import { useUser } from "@auth0/nextjs-auth0";
import App from "../components/App";
import ItemSingle from "../components/ItemSingle";
import SearchBar from "../components/SearchBar";

interface Props{}
const dashboard: React.FC<Props> = () => {
  const { data, loading } = useItems();
  const allItems = data ? data.items : [];
  const [filteredItems, setFilteredItems] = useState(allItems);
  const { error, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    updateInput("");
  }, [allItems]);
  
  const updateInput = async (input) => {
    const filtered = allItems.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setSearchQuery(input);
    setFilteredItems(filtered);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <App>
      <Text mb={2} fontSize="sm">
        {"Active "}
        <b>{"Items"}</b>
      </Text>
      <SearchBar searchQuery={searchQuery} updateInput={updateInput} />

      {loading ? (
        <Flex pt={24} align="center" justify="center">
          <Spinner size="xl" label="Loading items" />
        </Flex>
      ) : (
        <>
          {filteredItems.length ? (
            filteredItems.map((item) => <ItemSingle item={item} />)
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

export default withApollo(dashboard, {
  ssr: false,
});
