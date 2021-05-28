// pages/drafts.tsx

import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import OrderList from '../components/OrderList'
import { OrderProps } from "../components/OrderSingle"

import { useSession, getSession } from 'next-auth/client'
import prisma from '../../lib/prisma'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { orders: [] } }
  }

  const orders = await prisma.order.findMany({
    where: {
      to: { email: session.user.email },

    },
    select: {
        id:true,
        receipt:true,
        totalPrice:true,
        itemAmount:true,
        from: {
            select:{
            name:true,
            phone:true,
            }
        },
        item: {
          select:{
          name:true,
   
          }
      }
       
   
      },
  })
  return {
    props: { orders},
  }
}

type Props = {
    orders: OrderProps[]
  } 
  

const Drafts: React.FC<Props> = (props) => {
  const [session] = useSession()
  

  if (!session) {
    return (
      <Layout>
        <h1>Orders for me</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="page">
        <h1>orders for me</h1>
        <main>
         
              <OrderList orders={props.orders} />
        
          
      
        </main>
      </div>
 
    </Layout>
  )
}

export default Drafts