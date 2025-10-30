import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: any = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }: { user: any }) {
            // ✅ kakaohealthcare.com 도메인만 허용
            if (user.email && user.email.endsWith("@kakaohealthcare.com")) {
                return true;
            }
            return false;
        },
        async session({ session, token }: { session: any, token: any }) {
            // 세션에 이메일 저장
            session.user.email = token.email;
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 7, // 7일 유지
    },
    pages: {
        signIn: "/auth/login", // 커스텀 로그인 페이지 가능
    },
};

export default NextAuth(authOptions);
