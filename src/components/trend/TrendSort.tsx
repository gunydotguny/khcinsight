import { useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";

export default function TrendSort({ sort, setSort }: { sort: string; setSort: (v: string) => void }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (value?: string) => {
        setAnchorEl(null);
        if (value) setSort(value);
    };

    return (
        <Box>
            <Button
                variant="outlined"
                onClick={handleClick}
                endIcon={<ArrowDropDown sx={{ ml: 'auto' }} />}
                sx={{
                    justifyContent: 'space-between',
                    textTransform: "none",
                    color: blueGrey[800],
                    borderColor: blueGrey[100],
                    fontWeight: 400,
                    fontSize: 14,
                    px: 1.5,
                    minHeight: `32px !important`,
                    height: `32px !important`,
                    borderRadius: 1,
                    width: 96,
                }}
            >
                {sort === "latest" ? "최신순" : "오래된순"}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                elevation={4}
                onClose={() => handleClose()}
                sx={{
                    '.MuiPaper-root': {
                        borderRadius: `8px !important`,
                        width: 96
                    }
                }}
            >
                <MenuItem
                    onClick={() => handleClose("latest")}
                    selected={sort === "latest"}
                    sx={{
                        fontWeight: sort === "latest" ? 700 : 400,
                        height: `32px !important`,
                        minHeight: `32px !important`,
                    }}
                >
                    최신순
                </MenuItem>
                <MenuItem
                    onClick={() => handleClose("oldest")}
                    selected={sort === "oldest"}
                    sx={{
                        fontWeight: sort === "oldest" ? 700 : 400,
                        height: `32px !important`,
                        minHeight: `32px !important`,
                    }}
                >
                    오래된순
                </MenuItem>
            </Menu>
        </Box>
    );
}
