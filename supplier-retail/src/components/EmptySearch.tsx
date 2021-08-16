import { useColorMode, Stack, Text, Flex,Icon } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import React from "react";

const EmptySearch = (props) => {
  const { colorMode } = useColorMode();

  return (
    <Flex justify="center" textAlign="center" mb={8} py={12}>
      <Stack align="center">
        <Icon as={Search2Icon} name="search" size="64px" color="gray.500" />
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          No Items Found
        </Text>
       
      </Stack>
    </Flex>
  );
};

export default EmptySearch;
