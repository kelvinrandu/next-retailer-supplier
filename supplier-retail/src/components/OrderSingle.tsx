import React, {useEffect}from "react";
import { useState } from "react";
import { Box, Heading, Text, Flex, Spacer } from "@chakra-ui/layout";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { Button, Checkbox, useToast } from "@chakra-ui/react";
import Router from "next/router";


export type OrderProps = {
  id: number;
  receipt: string;
  totalPrice: number;
  itemAmount: number;
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


  function OrderDetailHandler() {
    setOrderDetail(!orderDetail);
  }

  const submitData = async (e: React.SyntheticEvent,id) => {
    e.preventDefault();
    try {

      await fetch(`/api/order/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },

      });
       OrderDetailHandler();
      Router.push("/orders");
     

      toast({
        title: "Order processed",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };
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
            {order?.read ? (
              <Text as="s">
                {order.itemAmount}*{props.order.item.name}
              </Text>
            ) : (
              <Text>
                {order.itemAmount}*{props.order.item.name}
              </Text>
            )}
          </Heading>

          <Spacer />
          {order?.read ? (
            <>
              <Text as="s">@</Text>
              <Text as="s"> Ksh {order.totalPrice}</Text>
            </>
          ) : (
            <>
              <Text>@</Text>
              <Text> Ksh {order.totalPrice}</Text>
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
          {order?.from.name}:<PhoneIcon />
          {order?.from.phone}
          <EmailIcon />
          {order?.from.email}
          {order?.read ? (
            <Checkbox colorScheme="red" isDisabled defaultIsChecked>
              {" "}
              Processed order{" "}
            </Checkbox>
          ) : (
            <Checkbox
              colorScheme="red"
              onChange={(e) => submitData(e, order.id)}
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
