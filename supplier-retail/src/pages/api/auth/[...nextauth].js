import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../../lib/prisma";
import getUserByEmail from "../../../../utils/getUserByRole";
import login from "../../../../utils/login";
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
const options = {
  site: process.env.NEXTAUTH_URL || "http://localhost:3000",

  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const res = await login(credentials.email, credentials.password);
        console.log("here", res);
        const user = await res;

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),

    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: 'signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: '/first',// If set, new users will be directed here on first sign in
  },
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      //  "user" parameter is the object received from "authorize"
      //  "token" is being send below to "session" callback...
      //  ...so we set "user" param of "token" to object from "authorize"...
      //  ...and return it...
      user && (token.user = user);
      return Promise.resolve(token); // ...here
    },
    redirect: async (url, baseUrl) => {
      return Promise.resolve(`${process.env.NEXTAUTH_URL}/dashboard`);
    },
    session: async (session, user, sessionToken) => {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      const userFromDatabase = await getUserByEmail(session.user.email);

      session.user = userFromDatabase;
      return Promise.resolve(session);
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
  adapter: Adapters.Prisma.Adapter({ prisma }),
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  session: {
    jwt: true,
  },
};

export default (req, res) => NextAuth(req, res, options);
