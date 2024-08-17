import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Logica para manejar password
import { getUserFromDb, saltAndHashPassword } from "@/utils/password";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";

export default {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        // logic to salt and hash password
        const pwHash = saltAndHashPassword(password);

        // logic to verify if the user exists
        const user = await getUserFromDb(email, pwHash);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("Invalid credentials");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
