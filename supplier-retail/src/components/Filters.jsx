import { Box, Text, Stack, CheckboxGroup,Flex, Spinner, Checkbox} from '@chakra-ui/react';
import { useCategories } from "../../graphql/hooks";
import React, { useState } from "react";




const Filters = (props) => {

    const { data, loading } = useCategories();
    const allCategories = data ? data.categories : [];

      const [alcoholTypeFilters, setAlcoholTypeFilters] =
        useState(allCategories);
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
            </>
          )}
        </Box>
      </Stack>
    );
};

export default Filters;
