import { TREND_CATEGORIES, TREND_CATEGORY_COLOR_MAP, TREND_CATEGORY_TEXT_COLOR_MAP } from "@/src/constants/categories";
import { Box, ButtonBase, Typography } from "@mui/material";
import { orange, blue, cyan, grey, pink, purple, amber } from "@mui/material/colors";
import ScheduleIcon from '@mui/icons-material/Schedule';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { PARTNER_EMOJI_MAP } from "@/src/constants/partners";
import Image from "next/image";
import { formatRelativeTime } from "@/src/utils";

export default function TrendListItem({
    item,
    isAll,
    selectedCategories,
    selectedSupply,
    selectedDemand,
}: {
    item: any;
    isAll: boolean;
    selectedCategories: string[];
    selectedSupply: string[];
    selectedDemand: string[];
}) {
    return <Box sx={{
        width: '100%',
        borderRadius: 0,
        border: `1px solid ${grey[300]}`,
        flexDirection: 'column',
        bgcolor: '#ffffff',
        p: 3,
        "@media (max-width: 768px)": {
            border: `initial`,
            borderBottom: `1px solid ${grey[300]}`,
        }
    }}>
        {/* 헤더 시작 */}
        <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
            {/* 분류 시작 */}
            <Box sx={{
                display: 'flex',
            }}>
                {TREND_CATEGORIES
                    .filter(job => item.job?.includes(job.label))
                    .map((job, index, arr) => {
                        const isSelected =
                            isAll || selectedCategories.includes(job.key);
                        const isLast = index === arr.length - 1;
                        return <Box key={index} sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Typography sx={{
                                fontSize: 12,
                                lineHeight: '16px',
                                color: grey[700],
                                fontWeight: 700,
                                '& span': {
                                    mr: 0.5
                                },
                                opacity: isSelected ? 1 : 0.3,
                            }}>
                                {`${job.label}`}
                            </Typography>
                            {!isLast && (
                                <Typography
                                    component="span"
                                    sx={{
                                        fontSize: 12,
                                        lineHeight: "16px",
                                        fontWeight: 700,
                                        color: grey[600],
                                        opacity: 1,
                                        ml: 0.25,
                                        mr: 0.25,
                                    }}
                                >
                                    ·
                                </Typography>
                            )}
                        </Box>
                    })}
            </Box>
            {/* 분류 끝 */}
            {/* 작성일시 시작 */}
            <Typography sx={{
                fontSize: 12,
                lineHeight: '16px',
                color: grey[500],
                // fontWeight: 600,
            }}>
                {formatRelativeTime(item.post_date ?? "")}
            </Typography>
            {/* 작성일시 끝 */}
            {/* 헤더 끝 */}
        </Box>
        {/* 제목 시작 */}
        <Typography sx={{
            fontSize: 16,
            lineHeight: '24px',
            fontWeight: 700,
            mt: 1.5,
            "@media (max-width: 768px)": {
                fontSize: 18,
                lineHeight: '26px',
                WebkitLineClamp: 2, // 표시할 줄 수
            },
            display: "-webkit-box",
            WebkitLineClamp: 2, // 표시할 줄 수
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            // wordBreak: 'break-all'
        }}>
            {item.news_title}
        </Typography>
        {/* 제목 끝 */}
        {/* 본문 시작 */}
        <Typography sx={{
            fontSize: 14,
            lineHeight: '22px',
            mt: 1.5,
            color: grey[700],
            display: "-webkit-box",
            WebkitLineClamp: 2, // 표시할 줄 수
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: 'break-all'
        }}>
            {item.summary}
        </Typography>
        {/* 본문 끝 */}
        {/* 수요 공급 시작 */}
        <Box sx={{
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 0.5,
            mt: 2,
            "@media (max-width: 768px)": {
                display: 'flex'
            }
        }}>
            <Infomations item={item} selectedDemand={selectedDemand} selectedSupply={selectedSupply} isAll={isAll} />
        </Box>
        {/* 수요 공급 끝 */}
        {/* 해시태그 시작 */}
        <Box sx={{
            flexWrap: 'wrap',
            mt: 2,
            '& *': {
                display: 'inline-flex'
            },
        }}>
            {item.type &&
                <Typography sx={{
                    fontSize: 14,
                    lineHeight: '20px',
                    color: blue[700],
                    mr: 1,
                    mb: 0.5,
                }}>
                    #{item.type ?? ""}
                </Typography>
            }
            {item.entity?.filter(Boolean).map((item: any, index: any) => {
                const label = typeof item === "string" ? item : item?.name ?? item?.label ?? "";
                return <Typography key={index} sx={{
                    fontSize: 14,
                    lineHeight: '20px',
                    color: blue[700],
                    mr: 1,
                    mb: 0.5,
                }}>
                    #{label ?? ""}
                </Typography>
            })}
        </Box>
        {/* 해시태그 끝 */}
        {/* 어펜즈 시작 */}
        <Box sx={{display:'none'}}>
            {/* 작성일시 시작 */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                mr: 'auto',
                // "@media (max-width: 768px)": {
                //     position: 'absolute',
                //     top: 20,
                //     right: 16,
                // }
            }}>
                <ScheduleIcon sx={{
                    width: 16,
                    height: 16,
                    color: grey[500],
                    fontWeight: 600,
                }} />
                <Typography sx={{
                    fontSize: 12,
                    lineHeight: '16px',
                    color: grey[500],
                    fontWeight: 600,
                    "@media (max-width: 768px)": {
                        fontSize: 14,
                        lineHeight: '20px',
                    }
                }}>
                    {item.post_date ?? ""}
                </Typography>
            </Box>
            {/* 작성일시 끝 */}
        </Box>
        {/* 어펜즈 끝 */}
    </Box >
}

