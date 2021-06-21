import prisma from '../lib/prisma'
export default async function getUserByEmail( email ) {
let user = await prisma.user.findUnique({
    where: {
            email: email       
    },
    select: {
        id: true,
        email: true,
        name: true,
        image: true,
        isSupplier: true,
    }
});

return user
}