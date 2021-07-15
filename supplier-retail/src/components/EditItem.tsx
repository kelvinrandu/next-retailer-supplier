import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Button,
  useDisclosure,
  Modal,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios
      .patch(`api/item/${props.item.id}`, {
        name: newName,
        price: parseInt(newPrice),
      })
      .catch((err) => {
        console.log(" Err", err);
      });
    onClose();
  };

  return (
    <div>
      <Box
        p={5}
        borderRadius="10px"
        shadow="md"
        width="300px"
        borderWidth="1px"
      >
        <Heading fontSize="xl"> {props.item.name}</Heading>
        <Button onClick={onOpen}>Edit</Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Modal Title</ModalHeader>
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
