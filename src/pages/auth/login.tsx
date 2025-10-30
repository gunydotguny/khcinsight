import { signIn, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Box, Typography } from "@mui/material";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [isSigningIn, setIsSigningIn] = useState(false);
    const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    useEffect(() => {
        // 이미 로그인된 사용자는 홈으로 리다이렉트
        getSession().then((session) => {
            if (session) router.replace("/");
        });
    }, [router]);

    const handleGoogleLogin = async () => {
        if (isSigningIn) return; // ✅ 중복 클릭 방지
        setIsSigningIn(true);

        try {
            // signIn()은 기본적으로 새 창을 띄우거나 리다이렉트 발생
            const result = await signIn("google", { callbackUrl, redirect: true });
            // redirect:true이면 여기서 이후 코드 실행 안됨
            // redirect:false 옵션을 줄 수도 있음
            if (result?.error) throw new Error(result.error);
        } catch (err) {
            console.error("로그인 실패:", err);
            setIsSigningIn(false); // ✅ 실패 시 다시 활성화
        }
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFCA00",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: 700,
                        fontFamily: `'Kakao', 'Pretendard', sans-serif`,
                    }}
                >
                    매일 5분 살펴보는 데일리 동향
                </Typography>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: 40,
                        lineHeight: "48px",
                        fontWeight: 700,
                        fontFamily: `'Kakao', 'Pretendard', sans-serif`,
                        mb: 3,
                        "& span": {
                            fontWeight: 400,
                        },
                    }}
                >
                    KHC <span>INSIGHT</span>
                </Typography>
                <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    startIcon={
                        <Box
                            sx={{
                                width: 24,
                                height: 24,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                src="https://developers.google.com/identity/images/g-logo.png"
                                alt="Google logo"
                                width={18}
                                height={18}
                            />
                        </Box>
                    }
                    sx={{
                        bgcolor: "#ffffff",
                        pointerEvents: isSigningIn ? "none" : "auto", // 클릭 막기
                        opacity: isSigningIn ? 0.6 : 1,
                    }}
                    disabled={isSigningIn} // ✅ MUI 기본 disabled도 함께 적용
                    onClick={handleGoogleLogin}
                >
                    {isSigningIn ? "로그인 중..." : "Google 계정으로 로그인"}
                </Button>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: 12,
                        mt: 2,
                    }}
                >
                    본 서비스는 @kakaohealthcare.com 계정만 사용 가능합니다.
                </Typography>
            </Box>
        </Box>
    );
}
