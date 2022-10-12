import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  //Configure JWT
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          //Connect to DB
          const dbUser = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          //Get all the users
          //Find user with the email
          if (dbUser) {
            console.log(dbUser);
            if (dbUser.password == credentials?.password) {
              return dbUser;
            }
          }
          return null;
          //Not found - send error res
          //Incorrect password - send response
          //Else send success response
          //get and attach commerceJs JWT for commerce.customer's function usage
        } catch (err: any) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
