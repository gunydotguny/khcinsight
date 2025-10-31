import Layout from "@/src/components/common/Layout";
import { Box, ButtonBase, CircularProgress, Drawer, Typography } from "@mui/material";
import { amber, blueGrey, grey } from "@mui/material/colors";
import { TREND_CATEGORIES, } from "@/src/constants/categories";
import { useEffect, useState } from "react";
import { fetcher, PAGE_SIZE } from "@/src/lib/fetcher";
import useSWRInfinite from "swr/infinite";
import { TrendCategoryItem } from "@/src/components/trend/TrendCategoryItem";
import TrendCard from "@/src/components/trend/TrendCard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import User from "@/src/components/common/User";
import TrendFilterSection from "@/src/components/trend/TrendFilterSection";
import TrendListItem from "@/src/components/trend/TrendListItem";
import CloseIcon from '@mui/icons-material/Close';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import TrendSortButton from "@/src/components/trend/TrendSortButton";

export default function TrendPage() {
    const [q, setQ] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [supply, setSupply] = useState<string[]>([]);
    const [demand, setDemand] = useState<string[]>([]);
    const [isAll, setIsAll] = useState(true);
    const [sort, setSort] = useState("latest");
    const [drawerOpen, setDrawerOpen] = useState(false); // ✅ 드로어 상태
    const [tempSupply, setTempSupply] = useState<string[]>([]);
    const [tempDemand, setTempDemand] = useState<string[]>([]);

    // 🔹 Drawer 열릴 때: 현재 확정 상태를 임시로 복사
    useEffect(() => {
        if (drawerOpen) {
            setTempSupply([...supply]);
            setTempDemand([...demand]);
        }
    }, [drawerOpen]);

    // 🔹 "확인" 클릭 시 → 실제 반영
    const handleConfirm = () => {
        setSupply(tempSupply);
        setDemand(tempDemand);
        setDrawerOpen(false);
    };

    // 🔹 "닫기"/"취소"/"바깥 클릭" 시 → 되돌리기
    const handleCancel = () => {
        // 기존 값으로 복원
        setTempSupply([...supply]);
        setTempDemand([...demand]);
        setDrawerOpen(false);
    };

    const getKey = (pageIndex: number, prev: any) => {
        if (prev && !prev.hasMore) return null;

        const params = new URLSearchParams({
            page: String(pageIndex + 1),
            pageSize: String(PAGE_SIZE),
            ...(q ? { q } : {}),
            ...(isAll ? {} : { category: categories.join(",") }),
            ...(supply.length ? { supply: supply.join(",") } : {}),
            ...(demand.length ? { demand: demand.join(",") } : {}),
            ...(sort ? { sort } : {}),
        });

        const key = `/api/trend?${params.toString()}`;
        console.log("🌀 getKey called", { pageIndex, key });
        return key;
    };

    const { data, setSize, isValidating } = useSWRInfinite(getKey, fetcher, {
        onSuccess: (data) => {
            console.log("✅ SWR fetched:", data?.[0]?.results?.length, "items");
        },
        onError: (err) => {
            console.error("❌ SWR error:", err);
        }
    });
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
    }, []);
    //카테고리
    const handleClickCategoryAll = () => {
        setIsAll(true);
        setCategories([]);
    }
    return <><Layout>
        {/* 페이지 헤더 시작 */}
        <Box sx={{
            position: 'relative',
            display: 'flex',
            py: 5,
            px: 10,
            bgcolor: '#ffffff',
            "@media (max-width: 768px)": {
                flexDirection: 'column',
                py: 2,
                px: 2,
                position: 'sticky',
                top: -48,
                zIndex: 9999,
                mt: 0,
            },
        }}>
            {/* 페이지 제목 시작 */}
            <Typography sx={{
                fontSize: 24,
                lineHeight: '32px',
                fontWeight: 700,
                width: 192,
                "@media (max-width: 768px)": {
                    width: 'initial'
                }
            }}>
                데일리 트렌드
            </Typography>
            {/* 페이지 제목 끝 */}
            {/* 카테고리 시작 */}
            <Box sx={{
                position: 'relative',
                "@media (max-width: 768px)": {
                    mx: -2,
                    pt: 2,
                }
            }}>
                <Box sx={{
                    overflowX: 'scroll',
                    "@media (max-width: 768px)": {

                    }
                }}>
                    <Box sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        px: 5,
                        flexWrap: "nowrap",
                        "& > *": { flex: "0 0 auto" },
                        "@media (max-width: 768px)": {
                            px: 2,
                        },
                    }}>
                        <ButtonBase
                            onClick={handleClickCategoryAll}
                            sx={{
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 20,
                                bgcolor: grey[900],
                                color: '#ffffff',
                                transition: "0.3s ease",
                                opacity: isAll ? 1 : 0.3,
                            }}
                        >
                            <Typography sx={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: '#ffffff'
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
                        <Box sx={{ width: 16 }} />
                    </Box>
                </Box>
            </Box>
            {/* 카테고리 끝 */}
            {/* 모바일 유저 시작 */}
            <Box sx={{
                display: 'none',
                "@media (max-width: 768px)": {
                    display: 'flex',
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 999,
                }
            }}>
                <User />
            </Box>
            {/* 모바일 유저 끝 */}
        </Box>
        {/* 메인 영역 시작 */}
        <Box sx={{
            display: 'flex',
            width: '100%',
            px: 10,
            gap: 5,
            "@media (max-width: 768px)": {
                px: 0,
                flexDirection: 'column'
            }
        }}>
            {/* 웹 필터 영역 시작 */}
            <Box sx={{
                "@media (max-width: 768px)": {
                    display: 'none'
                }
            }}>
                <TrendFilterSection
                    supply={supply}
                    demand={demand}
                    onChangeSupply={setSupply}
                    onChangeDemand={setDemand}
                />
            </Box>
            {/* 웹 필터 영역 끝 */}
            {/* 카드 영역 시작 */}
            <Box sx={{
                flex: 1,
                "@media (max-width: 768px)": {
                    flex: 'initial',
                    width: '100%',
                }
            }}>
                {/* 소트 영역 시작 */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pb: 3,
                    gap: 1,
                    "@media (max-width: 768px)": {
                        position: 'sticky',
                        top: 45 + 16,
                        zIndex: 999,
                        bgcolor: '#ffffff',
                        px: 2,
                        pt: 0,
                        pb: 2,
                        borderBottom: `1px solid ${grey[300]}`
                    },

                }}>
                    <Typography sx={{
                        flex: 1,
                        fontSize: 14,
                        lineHeight: '20px',
                        '& span': {
                            fontWeight: 700
                        }

                    }}>
                        총 <span>{total}</span>개의 트렌드
                    </Typography>
                    {/* 필터 버튼 시작 */}
                    <Box
                        sx={{
                            display: 'none',
                            "@media (max-width: 768px)": {
                                display: "flex",
                            },
                        }}
                    >
                        <ButtonBase
                            onClick={() => setDrawerOpen(true)}
                            sx={{
                                border: `1px solid ${grey[400]}`,
                                px: 1.5,
                                py: 1,
                                borderRadius: 0.5,
                            }}
                        >
                            <FilterAltIcon
                                sx={{
                                    width: 16,
                                    height: 16,
                                    mr: 0.5,
                                }} />
                            <Typography sx={{
                                fontSize: 14,
                                lineHeight: '20px',
                            }}>필터 설정
                            </Typography>
                        </ButtonBase>
                    </Box>
                    {/* 필터 버튼 끝 */}
                    {/* 정렬 버튼 시작 */}
                    <TrendSortButton
                        sort={sort}
                        setSort={setSort}
                    />
                    {/* 정렬 버튼 끝 */}
                </Box>
                {/* 소트 영역 끝 */}
                {/* 리스트 영역 시작 */}
                <Box sx={{
                    width: '100%',
                    display: 'grid',
                    gap: 2,
                    pb: 40,
                    "@media (max-width: 768px)": {
                        width: '100%',
                        display: 'block'
                    }
                }}>
                    {/* 리스트 시작 */}
                    {trendList.length > 0 && trendList.map((item, index) => {
                        return <TrendListItem key={index}
                            item={item}
                            isAll={isAll}
                            selectedCategories={categories}
                            selectedSupply={supply}
                            selectedDemand={demand}
                        />
                    })}
                    {/* 리스트 끝 */}
                    {/* 로딩바 시작 */}
                    {isValidating && (
                        <Box textAlign="center" py={3}>
                            <CircularProgress size={28} />
                        </Box>
                    )}
                    {/* 로딩바 끝 */}
                </Box>
                {/* 리스트 영역 끝 */}
            </Box>
            {/* 카드 영역 끝 */}
        </Box>
        {/* 메인 영역 끝 */}
    </Layout>
        {/* ✅ 하단 Drawer (모바일용 필터) */}
        <Drawer
            anchor="bottom"
            open={drawerOpen}
            onClose={handleCancel}
            sx={{
                zIndex: 99999,
                ' .MuiPaper-root': {
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    maxHeight: "80vh",
                    bgcolor: "#fff",
                    display: 'flex',
                    flexDirection: 'column'
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderBottom: `1px solid ${grey[300]}`
                }}
            >
                <Typography sx={{
                    fontSize: 20,
                    lineHeight: '28px',
                    fontWeight: 700
                }}>필터</Typography>
                <CloseIcon
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                        width: 24,
                        height: 24,
                    }}

                />
            </Box>
            {/* 실제 필터 섹션 내용 */}
            <Box sx={{
                flex: 1,
                overflow: 'scroll'
            }}>
                <TrendFilterSection
                    supply={tempSupply}
                    demand={tempDemand}
                    onChangeSupply={setTempSupply}
                    onChangeDemand={setTempDemand}
                />
            </Box>
            <Box sx={{
                p: 2,
                width: '100%',
                borderTop: `1px solid ${grey[300]}`
            }}>
                <ButtonBase
                    onClick={handleConfirm}
                    sx={{
                        width: '100%',
                        borderRadius: 1,
                        bgcolor: amber[500],
                        height: 48,
                    }}>
                    <Typography sx={{
                        fontSize: 16,
                        fontWeight: 700
                    }}>
                        필터 적용하기
                    </Typography>
                </ButtonBase>
            </Box>
        </Drawer>
    </>
}
