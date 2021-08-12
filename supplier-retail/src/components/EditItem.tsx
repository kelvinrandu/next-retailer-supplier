import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Button,
  useDisclosure,
  Modal,
  useToast,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const EditItem = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
  //edit mutation lies here
    onClose();
        toast({
          title: "Item edited",
          description: "Item edited successfully.",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
  };

  return (
    <div>

        <Button onClick={onOpen}>Edit</Button>
    
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Edit item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="first-name" isRequired>
                <FormLabel>name</FormLabel>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={props.item.name}
                />
              </FormControl>
              <FormControl id="first-name" isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder={props.item.price}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" variant="ghost">
                Edit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditItem;
