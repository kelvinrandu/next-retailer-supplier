import React, { ReactNode, useState } from "react";
import { Collapse } from "@chakra-ui/react";
import { Box, Heading, Text, Flex, Spacer } from "@chakra-ui/layout";
import { TriangleDownIcon, TriangleUpIcon, AtSignIcon } from "@chakra-ui/icons";
import ItemDetail from "../components/ItemDetail";

export type ItemProps = {
  id: number;
  name: string;
  price: number;
  user: {
    name: string;
    email: string;
    auth0_id: string;
  };
  category: {
    name: string;
    description: string;
  };
};


const ItemSingle: React.FC<{ item: ItemProps }> = ({ item }) => {
  const [itemDetail, setItemDetail] = useState(false);

  function ItemDetailHandler() {
    setItemDetail(!itemDetail);
  }
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
        <Box
          as="button"
          alignSelf="right"
          float="right"
          onClick={() => ItemDetailHandler()}
        >
          {itemDetail ? (
            <TriangleUpIcon color="red" boxSize={6} />
          ) : (
            <TriangleDownIcon color="teal" boxSize={6} />
          )}
        </Box>
      </Flex>
      {itemDetail && (
        <Collapse in={itemDetail} animateOpacity style={{ zIndex: 10 }}>
          <ItemDetail item={item} ItemDetailHandler={ItemDetailHandler} />
        </Collapse>
      )}
    </Box>
  );
};

export default ItemSingle;
