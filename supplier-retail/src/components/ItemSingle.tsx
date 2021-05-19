import React from 'react';
import {useState}from 'react'
import { Box, Stack,Heading,Text,Flex, HStack } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react";
import ItemDetail from './ItemDetail';


export default function ItemSingle(props) {
  

  const [itemDetail, setItemDetail ] = useState(false);
  function ItemDetailHandler(){
    console.log('itemdetails')
    setItemDetail(true);
  }


    return (
        <>
        <Box 
      p={5} 
      shadow="md" 
      borderWidth="1px" 
      w="30%" > 
          <HStack>
        <Heading fontSize="xl">{props.item.name}</Heading>
        <Text mt={4}>@</Text> 
        <Text mt={4}> Ksh{props.item.price} by {props.user}  </Text>
  
        <Button 
          colorScheme="teal" 
          variant="outline" 
          alignSelf="right" 
          float="right"
          onClick={ItemDetailHandler}>
           view
        </Button>
        </HStack>
      </Box>
     {itemDetail &&  <ItemDetail item ={props.item}/>}
      </>
    )
}
