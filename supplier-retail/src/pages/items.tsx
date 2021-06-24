import React from 'react'
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
    return (
        <Layout>
            <Center mt={70}>
            <HStack>
                <Box>
                
     {props.items.map(e =>(
          
         <p> {e.name}</p>
      
          ))}
          </Box>
          <AddItem/>
          </HStack>
          </Center>
       </Layout>
    )
}

export default items
