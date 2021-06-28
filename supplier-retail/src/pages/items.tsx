import React,{useEffect,useState} from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import { useSession, getSession } from 'next-auth/client'
import prisma from '../../lib/prisma'
import { ItemProps } from "../components/ItemSingle"
import AddItem from "../components/AddItem"
import {
HStack,
Center,
Box,
Button,
Input,
Spinner,
Flex,
Text,
  } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { orders: [] } }
  }

  const items = await prisma.item.findMany({
    where: {
      user: { email: session.user.email },

    },
    select: {
        id:true,
        name:true,
        quantity:true,
        price:true,
       
   
      },
  })
  return {
    props: { items},
  }
}

type Props = {
    items: ItemProps[]
  } 
const items: React.FC<Props> = (props) => {
  const [session, loading] = useSession();
  const [name, setName] =useState("");
  const[price, setPrice]=useState(0);

  const handleSubmit=()=>{

  }


  if (loading)
  return (
         <div>
            <Center h="100vh">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
            </Center>
        </div>)
    return (
      
        <Layout>
                  {!session && (
           <>
           <Center h="100vh"><Box borderWidth="6px" borderRadius="lg" color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"><Text>items</Text></Box></Center>
          
            </>
          )}
            <Center mt={70}>
            <HStack>
                <Box as="div" alignItems="center" justifyContent="center" display="Flex"
                flexDirection="column">
                
     {props.items.map(e =>(
      
          
         <> <Flex>
           
        <form onSubmit={handleSubmit}>
          <Box>
            <Flex>
          <Input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder={e.name}/>
          <Input type="number" value={price}  onChange = {(e) => setPrice(parseInt(e.target.value) || 0)} placeholder={'e.price'}/>
          <Input type="number" value={price} placeholder={'e.price'}/>
          </Flex>
          </Box>
        </form>
         </Flex>
         </>
      
          ))}
          </Box>
          <AddItem />
          </HStack>
          </Center>
       </Layout>
    )
}

export default items
