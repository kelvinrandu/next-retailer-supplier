import { NextApiRequest, NextApiResponse} from 'next';
import { compare } from 'bcrypt';
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

      const user: object | null  = await prisma.user.findMany({
        where: {
           email: req.body.email },

        select: {
            id:true,
            password:true,
    
 
      })
    compare(req.body.password, user.password, function(err, result) {

      });



}






