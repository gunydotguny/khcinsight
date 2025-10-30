import { Box, SxProps } from "@mui/material";

export default function Layout({ children, sx }: { children: React.ReactNode, sx?: SxProps }) {
    return (
        <Box sx={{
            position: 'relative',
            minWidth: 800,
            maxWidth: 1200,
            px: 3,
            mx: "auto",
            '@media (max-width: 768px)': {
                width: '100%',
                minWidth: 'initial',
                maxWidth: 'initial',
                mx: "initial",
            },
        }}>
            <Box sx={{
                ...sx,
            }}>
                {children}
            </Box>
        </Box>
    );
}
