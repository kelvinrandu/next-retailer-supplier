import Head from 'next/head'
import React from 'react'
import Layout from '../components/Layout';
import ItemList from '../components/ItemList';



export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/items')
  const items = await res.json()
  console.log(items)
  
  return {
    props : { items}
  }
  
}


 const Index: React.FC = (props) => {
  return (
    <Layout>
      
       <ItemList items={props.items}/>

    </Layout>
      
  
  )
}
 export default Index;


