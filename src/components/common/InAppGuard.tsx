import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";

export default function InAppGuard({ children }: { children: React.ReactNode }) {
    const [isInApp, setIsInApp] = useState(false);
    const [isAndroid, setIsAndroid] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase();
        setIsInApp(/kakaotalk|instagram|fbav|line|naver|daum/i.test(ua));
        setIsAndroid(/android/i.test(ua));
    }, []);

    if (!isInApp) return <>{children}</>;

    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                px: 3,
                textAlign: "center",
                backgroundColor: "#FFCA00",
            }}
        >
            <Typography
                sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    mb: 2,
                    fontFamily: `'Pretendard', sans-serif`,
                }}
            >
                ⚠️ Google 로그인을 위해 <br /> Chrome 또는 Safari에서 열어주세요
            </Typography>
            <Typography sx={{ fontSize: 14, mb: 3 }}>
                오른쪽 상단 메뉴 → <b>"다른 브라우저로 열기"</b>를 선택하면 정상 이용이 가능합니다.
            </Typography>
            {isAndroid && (
                <Button
                    variant="contained"
                    onClick={() =>
                    (window.location.href =
                        "intent://" +
                        currentUrl.replace(/^https?:\/\//, "") +
                        "#Intent;scheme=https;package=com.android.chrome;end")
                    }
                >
                    Chrome으로 열기
                </Button>
            )}
        </Box>
    );
}
