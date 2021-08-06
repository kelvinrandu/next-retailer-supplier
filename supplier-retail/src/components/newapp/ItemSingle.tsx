import React, { ReactNode, useState } from "react";
import {  Text, Flex, Spinner ,Box,Collapse } from "@chakra-ui/react";
import { useItems } from "../../../graphql/hooks";
import {TriangleDownIcon,TriangleUpIcon,AtSignIcon} from "@chakra-ui/icons";
import ItemDetail from "../newapp/ItemDetail";
// import item from "../../pages/api/item";

function ItemSingle({item}) {
    const { data, loading } = useItems();
    const allItems = data ? data.items : [];

    const [itemDetail, setItemDetail] = useState(false);

    function ItemDetailHandler() {
      setItemDetail(!itemDetail);
    }
    return (
        <div>
            <Box 
              _hover={{
                transform: "translateY(-3px)",
                boxShadow: "dark-lg",
              }}
              borderWidth="1px" h="10vh" m={2} p={5} borderRadius="md" key={item.id}>
                <Flex>
                <Box>{item.name}</Box>
            <Box ml="10px"><AtSignIcon color="teal"/> Ksh: {item.price}</Box>

            <Box 
            ml="auto" 
            mr="10px" 
            color="teal"
            onClick={()=>ItemDetailHandler()}>
              {itemDetail ? <TriangleUpIcon color="red"  boxSize={6}/> :  <TriangleDownIcon color="teal"  boxSize={6}/>}
            </Box>
                </Flex>


                {itemDetail && (
        <Collapse in={itemDetail} animateOpacity  style={{ zIndex: 10 }}>
        <ItemDetail item={item} ItemDetailHandler={ItemDetailHandler} />
        </Collapse>
      )} 
            </Box>
        </div>
    )
}

export default ItemSingle
