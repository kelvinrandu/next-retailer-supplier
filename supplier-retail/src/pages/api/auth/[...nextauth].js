
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
// import Adapters from 'next-auth/adapters'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
const options = {
  site: process.env.SITE || 'http://localhost:3000',

  // Configure one or more authentication providers
  providers: [

    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
  // adapter: Adapters.Prisma.Adapter({ prisma }),
  jwt:{
    secret: process.env.JWT_SECRET,

  }

};

export default (req, res) => NextAuth(req, res, options);