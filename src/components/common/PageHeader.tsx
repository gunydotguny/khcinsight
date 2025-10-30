import { Box, ButtonBase, Menu, MenuItem, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PageHeader({ title, children }: { title: React.ReactNode, children?: React.ReactNode }) {
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
    return <Box sx={{
        py: 3,
        mx: 3,
        '@media (max-width: 768px)': {
            mx: 0,
            px: 2,
            py: 2
        },
        display: 'flex',
    }}>
        <Typography sx={{
            fontSize: 24,
            lineHeight: '32px',
            fontWeight: 700,
        }}>
            {title}
        </Typography>
        <Box sx={{
            px: 3,
        }}>
            {children}
        </Box>
        {/* 유저프로필 */}
        <ButtonBase
            disableRipple
            onClick={handleOpenMenu}
            sx={{
                display: 'none',
                alignItems: 'center',
                gap: 1,
                '@media (max-width: 768px)': {
                    display: 'flex'
                },
                ml: 'auto',
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
    </Box>
}