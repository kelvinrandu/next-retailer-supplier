import React, { useEffect } from "react";
import { Box, Heading, Text, Flex, Spacer } from "@chakra-ui/layout";
import {  Badge } from "@chakra-ui/react";

export type OrderProps = {
  id: number;
  receipt: string;
  total_price: number;
  amount: number;
  read: boolean;
  from: {
    name: string;
    phone: number;
    email: string;
  };
  item: {
    name: string;
  };
};

const OrderRetail: React.FC<{ order: OrderProps }> = (props) => {
  const { order } = props;
  useEffect(() => {}, [order.read]);

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
          {/* <HStack w='100%'> */}
          <Heading fontSize="xl">
            <Text>
              {order.amount}*{order.item.name}
            </Text>
          </Heading>

          <Spacer />

          <Text>@</Text>
          <Text> Ksh {order.total_price} </Text>

          <Spacer />
          {order?.read ? (
            <Badge colorScheme="green">processed</Badge>
          ) : (
            <Badge colorScheme="green">awaiting approval</Badge>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default OrderRetail;
