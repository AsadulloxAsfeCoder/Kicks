// types/auth.ts
export type SignInResponse = {
  error?: string;
  status: number;
  ok: boolean;
  url: string | null;
};
