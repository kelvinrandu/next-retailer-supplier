import React from 'react'
import Layout from '../components/Layout';
import ItemList from '../components/ItemList';
import { ItemProps } from "../components/ItemSingle"
import { useSession } from 'next-auth/client';
import {
  Center,
  Text,
  Spinner,
  Box

} from '@chakra-ui/react';


export async function getStaticProps() {


  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/items`)
  if (res.status !== 200) {
    throw new Error("Failed to fetch")
  }
  
  const items = await res.json()
  
  return {
    props : { items}
  }
  
}

type Props = {
  items: ItemProps[]
} 

 const Index: React.FC<Props> = (props) => {

  const [session, loading] = useSession();
   const {items }=props
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
            ml="2"><Text>login to view</Text></Box></Center>
          
            </>
          )}
          {session && (
            
       <ItemList items={items}/>

       )}

    </Layout>     
  
  )
}
 export default Index;


