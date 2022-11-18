import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "../../../lib/hash";
import prisma from "../../../lib/prisma";

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
          await prisma.$disconnect();
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.id = Number(user.id);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
  },
});
