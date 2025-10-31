import { useState } from "react";
import { Box, ButtonBase, Menu, MenuItem, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwapVertIcon from '@mui/icons-material/SwapVert';

export default function TrendSortButton({
    sort,
    setSort,
}: {
    sort: string;
    setSort: (v: string) => void;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSortChange = (value: string) => {
        setSort(value);
        handleMenuClose();
    };

    return (
        <>
            <ButtonBase
                onClick={handleMenuOpen}
                sx={{
                    border: `1px solid ${grey[400]}`,
                    px: 1.5,
                    py: 1,
                    borderRadius: 0.5,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <SwapVertIcon
                    sx={{
                        width: 16,
                        height: 16,
                        mr: 0.5,
                    }} />
                <Typography
                    sx={{
                        fontSize: 14,
                        lineHeight: "20px",
                    }}
                >
                    {sort === "latest" ? "최신순" : "오래된순"}
                </Typography>
            </ButtonBase>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                sx={{
                    ' .MuiPaper-root': {
                        borderRadius: 0.5,
                    },
                    ' .MuiList-root': {
                        py: 0,
                    }
                }}
            >
                <MenuItem
                    onClick={() => handleSortChange("latest")}
                    selected={sort === "latest"}
                    sx={{
                        fontWeight: sort === "latest" ? `700 !important` : 400
                    }}
                >
                    최신순
                </MenuItem>
                <MenuItem
                    onClick={() => handleSortChange("oldest")}
                    selected={sort === "oldest"}
                    sx={{
                        fontWeight: sort === "oldest" ? `700 !important` : 400
                    }}
                >
                    오래된순
                </MenuItem>
            </Menu>
        </>
    );
}
