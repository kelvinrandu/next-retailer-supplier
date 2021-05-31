
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import prisma from '../../../../lib/prisma'
import getUserByEmail from './getUserByRole' 
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
const options = {
  site: process.env.SITE || 'http://localhost:3000',


  // Configure one or more authentication providers
  providers: [

    Providers.Credentials({
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Email", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
          const res = await fetch('http://localhost:3000/api/login', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'credentials': JSON.stringify(credentials)
              }
          })
          const user = await res.json()
          
          if (user ) {
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
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    newUser: '/first',// If set, new users will be directed here on first sign in
  },
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
        //  "user" parameter is the object received from "authorize"
        //  "token" is being send below to "session" callback...
        //  ...so we set "user" param of "token" to object from "authorize"...
        //  ...and return it...
        user && (token.user = user);
        return Promise.resolve(token)   // ...here
    },
    session: async (session, user, sessionToken) => {
        
        //  "session" is current session object
        //  below we set "user" param of "session" to value received from "jwt" callback
        const userFromDatabase = await getUserByEmail(session.user.email)
      
        session.user = userFromDatabase ;
        return Promise.resolve(session)
    }
},
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
   adapter: Adapters.Prisma.Adapter({ prisma }),
  jwt:{
    secret: process.env.JWT_SECRET,

  },
  session: {
    jwt: true,
  },


  

};

export default (req, res) => NextAuth(req, res, options);