import { Box, Button, ButtonBase, Menu, MenuItem, Typography } from "@mui/material"
import { useRouter } from "next/router";
import { grey } from "@mui/material/colors";
import { useSession, signOut } from "next-auth/react";
import Layout from "../common/Layout";
import Image from "next/image";
import NavBarItem from "./NavBarItem";
import { useState } from "react";
import { PAGES } from "@/src/constants/pages";

export default function NavBar() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        handleCloseMenu();
        console.log("로그아웃 실행");
        signOut({ callbackUrl: "/auth/login" })
    };
    if (router.pathname === '/' || router.pathname === '/auth/login') return null;
    return <>
        {/* 상단네비 / 하단네비 */}
        <Box sx={{
            height: 80,
            '@media (max-width: 768px)': {
                display: "none"
            }
        }}></Box>
        <Box sx={{
            width: '100%',
            backgroundColor: '#ffffff',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            borderBottom: `1px solid ${grey[300]}`,
            '@media (max-width: 768px)': {
                position: 'fixed',
                top: 'initial',
                left: 0,
                right: 0,
                bottom: 0,
                borderRight: 'none',
                borderBottom: `none`,
                borderTop: `1px solid ${grey[300]}`,
            },
        }}>
            <Box sx={{
                px: 10,
                minWidth: 1280,
                maxWidth: 1280,
                mx: "auto",
                '@media (max-width: 768px)': {
                    px: 0,
                    minWidth: 'initial',
                    maxWidth: 'initial',
                    mx: "initial",
                },
            }}>
                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '@media (max-width: 768px)': {
                        height: 'initial',
                    }
                }}>
                    {/* 로고 */}
                    <ButtonBase
                        disableRipple
                        onClick={() => { router.push('/home') }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            '@media (max-width: 768px)': {
                                display: 'none'
                            }
                        }}>
                        <Image
                            src="/images/favicon/apple-icon-180x180.png" // public/logo.png
                            alt=""
                            width={20}
                            height={20}
                            unoptimized
                            style={{
                                width: 20,
                                height: 20,
                                marginRight: 8,
                                borderRadius: 4,
                            }}
                        />
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: 20,
                                    lineHeight: '20px',
                                    fontWeight: 700,
                                    fontFamily: `'Kakao', 'Pretendard', sans-serif`,
                                    '& span': {
                                        fontWeight: 400,
                                        ml: 0.5,
                                    }
                                }}
                            >
                                KHC<span>INSIGHT</span>
                            </Typography>
                        </Box>
                    </ButtonBase>
                    {/* 네비바 */}
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        '@media (max-width: 768px)': {
                            position: 'initial',
                            top: 'initial',
                            left: 'initial',
                            right: 'initial',
                            bottom: 'initial',
                            width: '100%',
                            gap: 0,
                        }
                    }}>
                        <Box sx={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            mx: -2,
                        }}>
                            {PAGES.map((item, index) => {
                                return <NavBarItem key={index} {...item} />
                            })}
                        </Box>
                    </Box>
                    {/* 유저프로필 */}
                    <ButtonBase
                        disableRipple
                        onClick={handleOpenMenu}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            '@media (max-width: 768px)': {
                                display: 'none'
                            }
                        }}>
                        {/* 썸네일 */}
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: 40,
                                width: 32,
                                height: 32,
                                overflow: 'hidden',
                                bgcolor: grey[100]
                            }}>
                            <Box>
                                {session?.user?.image && session?.user?.image !== "" ?
                                    <Image
                                        src={session?.user?.image ? `${session?.user?.image}` : ""} // public/logo.png
                                        alt=""
                                        width={20}
                                        height={20}
                                        unoptimized
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                    : <></>
                                }
                            </Box>
                        </Box>
                        {/* 유저명 */}
                        <Box sx={{
                        }}>
                            <Typography sx={{
                                fontSize: 12,
                                lineHeight: '16px',
                                fontWeight: 700
                            }}>
                                {session?.user?.name ?? ""}
                            </Typography>
                            {/* <ButtonBase onClick={handleSignOut} sx={{
                            mt: 0.5,
                        }}>
                            <Typography sx={{
                                fontSize: 12,
                                lineHeight: '16px',
                                color: grey[500]
                            }}>
                                로그아웃
                            </Typography>
                        </ButtonBase> */}
                        </Box>
                    </ButtonBase>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        onClick={handleCloseMenu}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        sx={{
                            '.MuiPaper-root': {
                                borderRadius: 1
                            }
                        }}
                    >
                        <MenuItem onClick={handleLogout} sx={{
                            borderRadius: 1
                        }}>
                            <Typography color="error">로그아웃</Typography>
                        </MenuItem>
                    </Menu>
                </Box >
            </Box>
        </Box >
    </>
}
