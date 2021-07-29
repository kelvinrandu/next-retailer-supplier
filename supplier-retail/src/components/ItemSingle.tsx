import React from "react";
import { useState } from "react";
import { Box, Heading, Text, Flex, Spacer} from "@chakra-ui/layout";
import {  Collapse} from "@chakra-ui/react";
import {TriangleDownIcon,TriangleUpIcon,AtSignIcon} from "@chakra-ui/icons";
import ItemDetail from "./ItemDetail";

export type ItemProps = {
  id: number;
  name: string;
  price: number;
  user: {
    name: string;
    phone: number;
    email: string;
    isSupplier: boolean;
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
        w={[300, 400, 560]}
      >
        <Flex justify="center" align="center" wrap="wrap" grow={1}>
          <Heading fontSize="md" mr={4}>{props.item.name.toLowerCase()}</Heading>
          {/* <Spacer /> */}
          <AtSignIcon color="teal"/>
          <Text> Ksh{props.item.price} </Text>
          <Spacer />
          <Box
            as="button"
            alignSelf="right"
            float="right"
            onClick={() => ItemDetailHandler()}
          >
            {itemDetail ? <TriangleUpIcon color="red"  boxSize={6}/> : <TriangleDownIcon color="teal"  boxSize={6}/>}
          </Box>

        </Flex>
        {itemDetail && (
        <Collapse in={itemDetail} animateOpacity  style={{ zIndex: 10 }}>
        <ItemDetail item={props.item} ItemDetailHandler={ItemDetailHandler} />
        </Collapse>
      )}
      </Box>

     
    </>
  );
};

export default ItemSingle;
