import Layout from "@/src/components/common/Layout";
import User from "@/src/components/common/User";
import { Box, ButtonBase, Typography } from "@mui/material";

export default function HomePage() {
    return <Layout>
        {/* 페이지 헤더 */}
        <Box
            sx={{
                position: "relative",
                display: "flex",
                py: 5,
                px: 10,
                "@media (max-width: 768px)": {
                    flexDirection: "column",
                    py: 3,
                    px: 3,
                    position: "sticky",
                    top: -56,
                    zIndex: 9999,
                    bgcolor: "#ffffff",
                },
            }}
        >
            {/* 제목 */}
            <Typography
                sx={{
                    fontSize: 24,
                    lineHeight: "32px",
                    fontWeight: 700,
                    width: 192,
                    "@media (max-width: 768px)": { width: "initial" },
                }}
            >
                홈
            </Typography>
            {/* 모바일 유저 */}
            <Box
                sx={{
                    display: "none",
                    "@media (max-width: 768px)": {
                        display: "flex",
                        position: "absolute",
                        top: 24,
                        right: 24,
                        zIndex: 999,
                    },
                }}
            >
                <User />
            </Box>
        </Box>
    </Layout >
}