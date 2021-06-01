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
    const result =await compare(password, user.password);
    if(!result){
      return false;
    }
    console.log(result)
      return user

}