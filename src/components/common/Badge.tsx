import { Box, Typography } from "@mui/material";
import {
    grey,
    blueGrey,
} from "@mui/material/colors";
import { TREND_CATEGORY_COLOR_MAP } from "../../constants/categories";

export default function Badge({ category }: { category: string }) {
    const color = TREND_CATEGORY_COLOR_MAP[category] || grey[200];

    return (
        <Box
            sx={{
                display: "inline-block",
                px: 0.75,
                py: 0.25,
                borderRadius: 0.5,
                backgroundColor: color,
            }}
        >
            <Typography
                sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: blueGrey[900]
                }}
            >
                {category}
            </Typography>
        </Box>
    );
}
