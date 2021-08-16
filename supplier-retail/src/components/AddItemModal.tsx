import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import { GET_CATEGORIES_QUERY, GET_ITEMS_QUERY } from "../../graphql/queries";
import { CREATE_ITEM_MUTATION } from "../../graphql/mutations";
import { useUser } from "@auth0/nextjs-auth0";
interface Props{}
const AddItemModal: React.FC<Props> = () => {
    const { user, error, isLoading } = useUser();
    const initialRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleSubmit, register} = useForm();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(null);
    const [amount, setAmount] = useState(null);
    const [category_id, setCategoryId] = useState(null);
    const toast = useToast();
    const { data } = useQuery(GET_CATEGORIES_QUERY);
    //refetch after mutation
    const [createItem, { loading }] = useMutation(CREATE_ITEM_MUTATION, {
      refetchQueries: [{ query: GET_ITEMS_QUERY }],
    });

    const onCreateItem = (
      { name, price, amount, category_id, user_id },
      onClose
    ) => {
      createItem({
        variables: {
          name: name,
          price: price,
          amount: amount,
          category_id: category_id,
          user_id: user_id,
        },
      });

      onClose();
      toast({
        title: "Item created",
        description: "We've created your item for you.",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      flushInputs();
    };

    const flushInputs = () => {
      setName("");
      setPrice(null);
      setAmount(null);
    };

    const onOpenDealModal = () => {
      if (!user?.sub) {
        //return toast
        return 1;
      }

      onOpen();
    };

    return (
      <>
        <Button
          onClick={onOpenDealModal}
          variant="solid"
          colorScheme="teal"
          align="center"
          minH="40px"
          w="60%"
        >
          Add Item
        </Button>

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <form
              onSubmit={handleSubmit((data) =>
                onCreateItem(
                  {
                    name,
                    price: data.price,
                    amount: data.amount,
                    category_id: data.category_id,
                    user_id: user?.sub,
                  },
                  onClose
                )
              )}
            >
              <ModalHeader>Add Item</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel>name</FormLabel>
                  <Input
                    autoFocus
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    variant="filled"
                    value={name}
                    type="text"
                  />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel>Price</FormLabel>
                  <Input
                    autoFocus
                    variant="filled"
                    name=""
                    placeholder="price"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    {...register("price", { required: true })}
                    type="number"
                  />
                </FormControl>

                <FormControl isRequired mt={6}>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    variant="filled"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                    {...register("amount", { required: true })}
                    placeholder="Amount"
                    type="number"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Select
                    {...register("category_id", { required: true })}
                    name="category_id"
                    id="category"
                    onChange={(e) => setCategoryId(e.target.value)}
                    placeholder="Select Category"
                  >
                    {data &&
                      data.categories.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                  </Select>
                  <FormErrorMessage></FormErrorMessage>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={loading}
                  type="submit"
                  variantColor="teal"
                  variant="solid"
                  colorScheme="teal"
                  ml={3}
                >
                  Create
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    );
  };

export default AddItemModal;
