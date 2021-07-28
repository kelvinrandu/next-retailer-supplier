import React from "react";
import { useState } from "react";
import { Box, Heading, Text, Flex, Spacer} from "@chakra-ui/layout";
import { Fade, ScaleFade, Slide, SlideFade, Collapse,Button} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
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
          <Box
            // colorScheme="teal"
            // variant="outline"
            as="button"
            alignSelf="right"
            float="right"
            onClick={() => ItemDetailHandler()}
          >
            {itemDetail ? <ViewOffIcon color="red"  boxSize={6}/> : <ViewIcon  boxSize={6}/>}
          </Box>

        </Flex>
        {itemDetail && (
        <Collapse in={itemDetail} animateOpacity  style={{ zIndex: 10,transitionDuration:"30" }}>
        <ItemDetail item={props.item} ItemDetailHandler={ItemDetailHandler} />
        </Collapse>
      )}
      </Box>

     
    </>
  );
};

export default ItemSingle;
