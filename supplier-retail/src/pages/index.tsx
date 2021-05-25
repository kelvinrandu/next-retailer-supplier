import React from 'react'
import Layout from '../components/Layout';
import ItemList from '../components/ItemList';
import { ItemProps } from "../components/ItemSingle"
import { useSession } from 'next-auth/client';
import {
  Center,
  Text,
} from '@chakra-ui/react';



export async function getStaticProps() {

  const res = await fetch('http://localhost:3000/api/items')
  
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
   if (loading) return <div>loading...</div>;

  return (
    <Layout>
        {!session && (
           <>
           <Center py={6}><Text mt={4}>login to view</Text></Center>
          
            </>
          )}
          {session && (
       <ItemList items={items}/>
       )}

    </Layout>     
  
  )
}
 export default Index;


