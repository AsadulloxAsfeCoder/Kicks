import axios from "axios";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        try {
          const response = await axios.post("https://127.0.0.1:8000/api/accounts/Login/", {
            email: credentials.email,
            password: credentials.password,
          });
          const data = response.data;
          console.log(data);

          if (data.success) {
            return {
              id: data.user_id,
              email: data.email,
              username:data.username,
              accessToken: data.access,
              refreshToken: data.refresh,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 kun
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      const isTokenExpired = Date.now() / 1000 > (token.exp as number);
      if (isTokenExpired && token.refreshToken) {
        try {
          const response = await axios.post("https://127.0.0.1:8000/api/accounts/Login/refresh", {
            refresh: token.refreshToken,
          });
          const newTokens = response.data;
          token.accessToken = newTokens.access;
          token.exp = newTokens.exp;
        } catch (error) {
          console.log("Error during login:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
        session.user.sub = token.sub;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.iat = token.iat;
        session.user.exp = token.exp;
        session.user.jti = token.jti;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 15, // 15 kun
      }
    }
  }, // <- cookies dan keyin vergul qo'shildi
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};