import React, { useState } from "react";
import { Heading } from "@chakra-ui/layout";
import { useSession } from "next-auth/client";
import Router from "next/router";
import { Input,Button } from "@chakra-ui/react";
import { ItemProps } from "../components/ItemSingle";
import { useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';

type Iprops={
  item: ItemProps,
  ItemDetailHandler: ()=>void

} 
const ItemDetail = (props:Iprops) => {
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
    const randomString = uuidv4();

    return randomString;
  }
  function flushAmount() {
   
    return  setAmount(0);
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (!amount){
        console.log('amount cannot be zero')

      }
      const totalPrice = getTotal(price, amount);
      
      const body = { totalPrice, receipt, amount, itemId, toEmail, fromEmail };
      await fetch('/api/order', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
     
      props.ItemDetailHandler();

      await Router.push("/dashboard");
     

      flushAmount();
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
