import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { TREND_CATEGORY_LABEL_MAP } from "@/src/constants/categories";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { q = "", category, supply, demand, sort = "latest", page = "1", pageSize = "20" } = req.query;
    const filePath = path.join(process.cwd(), "data/latest.json");
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "data/latest.json not found" });
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const query = (q as string).toLowerCase();

    // ✅ category / supply / demand 파라미터 각각 처리
    const categoryList = Array.isArray(category)
      ? category
      : typeof category === "string" && category.length > 0
        ? category.split(",")
        : [];

    const supplyList = Array.isArray(supply)
      ? supply
      : typeof supply === "string" && supply.length > 0
        ? supply.split(",")
        : [];

    const demandList = Array.isArray(demand)
      ? demand
      : typeof demand === "string" && demand.length > 0
        ? demand.split(",")
        : [];

    // ✅ 필터링 로직
    const filtered = data.filter((item: any) => {
      // 검색어 필터
      const matchQ =
        !query ||
        item.news_title?.toLowerCase().includes(query) ||
        item.news_content?.toLowerCase().includes(query);

      // 카테고리 필터 (job 기준)
      const matchCategory =
        categoryList.length === 0 ||
        categoryList.some((catKey) => {
          const label = TREND_CATEGORY_LABEL_MAP[catKey];
          return label && Array.isArray(item.job) && item.job.includes(label);
        });

      // 공급 필터
      const matchSupply =
        supplyList.length === 0 ||
        supplyList.some((key) => {
          const label = TREND_CATEGORY_LABEL_MAP[key] || key;
          return Array.isArray(item.supply) && item.supply.includes(label);
        });

      // 수요 필터
      const matchDemand =
        demandList.length === 0 ||
        demandList.some((key) => {
          const label = TREND_CATEGORY_LABEL_MAP[key] || key;
          return Array.isArray(item.demand) && item.demand.includes(label);
        });

      return matchQ && matchCategory && matchSupply && matchDemand;
    });

    // ✅ 정렬 (post_date 기준)
    filtered.sort((a: any, b: any) =>
      sort === "oldest"
        ? a.post_date?.localeCompare(b.post_date || "") ?? 0
        : b.post_date?.localeCompare(a.post_date || "") ?? 0
    );

    // ✅ 페이지네이션
    const pageNum = parseInt(page as string);
    const pageSizeNum = parseInt(pageSize as string);
    const start = (pageNum - 1) * pageSizeNum;
    const results = filtered.slice(start, start + pageSizeNum);

    return res.status(200).json({
      total: filtered.length,
      page: pageNum,
      hasMore: start + pageSizeNum < filtered.length,
      results,
    });
  } catch (err: any) {
    console.error("❌ API Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