function Infomations({ item, selectedDemand, selectedSupply, isAll }: { item: any, selectedDemand: any, selectedSupply: any, isAll: any }) {
    return <Box sx={{
        px: 2,
        pt: 2,
        pb: 1,
        borderRadius: 1,
        bgcolor: grey[100]
    }}>
        {/* 수요자 시작 */}
        <Box sx={{
            display: 'flex',
            gap: 1,
            alignItems: "flex-start",
        }}>
            {/* 수요자 라벨 시작 */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                width: 64,
            }}>
                <ShoppingCartIcon sx={{
                    width: 14,
                    height: 14,
                    color: grey[500],
                    fontWeight: 600
                }} />
                <Typography sx={{
                    fontSize: 12,
                    lineHeight: '16px',
                    color: grey[500],
                    fontWeight: 600
                }}>
                    수요자
                </Typography>
            </Box>
            {/* 수요자 라벨 끝 */}
            {/* 수요자 리스트 시작 */}
            <Box sx={{ display: "flex", flex: 1, flexWrap: "wrap" }}>
                {item.demand && item.demand.length > 0 ? (
                    <>
                        {item.demand?.map((data: any, index: number) => {
                            const label = typeof data === "string" ? data : data?.name ?? data?.label ?? "";
                            const emoji = PARTNER_EMOJI_MAP[label] ?? "";
                            const isLast = index === item.demand.length - 1;
                            if (!label) return null;

                            // ✅ 상위 selectedDemand 기반 opacity 계산
                            const hasFilter = selectedDemand.length > 0;
                            const isAll = !selectedDemand || selectedDemand.length === 0;
                            const isSelected = isAll || !hasFilter || selectedDemand.includes(label);
                            return (
                                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography
                                        sx={{
                                            fontSize: 12,
                                            lineHeight: "16px",
                                            // fontWeight: 700,
                                            mr: 0.25,
                                            mb: 1,
                                            opacity: isSelected ? 1 : 0.3,
                                            transition: "opacity 0.2s ease",
                                            "& .emoji": { mr: 0.5 },
                                            color: grey[600],
                                            fontWeight: 500,
                                        }}
                                    >
                                        <span className="emoji">{emoji}</span>
                                        {label}
                                    </Typography>

                                    {/* 쉼표는 항상 불투명 */}
                                    {!isLast && (
                                        <Typography
                                            component="span"
                                            sx={{
                                                fontSize: 12,
                                                lineHeight: "16px",
                                                // fontWeight: 700,
                                                color: grey[600],
                                                fontWeight: 500,
                                                opacity: 1,
                                                mr: 0.5,
                                                mb: 1,
                                            }}
                                        >
                                            ,
                                        </Typography>
                                    )}
                                </Box>
                            );
                        })}
                    </>
                ) : (
                    <Typography
                        sx={{
                            fontSize: 12,
                            lineHeight: "16px",
                            fontWeight: 700,
                            mr: 1,
                            mb: 1,
                            color: grey[500],
                        }}
                    >
                        -
                    </Typography>
                )}
            </Box>

            {/* 수요자 리스트 끝 */}
        </Box>
        {/* 수요자 끝 */}
        {/* 공급자 시작 */}
        <Box sx={{
            display: 'flex',
            gap: 1,
            alignItems: "flex-start",
        }}>
            {/* 공급자 라벨 시작 */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                width: 64,
            }}>
                <SellIcon sx={{
                    width: 14,
                    height: 14,
                    color: grey[500],
                    fontWeight: 600
                }} />
                <Typography sx={{
                    fontSize: 12,
                    lineHeight: '16px',
                    color: grey[500],
                    fontWeight: 600
                }}>
                    공급자
                </Typography>
            </Box>
            {/* 공급자 라벨 끝 */}
            {/* 공급자 리스트 시작 */}
            {/* 공급자 리스트 */}
            <Box sx={{ display: "flex", flex: 1, flexWrap: "wrap" }}>
                {item.supply && item.supply.length > 0 ? (
                    <>
                        {item.supply?.map((data: any, index: number) => {
                            const label = typeof data === "string" ? data : data?.name ?? data?.label ?? "";
                            const emoji = PARTNER_EMOJI_MAP[label] ?? "";
                            const isLast = index === item.supply.length - 1;
                            if (!label) return null;

                            // ✅ 상위 selectedSupply 기반 opacity 계산
                            const hasFilter = selectedSupply.length > 0;
                            const isAll = !selectedSupply || selectedSupply.length === 0;
                            const isSelected = isAll || !hasFilter || selectedSupply.includes(label);

                            return (
                                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography
                                        sx={{
                                            fontSize: 12,
                                            lineHeight: "16px",
                                            // fontWeight: 700,
                                            mr: 0.25,
                                            mb: 1,
                                            opacity: isSelected ? 1 : 0.3,
                                            transition: "opacity 0.2s ease",
                                            "& .emoji": { mr: 0.5 },
                                            color: grey[600],
                                            fontWeight: 500,
                                        }}
                                    >
                                        <span className="emoji">{emoji}</span>
                                        {label}
                                    </Typography>

                                    {/* 쉼표는 항상 불투명 */}
                                    {!isLast && (
                                        <Typography
                                            component="span"
                                            sx={{
                                                fontSize: 12,
                                                lineHeight: "16px",
                                                // fontWeight: 700,
                                                color: grey[600],
                                                fontWeight: 500,
                                                opacity: 1,
                                                mr: 0.5,
                                                mb: 1,
                                            }}
                                        >
                                            ,
                                        </Typography>
                                    )}
                                </Box>
                            );
                        })}
                    </>
                ) : (
                    <Typography
                        sx={{
                            fontSize: 12,
                            lineHeight: "16px",
                            fontWeight: 700,
                            mr: 1,
                            mb: 1,
                            color: grey[500],
                        }}
                    >
                        -
                    </Typography>
                )}
            </Box>
            {/* 공급자 리스트 끝 */}
        </Box>
        {/* 공급자 끝 */}
    </Box>
}