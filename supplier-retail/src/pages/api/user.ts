import { NextApiRequest, NextApiResponse} from 'next';
import { hash } from 'bcrypt';
import prisma from '../../../lib/prisma'

// POST /api/user
// Required fields in body: name, email, phone, isSupplier
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, phone ,password,isSupplier} = req.body
    hash(password, 10, async function(err, hash) {
      const result = await prisma.user.create({
        data: {
          name : name,
          email: email,
          phone : phone,
          password: hash,
          isSupplier : isSupplier,
        },
      })
      res.json(result)
  });

  
 
  
  


}






