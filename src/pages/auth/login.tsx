import { signIn, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Box, Typography } from "@mui/material";
import Image from "next/image";
import InAppGuard from "@/src/components/common/InAppGuard";

export default function LoginPage() {
    const router = useRouter();
    const [isSigningIn, setIsSigningIn] = useState(false);

    useEffect(() => {
        // 이미 로그인된 사용자는 홈으로 리다이렉트
        getSession().then((session) => {
            if (session) router.replace("/home");
        });
    }, [router]);

    const handleGoogleLogin = () => {
        if (isSigningIn) return;
        setIsSigningIn(true);

        const ua = navigator.userAgent.toLowerCase();
        const isInApp =
            /kakaotalk|instagram|fbav|line|naver|daum|whale/i.test(ua);
        const isAndroid = /android/i.test(ua);
        const isIOS = /iphone|ipad|ipod/i.test(ua);

        if (isInApp) {
            alert(
                "인앱 브라우저에서는 로그인이 원활하지 않습니다.\nSafari 또는 Chrome으로 다시 열어주세요."
            );
            if (isAndroid) {
                window.location.href =
                    "intent://" +
                    window.location.host +
                    "/auth/login#Intent;scheme=https;package=com.android.chrome;end";
            } else if (isIOS) {
                window.location.href = "https://" + window.location.host + "/auth/login";
            }
            setIsSigningIn(false);
            return;
        }

        // ✅ 정상적인 구글 로그인 redirect (NextAuth에서 자동처리)
        signIn("google", { callbackUrl: "/home" });
    };


    return (
        <InAppGuard>
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
                            pointerEvents: isSigningIn ? "none" : "auto",
                            opacity: isSigningIn ? 0.6 : 1,
                        }}
                        disabled={isSigningIn}
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
        </InAppGuard>
    );
}
