// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      sub?: string;
      first_name?: string;
      last_name?: string;
      username?: string;
      phone?: string;
      photo?: string;
      address?: string;
        accessToken?: string;
      refreshToken?: string;
      iat?: number;
      exp?: number;
      jti?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    accessToken?: string;
    refreshToken?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    phone?: string;
    photo?: string;
    address?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
    refreshToken?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    phone?: string;
    photo?: string;
    address?: string;
    role?: string;
    iat?: number;
    exp?: number;
    jti?: string;
  }
}

// 👇 Mana bu qismni qo‘shing — SignInResponse o‘rnini bosuvchi type
declare global {
  type SignInResponse = 
    | undefined
    | {
        error: string | undefined;
        status: number;
        ok: boolean;
        url: string | null;
      };
}

