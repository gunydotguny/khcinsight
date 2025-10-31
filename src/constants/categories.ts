import {
    amber,
    blue,
    green,
    purple,
    teal,
    indigo,
    deepOrange,
    cyan,
    pink,
    grey,
    blueGrey,
} from "@mui/material/colors";

// ✅ 공통 타입 정의
export type TrendCategoryItemProps = {
    key: string;
    label: string;
    color: string;
    textColor: string;
}

// ✅ 카테고리 목록
export const TREND_CATEGORIES: TrendCategoryItemProps[] = [
    { key: "strategy", label: "전략", color: blue[100], textColor: blue[900], },
    { key: "business", label: "사업", color: indigo[100], textColor: indigo[900], },
    { key: "product", label: "제품/서비스", color: green[100], textColor: green[900], },
    { key: "research", label: "연구", color: teal[100], textColor: teal[900], },
    { key: "etc", label: "기타", color: grey[100], textColor: grey[900], },
];
// ✅ label → color 매핑 (뱃지용)
export const TREND_CATEGORY_COLOR_MAP = Object.fromEntries(
    TREND_CATEGORIES.map((c) => [c.label, c.color])
);

// ✅ label → textColor 매핑 (뱃지용)
export const TREND_CATEGORY_TEXT_COLOR_MAP = Object.fromEntries(
    TREND_CATEGORIES.map((c) => [c.label, c.textColor])
);

// ✅ key → label 매핑 (필터 등에서 label 표시용)
export const TREND_CATEGORY_LABEL_MAP = Object.fromEntries(
    TREND_CATEGORIES.map((c) => [c.key, c.label])
);

