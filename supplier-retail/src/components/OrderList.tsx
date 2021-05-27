import React from 'react';
import { Flex} from "@chakra-ui/layout"
import OrderSingle,{ OrderProps } from "./OrderSingle"

export type Props = {
  orders: OrderProps[]
} 
const OrderList: React.FC<Props> = props => {
    
    return (
      <Flex      
      direction="column"
      justify="center"
      align="center"
      >
          {props.orders.map(e =>(
          
          <OrderSingle key ={e.id} order={e} />
      
          ))}
      </Flex>
  )
}

export default  OrderList