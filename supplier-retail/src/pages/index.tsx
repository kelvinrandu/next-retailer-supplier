import React from 'react'
import Layout from '../components/Layout';
import ItemList from '../components/ItemList';
import { ItemProps } from "../components/ItemSingle"



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
   const {items }=props
  return (
    <Layout>
      
       <ItemList items={items}/>

    </Layout>     
  
  )
}
 export default Index;


