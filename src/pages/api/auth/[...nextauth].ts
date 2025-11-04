import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: any = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      const email = user.email ?? "";
      console.log("🧩 로그인 시도:", email);

      // ✅ 카카오헬스케어 도메인만 허용
      if (email.endsWith("@kakaohealthcare.com")) {
        console.log("✅ 로그인 허용:", email);
        return true;
      } else {
        console.warn("🚫 로그인 거부:", email);
        // 🚨 에러 페이지로 리디렉트
        return "/auth/error?reason=unauthorized_domain";
      }
    },
    async session({ session, token }: any) {
      session.user.email = token.email;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  basePath: "/api/auth",
  trustHost: true,
};

export default async function auth(req: any, res: any) {
  return await NextAuth(req, res, authOptions);
}
