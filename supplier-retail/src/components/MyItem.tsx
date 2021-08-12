import React from 'react'
import { Box, Heading, Text, Flex, Spacer } from "@chakra-ui/layout";
import { AtSignIcon } from "@chakra-ui/icons";
import { ItemProps } from "../components/ItemSingle";
import  EditItem  from "../components/EditItem";


const MyItem: React.FC<{ item: ItemProps }> = ({ item }) => {
  return (
    <Box
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "dark-lg",
      }}
      borderWidth="1px"
      borderRadius={8}
      mb={2}
      p={8}
      shadow="md"
      margin={2}
    >
      <Flex justify="center" align="center" wrap="wrap" grow={1}>
        <Heading fontSize="md" mr={4}>
          {item.name.toLowerCase()}
        </Heading>
        {/* <Spacer /> */}
        <AtSignIcon color="teal" />
        <Text> Ksh{item.price} </Text>
        <Spacer />
      <EditItem item={item}/>
      </Flex>
    </Box>
  );
};

export default MyItem;
