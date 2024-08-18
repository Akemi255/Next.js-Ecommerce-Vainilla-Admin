import NextAuth from "next-auth";

import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prismadb from "./lib/prismadb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.emailVerified = token.emailVerified;
      }
      return session;
    },
  },
});
