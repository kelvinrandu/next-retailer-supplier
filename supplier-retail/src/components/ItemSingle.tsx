import React from "react";
import { useState } from "react";
import { Box, Heading, Text, Flex, Spacer} from "@chakra-ui/layout";
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react";
import ItemDetail from "./ItemDetail";

export type ItemProps = {
  id: number;
  name: string;
  price: number;
  user: {
    name: string;
    phone: number;
    email: string;
  };
};

const ItemSingle: React.FC<{ item: ItemProps }> = (props) => {
  const [itemDetail, setItemDetail] = useState(false);

  function ItemDetailHandler() {
    setItemDetail(!itemDetail);
  }

  return (
    <>
      <Box
        _hover={{
          transform: "translateY(-3px)",
          boxShadow: "lg",
        }}
        p={5}
        shadow="md"
        borderWidth="1px"
        margin={2}
        borderRadius={5}
        // d="flex"
        w={[300, 400, 560]}
      >
        <Flex justify="center" align="center" wrap="wrap" grow={1}>
          <Heading fontSize="xl">{props.item.name}</Heading>

          <Spacer />
          <Text>@</Text>
          <Text> Ksh{props.item.price} </Text>
          <Spacer />
          <Button
            colorScheme="teal"
            variant="outline"
            alignSelf="right"
            float="right"
            onClick={() => ItemDetailHandler()}
          >
            {itemDetail ? "close" : "view"}
          </Button>

        </Flex>
      </Box>

      {itemDetail && (
        // <Slide direction="top" in={itemDetail} style={{ zIndex: 10 }} >
        <ItemDetail item={props.item} ItemDetailHandler={ItemDetailHandler} />
        // </Slide>
      )}
      
    </>
  );
};

export default ItemSingle;
