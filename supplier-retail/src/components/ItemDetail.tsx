import React, { useState } from "react";
import { Heading } from "@chakra-ui/layout";
import { useSession } from "next-auth/client";
import Router from "next/router";
import { Input } from "@chakra-ui/react";
import { ItemProps } from "../components/ItemSingle";
import { useToast } from "@chakra-ui/react";

const ItemDetail: React.FC<{ item: ItemProps }> = (props) => {
  const [session, loading] = useSession();
  const { item } = props;

  const [amount, setAmount] = useState<number>(0);
  const [toEmail] = useState(item.user.email);
  const [fromEmail] = useState(session.user.email);
  const [price] = useState(item.price);
  const [itemId] = useState(item.id);
  const [receipt, setReceipt] = useState(getReceipt());
  const [totalPrice, setTotalPrice] = useState<number>(1);
  const toast = useToast()

  function getTotal(price, amount) {
    const total = price * amount;
    setTotalPrice(price * amount);

    return price * amount;
  }

  function getReceipt() {
    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    return randomString;
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const totalPrice = getTotal(price, amount);
      // getReceipt()
      const body = { totalPrice, receipt, amount, itemId, toEmail, fromEmail };
      await fetch('/api/order', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await Router.push("/");
      toast({
        title: "Order placed",
        description: "We've created your order for you.",
        status: "success",
        position:  "top",
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Heading>{item.user.phone}</Heading>
      <form onSubmit={submitData}>
        <Input
          autoFocus
          onChange={(e) => setAmount(parseInt(e.target.value))}
          placeholder="quantity"
          type="number"
          value={amount}
        />

        {/* <input
               
                  disabled={!amount}
                  type="submit"
                  value="order"
                /> */}
      </form>
    </>
  );
};
export default ItemDetail;
