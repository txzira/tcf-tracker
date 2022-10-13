import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "../../../lib/hash";

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
      async authorize(credentials: any, req) {
        try {
          //Find user with the email
          const dbUser = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          //if user exist
          if (dbUser) {
            //validate user password with bcrypt
            const checkPassword = await verifyPassword(credentials?.password, dbUser.password);

            if (checkPassword) {
              return dbUser;
            } else {
              //error incorrect email or password, but really just password
              return null;
            }
          } else {
            //not found send error
            return null;
          }
        } catch (err: any) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
