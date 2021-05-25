
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import prisma from '../../../../lib/prisma'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
const options = {
  site: process.env.SITE || 'http://localhost:3000',


  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Email", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
     async authorize(credentials, req) {
      const user = await prisma.user.findFirst({
        where: {
            email: credentials.email,
            
        }
    });
        // const user = (credentials, req) => {
        //   // You need to provide your own logic here that takes the credentials
        //   // submitted and returns either a object representing a user or value
        //   // that is false/null if the credentials are invalid.
        //   // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        //   // You can also use the request object to obtain additional parameters 
        //   // (i.e., the request IP address)   
        //   return null
        // }
        if (user) {
          // Any user object returned here will be saved in the JSON Web Token
          return user
        } else {
          return null
        }
      }
    }),


    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: async (session, user) => {
    // Assign user data from JWT to session user
    session.user = user.data
    return Promise.resolve(session)
  },
  jwt: async (token, user, account, profile, isNewUser) => {
    // The user argument is only passed the first time this callback is called on a new session, after the user signs in
    if (user) {
      // Add a new prop on token for user data
      token.data = user
    }
    return Promise.resolve(token)
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
   adapter: Adapters.Prisma.Adapter({ prisma }),
  jwt:{
    secret: process.env.JWT_SECRET,

  }
  
  
  

};

export default (req, res) => NextAuth(req, res, options);