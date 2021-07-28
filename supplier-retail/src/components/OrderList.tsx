import React from "react";
import { Flex } from "@chakra-ui/layout";
import OrderSingle, { OrderProps } from "./OrderSingle";
import { useSession } from "next-auth/client";
import OrderSingleRetail from "./OrderSingleRetail";


export type Props = {
  orders: OrderProps[];
};
const OrderList: React.FC<Props> = (props) => {
  const [session, loading] = useSession();
  return (
    <Flex direction="column" justify="center" pt={20} align="center">
      {session.user?.isSupplier ? (
        <>
          {props.orders.map((e) => (
            <OrderSingle key={e.id} order={e} />
          ))}{" "}
        </>
      ) : (
        <>
          {props.orders.map((e) => (
            <OrderSingleRetail key={e.id} order={e} />
          ))}
        </>
      )}
    </Flex>
  );
};

export default OrderList;
