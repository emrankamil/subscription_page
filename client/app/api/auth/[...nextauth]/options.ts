import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

// Define the options type for NextAuth
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      profile(profile: any) {
        // console.log("Profile Google: ", profile);

        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:8080/User/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: any;
      trigger?: "signIn" | "signUp" | "update";
      session?: any;
    }) {
      if (trigger === "update") {
        console.log("Trigger: ", trigger);
        return { ...token, ...session };
      }
      return { ...token, ...user };
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token.user) session.user = token.user;
      if (token.token) session.token = token.token;
      if (token.iat) session.iat = token.iat;
      if (token.exp) session.exp = token.exp;
      if (token.jti) session.jti = token.jti;

      // console.log("Session: ", session, "Token: ", token);
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: true,
};
