import React, { useState } from "react";
import { useSession } from "next-auth/client";
import { PhoneIcon, EmailIcon} from "@chakra-ui/icons";
import Router from "next/router";
import { Input, Text, HStack,Flex,Box } from "@chakra-ui/react";
import { ItemProps } from "../components/ItemSingle";
import { useToast } from "@chakra-ui/react";
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
      if (!amount) {
        console.log("amount cannot be zero");
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
        py={10}
        px={20}
        // bg="green"
        margin={2}
        w={[300, 400, 560]}
      >
        <Box fontWeight="700" d="flex" justify="center">
          <Text>
          order from:
          </Text>{" "}<Text as="mark" color="blue.200"
           fontSize="20px">
            {item?.user.name} .
            </Text>
        </Box>
           <Box fontWeight="700">
           <PhoneIcon color="blue.300"/>{" "}{item?.user.phone}
           </Box>
           <Box fontWeight="700">
           <EmailIcon color="blue.200"/>{" "}{item?.user.email}
           </Box>
      <form onSubmit={submitData}>
        <Input
          autoFocus
          onChange={(e) => setAmount(parseInt(e.target.value))}
          placeholder="Number of items"
          type="number"
          value={amount}
        />
      </form>
      </Box>
    </>
  );
};
export default ItemDetail;
