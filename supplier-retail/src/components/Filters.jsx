import { Box, Text, Stack, CheckboxGroup,Flex, Spinner, Checkbox} from '@chakra-ui/react';
import { useCategories } from "../../graphql/hooks";
import React, { useState } from "react";
import { useSearch } from "../utils/search";




const Filters = (props) => {
  const {
    categoryFilter,
    onFilterCategoryType,
  } = useSearch();

    const { data, loading } = useCategories();
    const allCategories = data ? data.categories : [];

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
                  spacing={2}
                  variantColor="teal"
                  onChange={onFilterCategoryType}
                  defaultValue={[
                    "food",
                    "hardware",
                    "textile",
                    "electronics",
                    "drinks",
                  ]}
                  value={categoryFilter}
                >
                  {allCategories.length ? (
                    allCategories.map((category) => (
                      <Checkbox key={category.id} value={category.name}>
                        {category.name}
                      </Checkbox>
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
