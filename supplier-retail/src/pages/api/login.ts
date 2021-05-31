import { NextApiRequest, NextApiResponse} from 'next';
import { compare } from 'bcrypt';
import prisma from '../../../lib/prisma'
import { sign } from 'jsonwebtoken';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

      const user: object| null  = await prisma.user.findUnique({
        where: {
           email: req.body.email },

        select: {
            id:true,
            email:true,
            isSupplier:true,
            password:true,
        }
      })
      if(!user){
        console.log('ups no user found')
        res.json({ message: 'Ups, no user!' });

      }
      compare(req.body.password, user.password, function(err, result) {
        if (!err && result) {
            console.log("successful")
            const claims = { sub: user.id, myPersonEmail: user.email };
            const jwt = sign(claims, process.env.NEXTAUTH_URL, { expiresIn: '1h' });
  
          res.json({ authToken: jwt });
          return true
     
        } else {
            console.log("unsuccessful")
          res.json({ message: 'Ups, something went wrong!' });
        }
      });
    


}






