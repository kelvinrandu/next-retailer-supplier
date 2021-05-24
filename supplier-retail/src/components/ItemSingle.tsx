import React from 'react';
import {useState}from 'react'
import { Box, Stack,Heading,Text,Flex, HStack } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react";
import ItemDetail from './ItemDetail';

export type ItemProps = {
  id: number;
  name: string;
  price: number;
  user: {
    name: string;
    phone : number;
    email: string;
  }

}

const ItemSingle: React.FC<{item: ItemProps}> = (props) => {
  

  const [itemDetail, setItemDetail ] = useState(false);

  function ItemDetailHandler(){
    setItemDetail(!itemDetail);
  }


    return (
        <>
        <Box 
          _hover={{
            transform: 'transl(-3px)',
            boxShadow: 'lg',
             }}
          p={5} 
          shadow="md" 
          borderWidth="1px" 
          w="30%" > 

        <HStack>
        <Heading fontSize="xl">{props.item.name}</Heading>
        <Text mt={4}>@</Text> 
        <Text mt={4}> Ksh{props.item.price} by {props.item.user.name}  </Text>
  
        <Button  
          colorScheme="teal" 
          variant="outline" 
          alignSelf="right" 
          float="right"
          onClick={()=>ItemDetailHandler()}>
           {itemDetail ? 'close' : 'view' }
        </Button>
        </HStack>
      </Box>
     {itemDetail &&  <ItemDetail item = {props.item} user ={props.item.user}/>}
      </>
    )
}

export default ItemSingle