import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log("🔧 NEXTAUTH_URL (server start):", process.env.NEXTAUTH_URL);

export const authOptions: any = {
  debug: true, // 🔍 OAuth 과정 전체 로그 표시
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
      console.log("✅ 로그인 허용:", user.email);
      return true;
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
  },
  // ✅ 여기서 환경변수 기반으로 강제 redirect 설정
  // NextAuth가 OAuth redirect_uri를 생성할 때 이 값을 절대 기준으로 삼습니다.
  basePath: "/api/auth",
  // ✅ 이게 핵심: NextAuth에 “정확한 origin”을 직접 주입
  // (process.env.NEXTAUTH_URL이 잘 안 먹을 때 명시적으로 고정)
  trustHost: true,
};

export default async function auth(req: any, res: any) {
  console.log("🔍 [NextAuth Init] URL Origin =", process.env.NEXTAUTH_URL);
  return await NextAuth(req, res, authOptions);
}
