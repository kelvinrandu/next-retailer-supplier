import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Heading, Text, Flex, Spacer } from "@chakra-ui/layout";
import { EmailIcon } from "@chakra-ui/icons";
import { Button, Checkbox, useToast } from "@chakra-ui/react";
import { UPDATE_ORDER_MUTATION } from "../../graphql/mutations";
import { GET_ORDERS_QUERY } from "../../graphql/queries";
import {  useMutation } from "@apollo/react-hooks";



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

const OrderSingle: React.FC<{ order: OrderProps }> = (props) => {

  const { order } = props;
  const [orderDetail, setOrderDetail] = useState(false);
  const toast = useToast();
  useEffect(() => {}, [order.read]);
    const [updateOrder, { loading }] = useMutation(UPDATE_ORDER_MUTATION, {
    refetchQueries: [{ query: GET_ORDERS_QUERY}],
  });

  function OrderDetailHandler() {
    setOrderDetail(!orderDetail);
  }

  const onUpdateOrder = (order_Id
  ) => {
          updateOrder({
            variables: {
              order_Id, 
            },
          });
              toast({
                title: "Order processed",
                description: "The order has been processed",
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true,
              });
              OrderDetailHandler();

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
        borderColor="red.100"
        border="1px solid green"
        // d="flex"
        w={[300, 400, 560]}
      >
        <Flex justify="center" align="center" wrap="wrap" grow={1}>
          {/* <HStack w='100%'> */}
          <Heading fontSize="xl">
            {order?.read ? (
              <Text as="s">
                {order.amount}*{order.item.name}
              </Text>
            ) : (
              <Text>
                {order.amount}*{props.order.item.name}
              </Text>
            )}
          </Heading>

          <Spacer />
          {order?.read ? (
            <>
              <Text as="s">@</Text>
              <Text as="s"> Ksh {order.total_price}</Text>
            </>
          ) : (
            <>
              <Text>@</Text>
              <Text> Ksh {order.total_price}</Text>
            </>
          )}

          <Spacer />
          <Button
            colorScheme="teal"
            variant="outline"
            alignSelf="right"
            float="right"
            onClick={() => OrderDetailHandler()}
          >
            {orderDetail ? "close" : "view"}
          </Button>
          {/* </HStack> */}
        </Flex>
      </Box>

      {orderDetail && (
        <>
          {" "}
          name
          <EmailIcon />
          email
          {order?.read ? (
            <Checkbox colorScheme="red" isDisabled defaultIsChecked>
              {" "}
              Processed order{" "}
            </Checkbox>
          ) : (
            <Checkbox
              colorScheme="red"
              onChange={(e) => onUpdateOrder(order?.id)}
            >
              {" "}
              Process order{" "}
            </Checkbox>
          )}
        </>
      )}
    </>
  );
};

export default OrderSingle;
