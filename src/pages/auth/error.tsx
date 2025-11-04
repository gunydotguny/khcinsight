import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

export default function AuthErrorPage() {
    const router = useRouter();
    const reason = router.query.reason as string;

    const message =
        reason === "unauthorized_domain"
            ? "카카오헬스케어 이메일(@kakaohealthcare.com)만 로그인할 수 있습니다."
            : "로그인 중 오류가 발생했습니다.";

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
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    p: 3,
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: 36,
                        fontWeight: 700,
                        mb: 2,
                        fontFamily: `'Kakao', 'Pretendard', sans-serif`,
                    }}
                >
                    로그인 오류
                </Typography>

                <Typography
                    sx={{
                        fontSize: 16,
                        mb: 4,
                        fontFamily: `'Kakao', 'Pretendard', sans-serif`,
                    }}
                >
                    {message}
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => router.push("/auth/login")}
                    sx={{
                        bgcolor: "#000",
                        color: "#fff",
                        fontWeight: 600,
                        "&:hover": {
                            bgcolor: "#222",
                        },
                    }}
                >
                    로그인으로 돌아가기
                </Button>
            </Box>
        </Box>
    );
}
