import { NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma'

export default async function getItems(req: NextApiRequest, res: NextApiResponse){
    const items: object | null = await prisma.item.findMany({
     
        select: {
          id:true,
          name:true,
          price:true,
          user: {
              select:{
              name:true,
              phone:true,
              }
          }
           
        },
       
      })

      res.json(items)
    
}