import React, { useState } from "react";
import {
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
import { useForm } from "react-hook-form";
import { UPDATE_ITEM_MUTATION } from "../../graphql/mutations";
import {  useMutation } from "@apollo/react-hooks";
import { ItemProps } from "../components/ItemSingle";
import { GET_ITEMS_QUERY } from "../../graphql/queries";

type IProps = {
  item: ItemProps;
};
  const EditItem: React.FC<IProps> = ({item}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const { handleSubmit, register } = useForm();
    const toast = useToast();
    const [updateItem, { loading }] = useMutation(UPDATE_ITEM_MUTATION, {
      refetchQueries: [{ query: GET_ITEMS_QUERY }],
    });

    const flushInputs=()=>{
      setNewName("");
      setNewPrice("");
    }
  
    const onUpdateItem = ({ name, price ,item_id}, onClose) => {
      updateItem({
        variables: {
          name: name,
          price: price,
          item_id:item_id
        },
      });

      onClose();
      flushInputs();
      toast({
        title: "Item Updated ",
        description: "We've have updated your item for you.",
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
            <form
              onSubmit={handleSubmit((data) =>
                onUpdateItem(
                  {
                    name: newName,
                    price: newPrice,
                    item_id: item.id,
                  },
                  onClose
                )
              )}
            >
              <ModalHeader>Edit item</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl id="name" isRequired>
                  <FormLabel>name</FormLabel>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={item.name}
                  />
                </FormControl>
                <FormControl id="" isRequired>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder={item.price.toString()}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button type="submit" colorScheme="blue">
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
