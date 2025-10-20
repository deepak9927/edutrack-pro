import type { NextAuthConfig } from "next-auth"
import { UserRole } from "@prisma/client"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import { LoginSchema } from "@/lib/validations/auth"

import { getUserByEmail } from "@/lib/actions/get-user"

import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        console.log("Login - Validated fields success:", validatedFields.success);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          console.log("Login - Attempting login for email:", email);

          const user = await getUserByEmail(email);
          console.log("Login - User found:", user ? user.email : "No user");

          if (!user || !user.password) {
            console.log("Login - User not found or password missing.");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("Login - Passwords match:", passwordsMatch);

          if (passwordsMatch) {
            console.log("Login - User authenticated:", user.email);
            return user;
          }
        }
        console.log("Login - Authentication failed.");

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      if (token.sub) {
        token.sub = user?.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
} satisfies NextAuthConfig
