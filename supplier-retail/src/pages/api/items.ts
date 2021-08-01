import { NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma'

export default async function getItems(req: NextApiRequest, res: NextApiResponse){
    const items: object | null = await prisma.item.findMany({
      orderBy:{
        id: 'desc' ,

      },
        select: {
          id:true,
          name:true,
          price:true,
         
          user: {
              select:{
              name:true,
              phone:true,
              email:true,
              isSupplier:true,
              }
          }
           
        },
       
      })

      res.json(items)
    
}