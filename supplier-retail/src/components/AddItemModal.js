import React, {useState, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {useQuery, useMutation} from '@apollo/react-hooks';
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
    Text,
    Button,
    RadioGroup,
    Radio,
    Flex
} from '@chakra-ui/react';

import {GET_CATEGORIES_QUERY, GET_ITEM_QUERY} from '../../graphql/queries';
import {CREATE_ITEM_MUTATION} from '../../graphql/mutations';

import { useUser } from "@auth0/nextjs-auth0";


function AddItemModal() {
    const { user, error, isLoading } = useUser();
    const initialRef = useRef();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {handleSubmit, register, errors} = useForm();

    const [alcoholType, setAlcoholType] = useState('BEER');
    const [daysActive, setDaysActive] = useState(['Monday']);
    const [createItem, { loading }] = useMutation(CREATE_ITEM_MUTATION);
    const { data } = useQuery(GET_CATEGORIES_QUERY);

    const onCreateItem = (
        {name, price, user_id, category_id, amount},
        onClose
    ) => {


        createPost({
          variables: {
            name,
            price,
            user_id,
            category_id,
            amount,
          },
          update: (cache, { data }) => {
            const cachedData = cache.readQuery({
              query: GET_ITEMS_QUERY,
            });

            const newItem = data["insert_items"].returning[0];

            cache.writeQuery({
              query: GET_ITEMS_QUERY,

              data: {
                ...cachedData,
                items: [newItem, ...cachedData.items],
              },
            });
          },
        });

        onClose();
    };
        const onOpenDealModal = () => {
        if (!user) {
            return openAuthModal();
        }

        onOpen();
    };



    return (
      <>
        <Button
          onClick={onOpenDealModal}
          variantColor="teal"
          align="center"
          variant="solid"
          minH="40px"
          w="60%"
        >
          New Item
        </Button>

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(onCreateItem)}>
                <FormControl isRequired>
                  <FormLabel>Store Name</FormLabel>
                  <Input
                    autoFocus
                   
                    placeholder="Name"
                    variant="filled"
                    type="text"
                    
                  />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    autoFocus
                  
                    variant="filled"
                    
                    placeholder="Email address"
                    type="text"
                    
                  />
                </FormControl>
       
                <FormControl isRequired mt={6}>
                  <FormLabel>Password</FormLabel>
                  <Input
                   
                    variant="filled"
                   
                    placeholder="Password"
                    type="password"
                  
                  />
                </FormControl>
                
           
                <FormControl isRequired mt={6}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                 
                    placeholder="Phone"
                    type="text"
                    variant="filled"
                   
                  />
                </FormControl>
 
                <Button
                  
                  type="submit"
                  variantcolor="teal"
                  variant="outline"
                  width="full"
                  mt={4}
                >
                  Register
                </Button>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}

export default AddItemModal;
