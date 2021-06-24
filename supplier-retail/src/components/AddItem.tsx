import React from "react";
import {
  Container,
  Box,
  Flex,
  useDisclosure,
  Spacer,
  Stack,
  VStack,
  FormControl,
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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const AddItem = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const secondField = React.useRef()
  return (
    <Flex as="div" justify="center">
      <VStack>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
          Create item
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
        >
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
                    ref={firstField}
                    id="username"
                    placeholder="Please enter user name"
                  />
                </Box>
  
                <Box>
                <FormLabel htmlFor="username">Quantity</FormLabel>
                  <Input
                    ref={secondField}
                    id="second"
                    placeholder="Please enter user name"
                  />
                </Box>
              </Stack>
            </DrawerBody>
  
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Submit</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </VStack>
    </Flex>
  );
};

export default AddItem;
