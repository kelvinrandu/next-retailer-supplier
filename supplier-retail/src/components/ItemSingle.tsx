import React from 'react';
import {useState}from 'react'
import { Box, Stack,Heading,Text,Flex, HStack ,Spacer} from "@chakra-ui/layout"
import { Button} from "@chakra-ui/react";
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
            transform: 'translateY(-3px)',
            boxShadow: 'lg',
          }}
          p={5} 
          shadow="md" 
          borderWidth="1px" 
          margin={3}
          borderRadius={5}
          // d="flex"
         w= {[300, 400, 560]}
         > 
         <Flex 
         justify='center'
         align='center'
         wrap='wrap'
         grow={1}
         >

        {/* <HStack w='100%'> */}
        <Heading fontSize="xl">{props.item.name}</Heading>
        <Spacer />
        <Text >@</Text> 
        <Text > Ksh{props.item.price}  </Text>

        <Spacer />
        <Text > {props.item.name}  </Text>
        <Spacer />
        <Button  
          colorScheme="teal" 
          variant="outline" 
          alignSelf="right" 
          float="right"
          onClick={()=>ItemDetailHandler()}>
           {itemDetail ? 'close' : 'view' }
        </Button>
        {/* </HStack> */}
        </Flex>
      </Box>
      
     {itemDetail &&  <ItemDetail item = {props.item} />}
      </>
    )
}

export default ItemSingle