import { NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/client'

export default async function getOrders(req: NextApiRequest, res: NextApiResponse){
   const session = await getSession({ req })
     if (session) {
    // Signed in
    console.log('Session', JSON.stringify(session, null, 2))
  } else {
    // Not Signed in
    res.status(401)
  }
    const orders: object | null = await prisma.order.findMany({
      where: {
        to: { email: session?.user?.email },
      }, 
      orderBy:{
        id: 'desc' ,

      },
     
        select: {
          id:true,
          receipt:true,
          from: {
              select:{
              name:true,
              phone:true,
              }
          }
         
     
        },
       
      })

      res.json(orders)
      console.log(orders)
    

}