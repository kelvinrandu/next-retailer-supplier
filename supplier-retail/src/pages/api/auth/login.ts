import prisma from '../../../../lib/prisma'
import { compare } from 'bcrypt';

export default async function login( email , password) {
    let user: object| null  = await prisma.user.findUnique({
        where: {
                email: email       
        },
        select: {
            id: true,
            email: true,
            name: true,
            image: true,
            isSupplier: true,
            password:true,
        }
    });
    if(!user){
        console.log('ups no user found')
        return false;

      }
    compare(password, user.password, function(err, result) {
        if (!err && result) {
          console.log('login successful',user)
          
          return user
     
     
        } else {
            console.log("unsuccessful")
          return false
        }
      });
      return user

}