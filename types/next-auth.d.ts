import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: string | null | undefined;
    } & DefaultSession["user"];
  }
  interface User {
    role: string | null | undefined;
    id: number | undefined;
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    email: string | null | undefined;
    name: string | null | undefined;
    role: string | null | undefined;
    id: number | undefined;
  }
}
