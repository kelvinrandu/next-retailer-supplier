
import React, { ReactNode, useState } from "react";
import {  Text, Flex, Spinner ,Box } from "@chakra-ui/react";
import { useItems } from "../../../graphql/hooks";
import {TriangleDownIcon,TriangleUpIcon,AtSignIcon} from "@chakra-ui/icons";
import { withApollo } from "../../../graphql/apollo";
// import item from "../../pages/api/item";

function AllItems() {
    const { data, loading } = useItems();
    const allItems = data ? data.items : [];
    return (
            <>
            {allItems.length ? (
              allItems.map((item) => <Box 
              _hover={{
                transform: "translateY(-3px)",
                boxShadow: "dark-lg",
              }}
              borderWidth="1px" h="10vh" m={2} p={5} borderRadius="md" key={item.id}>
                <Flex>
                <Box>{item.name}</Box>
            <Box ml="10px"><AtSignIcon color="teal"/> Ksh: {item.price}</Box>
            <Box ml="auto" mr="10px" color="teal"><TriangleDownIcon/></Box>
                </Flex>
          
            
            </Box>)
            ) : (
              <Text>no items</Text>
            )}
          </>
          
     
          
        
    );
    
};
export default AllItems;
