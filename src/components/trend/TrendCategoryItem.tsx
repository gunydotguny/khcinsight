
import { TREND_CATEGORY_COLOR_MAP, TrendCategoryItemProps } from "@/src/constants/categories";
import { ButtonBase, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";


export function TrendCategoryItem({ item, focused, onClick }: { item: TrendCategoryItemProps, focused?: boolean, onClick: any }) {
    const color = TREND_CATEGORY_COLOR_MAP[item.label] || grey[200];
    return <ButtonBase
        onClick={onClick}
        sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 4,
            // border: focused ? `2px solid ${blueGrey[900]}` : `1px solid ${blueGrey[100]}`,
            bgcolor: focused ? color : '#ffffff',
            border: `1px solid ${color == '#ffffff' ? grey[100] : color}`,
            mr: 1,
            mb: 1,
        }}>
        <Typography
            sx={{
                fontSize: 14,
                fontWeight: 700,
                color: focused ? grey[900] : grey[500],
            }}
        >
            {item.label}
        </Typography>
    </ButtonBase>
}




// function TrendCategoryItem({ item, focused }: { item: TrendCategoryItemProps, focused?: boolean }) {
//     const color = TREND_CATEGORY_COLOR_MAP[item.label] || grey[200];
//     return <ButtonBase sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         px: 2,
//         "@media (max-width: 768px)": {
//             px: 1,
//         }
//     }}>
//         <Box sx={{
//             width: '56px',
//             height: '56px',
//             borderRadius: 20,
//             bgcolor: color,
//             border: focused ? `2px solid ${blueGrey[900]}` : `1px solid ${blueGrey[100]}`,
//             "@media (max-width: 768px)": {
//                 width: '80px',
//                 height: '80px',
//             }
//         }}>
//         </Box>
//         <Typography
//             sx={{
//                 fontSize: 12,
//                 lineHeight: '16px',
//                 fontWeight: focused ? 700 : 500,
//                 mt: 0.5,
//                 mx: -2,
//                 "@media (max-width: 768px)": {
//                     fontSize: 10,
//                     lineHeight: '14px',
//                       mx: -1,
//                 }
//             }}
//         >
//             {item.label}
//         </Typography>
//     </ButtonBase>
// }