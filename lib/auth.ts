import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // Find user in your database
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        // Compare password
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        // Return user object (omit password)
        return {
          id: user.user_id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = (user as any).userType;
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userType = token.userType;
        session.user.id = token.id;
        session.user.email = token.email ?? "";
      }
      return session;
    },
  },
}; 