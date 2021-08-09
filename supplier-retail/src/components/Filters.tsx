import { Box, Text, Stack, CheckboxGroup,Flex, Spinner, Checkbox} from '@chakra-ui/react';
import { useCategories } from "../../graphql/hooks";
import React, { useState } from "react";
import { useSearch } from "../utils/search";



const Filters = (props) => {

    const { data, loading } = useCategories();
    const allCategories = data ? data.categories : [];
      const [alcoholTypeFilters, setAlcoholTypeFilters] = useState([
        "BEER",
        "WINE",
        "LIQUOR",
        "FOOD",
      ]);
      const onFilter =()=>{
        console.log('oneda')
        return 1

      }


    return (
      <Stack spacing={8} mb={8} p="6" {...props}>
        <Box>
          <Text mb={2} fontWeight="bold">
            {"Item Type"}
          </Text>

          {loading ? (
            <Flex pt={24} align="center" justify="center">
              <Spinner
                size="xl"
                label="
              Loading items"
              />
            </Flex>
          ) : (
            <>
              <Flex direction="column">
                <CheckboxGroup
                  onChange={onFilter}
                  spacing={2}
                  variantColor="teal"
                  value={alcoholTypeFilters}
                >
                  {allCategories.length ? (
                    allCategories.map((category) => (
                      <Checkbox value={category.name}>{category.name}</Checkbox>
                    ))
                  ) : (
                    <Text>no categories</Text>
                  )}
                </CheckboxGroup>
              </Flex>
              <Box>
                <Text mb={2} fontWeight="bold">
                  {"Deal Type"}
                </Text>
                <CheckboxGroup
                  onChange={onFilter}
                  spacing={2}
                  variantColor="teal"
                  value={alcoholTypeFilters}
                >
                  <Checkbox value="BEER">Beer</Checkbox>
                  <Checkbox value="WINE">Wine</Checkbox>
                  <Checkbox value="LIQUOR">Liquor</Checkbox>
                  <Checkbox value="FOOD">Food</Checkbox>
                </CheckboxGroup>
              </Box>
            </>
          )}
        </Box>
      </Stack>
    );
};

export default Filters;
