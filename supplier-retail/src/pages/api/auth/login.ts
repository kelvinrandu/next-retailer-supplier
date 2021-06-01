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

      }/* @ts-ignore */ 
    const result =await compare(password, user.password);
    if(!result){
      return false;
    }
    /* @ts-ignore */ 
      return  { email: user.email, name: user.name ,image : user.image, isSupplier: user.isSupplier}

}