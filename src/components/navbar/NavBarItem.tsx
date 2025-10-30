import { Box, ButtonBase, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";

export default function NavBarItem(item: any) {
    const router = useRouter();
    const focused = router.asPath.startsWith(item.path);
    const handleClick = () => {
        router.push(item.path);
    }
    return <ButtonBase
        onClick={handleClick}
        sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            height: '100%',
            px: 2,
            ' .MuiTouchRipple-root': {
                display: 'none',
            },
            '@media (max-width: 768px)': {
                ' .MuiTouchRipple-root': {
                    display: 'initial',
                },
                flex: 1,
                height: "64px",
                px: 0,
                py: 0,
            },
            ' *': {
                transition: 'all 0.3s ease',
            },
        }}>
        <Box sx={{
            mt: 0.25,
            width: 24,
            height: 24,
            display: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            ' *': {
                transition: 'all 0.3s ease',
                fontSize: `28px !important`,
                color: focused ? grey[900] : grey[400]
            },
            '@media (max-width: 768px)': {
                display: 'flex'
            }
        }}>
            {item.icon}
        </Box>
        <Box sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            '@media (max-width: 768px)': {
                height: 'initial',
                mt: 0.5,
            }
        }}>
            {/* 라벨 */}
            <Typography sx={{
                fontSize: 16,
                lineHeight: '24px',
                fontWeight: 700,
                transition: 'all 0.3s ease',
                color: focused ? grey[900] : grey[400],
                // fontFamily: `'Kakao', 'Pretendard', sans-serif`,
                '@media (max-width: 768px)': {
                    fontSize: 12,
                    lineHeight: '16px',
                    color: focused ? grey[900] : grey[400],
                },
            }}>
                {item.label}
            </Typography>
            {/* 하단 인디케이터 */}
            <Box sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                bgcolor: focused ? grey[900] : 'transparent',
                '@media (max-width: 768px)': {
                    display: 'none',
                },
                height: 4,
                zIndex: 99,
            }} />
        </Box>
    </ButtonBase>
}
