import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ここにバックエンドAPI（C#）への通信処理を記述
        // 成功すればユーザー情報(JWT含む)を返し、失敗すれば null を返す
      },
    }),
  ],
  callbacks: {
    // バックエンドから受け取ったトークンをセッションに保持する処理
  },
};
