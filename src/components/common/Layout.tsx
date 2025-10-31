import { Box } from "@mui/material";

export default function Layout({ children }: { children?: any }) {
    return (
        <Box sx={{
            position: 'relative',
            minWidth: 1280,
            maxWidth: 1280,
            mx: "auto",
            '@media (max-width: 768px)': {
                width: '100%',
                minWidth: 'initial',
                maxWidth: 'initial',
                mx: "initial",
            },
        }}>
            {children}
        </Box>
    );
}
