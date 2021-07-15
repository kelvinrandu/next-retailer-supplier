import React from 'react';
import {useState}from 'react'
import { 
  Box,
  Heading,
  Text,
  Flex, 
  Spacer} from "@chakra-ui/layout"
import { Button} from "@chakra-ui/react";


export type OrderProps = {
  id: number;
  receipt: string;
  totalPrice: number;
  itemAmount: number;
  from: {
    name: string;
    phone : number;
    email: string;
  }
  item: {
    name: string;

  }

}

const OrderSingle: React.FC<{order: OrderProps}> = (props) => {

  const {order} = props
  const [orderDetail, setOrderDetail ] = useState(false);

  function OrderDetailHandler(){
    setOrderDetail(!orderDetail);
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
          margin={2}
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
        <Heading fontSize="xl">{order.itemAmount}*{props.order.item.name}</Heading>


        <Spacer />
        <Text >@</Text> 
        <Text > Ksh {order.totalPrice}</Text>
        <Spacer />
        <Button  
          colorScheme="teal" 
          variant="outline" 
          alignSelf="right" 
          float="right"
          onClick={()=>OrderDetailHandler()}>
           {orderDetail ? 'close' : 'view' }
        </Button>
        {/* </HStack> */}
        </Flex>
      </Box>
      
     {orderDetail && <> {order?.from.name}:{order?.from.phone}{order?.from.email}</>}
      </>
    )
}

export default OrderSingle