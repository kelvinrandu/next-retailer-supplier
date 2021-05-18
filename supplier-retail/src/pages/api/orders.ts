import { NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma'

export default async function getItems(req: NextApiRequest, res: NextApiResponse){
    const orders: object | null = await prisma.order.findMany({
     
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