import { TREND_CATEGORIES, TREND_CATEGORY_COLOR_MAP, TREND_CATEGORY_TEXT_COLOR_MAP } from "@/src/constants/categories";
import { Box, ButtonBase, Typography } from "@mui/material";
import { orange, blue, cyan, grey, pink, purple, amber } from "@mui/material/colors";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { PARTNER_EMOJI_MAP } from "@/src/constants/partners";
import Image from "next/image";

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
        display: 'flex',
        borderRadius: 1,
        border: `1px solid ${grey[300]}`,
        "@media (max-width: 768px)": {
            width: '100%',
            borderRadius: 0,
            border: `initial`,
            borderBottom: `1px solid ${grey[300]}`,
            flexDirection: 'column',
        }

    }}>
        {/* 좌측 시작 */}
        <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            "@media (max-width: 768px)": {
                flex: 'initial'
            }
        }}>
            {/* 좌상 영역 시작 */}
            <Box sx={{
                flex: 1,
                p: 2,
                "@media (max-width: 768px)": {
                    flex: 'initial'
                }
            }}>
                {/* 분류 시작 */}
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                }}>
                    {TREND_CATEGORIES
                        .filter(job => item.job?.includes(job.label)) // ① item.job에 포함된 항목만 추림
                        .map((job, index, arr) => {                // ② 순서대로 map
                            // const isLast = index === arr.length - 1;
                            // const color = TREND_CATEGORY_TEXT_COLOR_MAP[job.label] || grey[300];
                            // return (
                            //     <Typography
                            //         key={job.key}
                            //         sx={{
                            //             fontSize: 12,
                            //             lineHeight: "16px",
                            //             fontWeight: 700,
                            //             color: color,
                            //             "& span": { mx: 0.5, color: grey[400] },
                            //         }}
                            //     >
                            //         {job.label}
                            //         {!isLast && <span>•</span>}
                            //     </Typography>
                            // );
                            const bgColor = TREND_CATEGORY_TEXT_COLOR_MAP[job.label]
                            const color = TREND_CATEGORY_COLOR_MAP[job.label]
                            const isSelected =
                                isAll || selectedCategories.includes(job.key);
                            return <ButtonBase key={index}
                                sx={{
                                    bgcolor: amber[500],
                                    borderRadius: 0.5,
                                    px: 0.75,
                                    height: 20,
                                    opacity: isSelected ? 1 : 0.3,
                                }}
                            >
                                <Typography sx={{
                                    fontSize: 10,
                                    lineHeight: '14px',
                                    color: grey[900],
                                    fontWeight: 700,
                                    '& span': {
                                        mr: 0.5
                                    },
                                    "@media (max-width: 768px)": {
                                        fontSize: 10,
                                        lineHeight: '14px',
                                    },
                                }}>
                                    {`${job.label}`}
                                </Typography>
                            </ButtonBase>

                        })}

                </Box>
                {/* 분류 끝 */}
                {/* 제목 시작 */}
                <Typography sx={{
                    fontSize: 18,
                    lineHeight: '26px',
                    fontWeight: 700,
                    mt: 1.5,
                    "@media (max-width: 768px)": {
                        fontSize: 16,
                        lineHeight: '24px',
                    },
                    display: "-webkit-box",
                    WebkitLineClamp: 2, // 표시할 줄 수
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>
                    {item.news_title}
                </Typography>
                {/* 제목 끝 */}
                {/* 본문 시작 */}
                <Typography sx={{
                    fontSize: 14,
                    lineHeight: '20px',
                    mt: 1,
                    color: grey[700]
                }}>
                    {item.summary}
                </Typography>
                {/* 본문 끝 */}
                {/* 해시태그 시작 */}
                <Box sx={{
                    flexWrap: 'wrap',
                    mt: 1,
                    mb: -0.5,
                    '& *': {
                        display: 'inline-flex'
                    }
                }}>
                    {item.type &&
                        <Typography sx={{
                            fontSize: 12,
                            lineHeight: '16px',
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
                            fontSize: 12,
                            lineHeight: '16px',
                            color: blue[700],
                            mr: 1,
                            mb: 0.5,
                        }}>
                            #{label ?? ""}
                        </Typography>
                    })}
                </Box>
                {/* 해시태그 끝 */}
            </Box>
            {/* 좌상 영역 끝 */}
            {/* 좌하 영역 시작 */}
            <Box sx={{
                display: 'flex',
                gap: 2,
                borderTop: `1px solid ${grey[300]}`,
                p: 2,
                "@media (max-width: 768px)": {
                    borderTop: 'none',
                    mt: -2,
                    flexDirection: 'column',
                    gap: 2,
                }
            }}>
                {/* 작성일시 시작 */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    mr: 'auto'
                }}>
                    <CalendarTodayIcon sx={{
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
                        {item.post_date ?? ""}
                    </Typography>
                </Box>
                {/* 작성일시 끝 */}
                {/* 추가 버튼 영역 시작 */}
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    "@media (max-width: 768px)": {
                        width: '100%',
                        gap: 1,
                    }
                }}>
                    {/* 뉴스 원문 링크 시작 */}
                    <ButtonBase
                        onClick={() => {
                            if (item.news_url) {
                                window.open(item.news_url, "_blank", "noopener,noreferrer");
                            }
                        }}
                        sx={{
                            display: item.news_url ? 'flex' : 'none',
                            alignItems: 'center',
                            gap: 0.75,
                            "@media (max-width: 768px)": {
                                flex: 1,
                                // justifyContent: 'flex-start',
                                border: `1px solid ${grey[400]}`,
                                borderRadius: 0.5,
                                height: 32,
                            }
                        }}>
                        <ArrowOutwardIcon sx={{
                            width: 14,
                            height: 14,
                            color: grey[900],
                            fontWeight: 600
                        }} />
                        <Typography sx={{
                            fontSize: 12,
                            lineHeight: '16px',
                            color: grey[900],
                            // fontWeight: 600
                        }}>
                            뉴스 원문 보기
                        </Typography>
                    </ButtonBase>
                    {/* 뉴스 원문 링크 끝 */}
                    {/* 아지트 링크 시작 */}
                    <ButtonBase
                        onClick={() => {
                            if (item.source_url) {
                                window.open(item.source_url, "_blank", "noopener,noreferrer");
                            }
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.75,
                            "@media (max-width: 768px)": {
                                flex: 1,
                                // justifyContent: 'flex-start',
                                border: `1px solid ${grey[400]}`,
                                borderRadius: 0.5,
                                height: 32,
                            }
                        }}>
                        <Image
                            src={"/logo/agit.png"} // public/logo.png
                            alt=""
                            width={14}
                            height={14}
                            unoptimized
                            style={{
                                width: 14,
                                height: 14,

                            }}
                        />
                        <Typography sx={{
                            fontSize: 12,
                            lineHeight: '16px',
                            color: grey[900],
                            // fontWeight: 600
                        }}>
                            아지트에서 보기
                        </Typography>
                    </ButtonBase>
                    {/* 아지트 링크 끝 */}
                </Box>
                {/* 추가 버튼 영역 끝 */}
            </Box>
            {/* 좌하 영역 끝 */}
        </Box>
        {/* 좌측 끝 */}
        {/* 우측 시작 */}
        <Box sx={{
            width: 240,
            pt: 2,
            px: 2,
            pb: 1,
            borderLeft: `1px solid ${grey[300]}`,
            "@media (max-width: 768px)": {
                width: '100%',
                borderLeft: 'none',
                pt: 0,
                pb: 2,
            }
        }}>
            {/* 모바일 소제목 시작 */}
            {/* 모바일 소제목 끝 */}
            {/* 우측 컨테이너 시작 */}
            <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 1,
                "@media (max-width: 768px)": {
                    width: '100%',
                    borderRadius: 1,
                    bgcolor: grey[100],
                    pt: 2,
                    px: 2,
                    pb: 1,
                    gap: 1,
                }
            }}>
                {/* 수요자 시작 */}
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: "flex-start",
                    "@media (max-width: 768px)": {
                        flex: 1,
                    }
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
                                    const isSelected = isAll || !hasFilter || selectedDemand.includes(label);

                                    return (
                                        <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    lineHeight: "16px",
                                                    fontWeight: 700,
                                                    mr: 0.25,
                                                    mb: 1,
                                                    opacity: isSelected ? 1 : 0.3,
                                                    transition: "opacity 0.2s ease",
                                                    "& .emoji": { mr: 0.5 },
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
                                                        fontWeight: 700,
                                                        color: grey[700],
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
                    "@media (max-width: 768px)": {
                        flex: 1,
                    }
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
                                    const isSelected = isAll || !hasFilter || selectedSupply.includes(label);

                                    return (
                                        <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    lineHeight: "16px",
                                                    fontWeight: 700,
                                                    mr: 0.25,
                                                    mb: 1,
                                                    opacity: isSelected ? 1 : 0.3,
                                                    transition: "opacity 0.2s ease",
                                                    "& .emoji": { mr: 0.5 },
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
                                                        fontWeight: 700,
                                                        color: grey[700],
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
            {/* 우측 컨테이너 끝 */}
        </Box>
        {/* 우측 끝 */}
    </Box>
}