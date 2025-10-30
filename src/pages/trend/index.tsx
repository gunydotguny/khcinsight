import Layout from "@/src/components/common/Layout";
import PageHeader from "@/src/components/common/PageHeader";
import { Box, Button, ButtonBase, CircularProgress, Typography } from "@mui/material";
import { amber, blue, blueGrey, grey, purple } from "@mui/material/colors";
import { useRouter } from "next/router";
import { TREND_CATEGORIES, TREND_CATEGORY_COLOR_MAP, TrendCategoryItemProps } from "@/src/constants/categories";
import { useEffect, useState } from "react";
import { fetcher, PAGE_SIZE } from "@/src/lib/fetcher";
import useSWRInfinite from "swr/infinite";
import Image from "next/image";
import TrendSort from "@/src/components/trend/TrendSort";
import Badge from "@/src/components/common/Badge";
import { TrendCategoryItem } from "@/src/components/trend/TrendCategoryItem";
import TrendCard from "@/src/components/trend/TrendCard";

export default function TrendPage() {
    const [q, setQ] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [isAll, setIsAll] = useState(true);
    const [sort, setSort] = useState("latest");

    const getKey = (pageIndex: number, prev: any) => {
        if (prev && !prev.hasMore) return null;

        const params = new URLSearchParams({
            page: String(pageIndex + 1),
            pageSize: String(PAGE_SIZE),
            ...(q ? { q } : {}),
            ...(isAll ? {} : { category: categories.join(",") }), // ✅ 전체 모드면 카테고리 제외
            ...(sort ? { sort } : {}),
        });

        return `/api/trend?${params.toString()}`;
    };

    const { data, setSize, isValidating } = useSWRInfinite(getKey, fetcher);
    const trendList = data ? data.flatMap((page: any) => page.results) : [];
    const total = data?.[0]?.total || 0;
    const hasMore = data?.[data.length - 1]?.hasMore;

    const handleScroll = () => {
        if (!hasMore || isValidating) return;
        const scrollY = window.scrollY + window.innerHeight;
        const threshold = document.body.offsetHeight - 200;
        if (scrollY > threshold) setSize((s: any) => s + 1);
    };

    // 무한스크롤 트리거
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });
    //카테고리
    const handleClickCategoryAll = () => {
        setIsAll(true);
        setCategories([]);
    }
    return <Layout>
        {/* 페이지 헤더 */}
        <PageHeader
            title={"데일리 트렌드"}
        >
            <Box sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'flex-wrap',
            }}>
                <ButtonBase
                    onClick={handleClickCategoryAll}
                    sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 20,
                        bgcolor: isAll ? grey[900] : "#ffffff",
                        color: isAll ? "#ffffff" : grey[500],
                        border: `1px solid ${grey[200]}`,
                        transition: "0.3s ease",
                    }}
                >
                    <Typography sx={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: isAll ? '#ffffff' : blueGrey[500],
                    }}>전체</Typography>
                </ButtonBase>
                {TREND_CATEGORIES.map((item, index) => {
                    const focused = categories.includes(item.key);
                    function handleCategoryClick(key: string) {
                        if (key === "all") {
                            setIsAll(true);
                            setCategories([]);
                            return;
                        }
                        setCategories((prev) => {
                            if (prev.includes(key)) {
                                const next = prev.filter((c) => c !== key);
                                if (next.length === 0) {
                                    setIsAll(true);
                                    return [];
                                }
                                return next;
                            }
                            // ✅ 케이스 2: 다른 카테고리 클릭 → 추가 선택
                            setIsAll(false);
                            return [...prev, key];
                        });
                    }
                    return <TrendCategoryItem
                        onClick={() => { handleCategoryClick(item.key) }}
                        focused={focused}
                        key={index} item={item} 
                        />
                })}
            </Box>
        </PageHeader>





        <Box sx={{
            position: 'relative',
            pt: 3,
            gap: 1,
            "@media (max-width: 768px)": {
                pt: 2,
                px: 2,
                pb: 1,
            },
        }}>
            <Box sx={{
                flexWrap: 'flex-wrap',
            }}>
                <ButtonBase
                    onClick={() => {
                        setIsAll(true);
                        setCategories([]);
                    }}
                    sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 4,
                        mr: 1,
                        mb: 1,
                        bgcolor: isAll ? blueGrey[900] : "#ffffff",
                        color: isAll ? "#ffffff" : blueGrey[500],
                        border: `1px solid ${blueGrey[100]}`,
                        transition: "0.2s",
                        // "&:hover": { bgcolor: isAll ? blueGrey[900] : blueGrey[100] },
                    }}
                >
                    <Typography sx={{
                        fontSize: 14, fontWeight: 700,
                        color: isAll ? '#ffffff' : blueGrey[500],

                    }}>전체</Typography>
                </ButtonBase>
                {TREND_CATEGORIES.map((item, index) => {
                    const focused = categories.includes(item.key);
                    function handleCategoryClick(key: string) {
                        if (key === "all") {
                            setIsAll(true);
                            setCategories([]);
                            return;
                        }

                        setCategories((prev) => {
                            // ✅ 케이스 1: 이미 선택된 카테고리 클릭 → 해제
                            if (prev.includes(key)) {
                                const next = prev.filter((c) => c !== key);

                                // ✅ 해제 후 아무 것도 안 남거나, 1개만 선택 중 그걸 다시 눌렀다면 전체 복귀
                                if (next.length === 0) {
                                    setIsAll(true);
                                    return [];
                                }

                                return next;
                            }

                            // ✅ 케이스 2: 다른 카테고리 클릭 → 추가 선택
                            setIsAll(false);
                            return [...prev, key];
                        });
                    }
                    return <TrendCategoryItem onClick={() => { handleCategoryClick(item.key) }}
                        focused={focused}
                        key={index} item={item} />
                })}
            </Box>
        </Box>
        <Box sx={{
            position: 'sticky',
            top: 0,
            zIndex: 999,
            bgcolor: '#ffffff',
            mx: 3,
            py: 2,
            display: 'flex',
            alignItems: "center",
            "@media (max-width: 768px)": {
                mx: 0,
                px: 2,
                py: 1.5,
            },
            borderBottom: `1px solid ${blueGrey[100]}`,
        }}>
            <Typography
                sx={{
                    fontSize: 14,
                    color: blueGrey[700],
                    ' span': {
                        color: blueGrey[900],
                        fontWeight: 700,
                    },
                    mr: 'auto'
                }}
            >
                총 <span>{total}</span>개의 뉴스
            </Typography>
            <TrendSort sort={sort} setSort={setSort} />
        </Box>
        <Box sx={{
            p: 3,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            "@media (max-width: 1024px)": {
                gridTemplateColumns: "repeat(2, 1fr)",
            },
            "@media (max-width: 768px)": {
                gridTemplateColumns: "repeat(1, 1fr)",
                p: 2,
            },
            "@media (max-width: 512px)": {
                gridTemplateColumns: "repeat(1, 1fr)",
            },
        }}>
            {trendList.length > 0 && trendList.map((item, index) => {
                return <TrendCard key={index} item={item} />
            })}
        </Box>
        {isValidating && (
            <Box textAlign="center" py={3}>
                <CircularProgress size={28} />
            </Box>
        )}
        <Box sx={{ height: 2000 }} />
    </Layout>
}
