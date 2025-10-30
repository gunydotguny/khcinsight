import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("🧩 middleware 실행됨:", req.nextUrl.pathname);
  },
  {
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"],
};
