import React, { useState } from "react";
import { useSession } from "next-auth/client";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import Router from "next/router";
import { Input, Text, useToast, Box } from "@chakra-ui/react";
import { ItemProps } from "../components/ItemSingle";
import { v4 as uuidv4 } from "uuid";

type Iprops = {
  item: ItemProps;
  ItemDetailHandler: () => void;
};
const ItemDetail: React.FC<Iprops> = (props) => {
  const [session, loading] = useSession();
  const { item } = props;

  const [amount, setAmount] = useState<number | null>(null);
  const [toEmail] = useState(item.user.email);
  const [fromEmail] = useState(session.user.email);
  const [price] = useState(item.price);
  const [itemId] = useState(item.id);
  const [receipt, setReceipt] = useState(getReceipt());
  const [totalPrice, setTotalPrice] = useState<number>(1);
  const toast = useToast();

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
    return setAmount(null);
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (!amount || amount <= 0) {
        return toast({
          description: "invalid amount",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
      const totalPrice = getTotal(price, amount);

      const body = { totalPrice, receipt, amount, itemId, toEmail, fromEmail };
      await fetch("/api/order", {
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
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        margin={2}
        borderRadius={5}
        w={[300, 400, 560]}
      >
        <Box fontWeight="700">
          order from:
          <Text as="mark" fontSize="20px">
            {item?.user.name} .
          </Text>
        </Box>

        <Box fontWeight="700">
          <PhoneIcon />
          {item?.user.phone}
        </Box>

        <Box fontWeight="700">
          <EmailIcon /> {item?.user.email}
        </Box>
        {session.user?.isSupplier ? null : (
          <>
            <form onSubmit={submitData}>
              <Input
                autoFocus
                onChange={(e) => setAmount(parseInt(e.target.value))}
                placeholder="Enter number of items"
                type="number"
                value={amount}
              />
            </form>
          </>
        )}
      </Box>
    </>
  );
};
export default ItemDetail;
