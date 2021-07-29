import React, { useState } from "react";
import {
  Box,
  Flex,
  useDisclosure,
  Stack,
  VStack,
  FormLabel,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import Router from "next/router";
import { AddIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/client";

const AddItem = (props) => {
  const nameref = React.useRef();
  const [session, loading] = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [user, setUser] = useState(session?.user.email);
  const toast = useToast();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(!price || price<= 0 || !quantity|| quantity<=0 ){
        return toast({
          description: "invalid price or quantity",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
    }

    try {
      setUser(session.user.email);
      const body = { name, quantity, price, user };
      await fetch("/api/item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      toast({
        description: "added item successfuly",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
 
      onClose();
       await Router.push("/items");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Flex as="div" justify="center">
      <VStack>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
          Create item
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={nameref}
          onClose={onClose}
        >
          <form onSubmit={submitData}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Create a new item
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="username">Name</FormLabel>
                    <Input
                      value={name}
                      ref={nameref}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Please enter user name"
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="username">Price</FormLabel>
                    <Input
                      value={price}
                      onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                      placeholder="Please enter user name"
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="username">Quantity</FormLabel>
                    <Input
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value) || 0)
                      }
                      placeholder="Please enter user name"
                    />
                  </Box>
                </Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue">
                  Submit
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </form>
        </Drawer>
      </VStack>
    </Flex>
  );
};

export default AddItem;
