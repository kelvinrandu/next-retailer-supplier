import React, { useState } from "react";
import { useSession } from "next-auth/client";
import { PhoneIcon, EmailIcon, AddIcon } from "@chakra-ui/icons";
import Router from "next/router";
import { Input, Text, HStack, Flex, Box, Button, Icon } from "@chakra-ui/react";
import { ItemProps } from "../components/ItemSingle";
import { useToast } from "@chakra-ui/react";
import { GrDeliver } from "react-icons/gr";
import { FcShop } from "react-icons/fc";
import { v4 as uuidv4 } from "uuid";
import { InputRightElement, InputGroup } from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0";

type Iprops = {
  item: ItemProps;
  ItemDetailHandler: () => void;
};
const ItemDetail: React.FC<Iprops> = (props) => {
  const { user, error, isLoading } = useUser();

  const { item } = props;

  const [amount, setAmount] = useState<number | null>(null);
  const [toEmail] = useState(item.user.email);
  const [fromEmail] = useState("");
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
        py={10}
        p={2}
        // px={20}
        // pl={0}
        // pr={20}
        // margin={2}
        // w={[300, 450, 560]}
      >
        <Box fontWeight="700" d="flex" align="center" justify="center">
          <Text color="teal" mr="5px">
            {/* get data from user.role */}
            <Text>
              {" "}
              <Icon as={GrDeliver} boxSize={4} backgroundColor="teal" />
            </Text>
          </Text>
          <Text fontSize="20px" letterSpacing={3}>
            {" "}
            {item?.user.name}.
          </Text>
        </Box>

        <Box fontWeight="700" fontSize="15px">
          <EmailIcon color="teal" mr="5px" boxSize={4} /> {item?.user.email}
        </Box>
        <InputGroup>
          <form onSubmit={submitData}>
            <Input
              autoFocus
              variant="outline"
              focusBorderColor="teal"
              color="teal"
              width="30vw"
              onChange={(e) => setAmount(parseInt(e.target.value))}
              placeholder="Number of items"
              type="number"
              value={amount}
            />
            <InputRightElement>
              <Button onClick={submitData} size="md">
                <AddIcon color="teal" />
              </Button>
            </InputRightElement>
          </form>
        </InputGroup>
      </Box>
    </>
  );
};
export default ItemDetail;
