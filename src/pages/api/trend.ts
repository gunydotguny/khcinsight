import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { TREND_CATEGORY_LABEL_MAP } from "@/src/constants/categories";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { q = "", category, sort = "latest", page = "1", pageSize = "20" } = req.query;
    const filePath = path.join(process.cwd(), "data/latest.json");
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "data/latest.json not found" });
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const query = (q as string).toLowerCase();

    // ✅ category 파라미터 처리
    const categoryList = Array.isArray(category)
      ? category
      : typeof category === "string" && category.length > 0
      ? category.split(",")
      : [];

    // ✅ 필터링 로직
    const filtered = data.filter((item: any) => {
      const matchQ =
        !query ||
        item.news_title?.toLowerCase().includes(query) ||
        item.news_content?.toLowerCase().includes(query);

      const matchCat =
        categoryList.length === 0 ||
        categoryList.some((catKey) => {
          const label = TREND_CATEGORY_LABEL_MAP[catKey];
          // 데이터는 job: ["전략", "제품/서비스"] 형태임
          return label && Array.isArray(item.job) && item.job.includes(label);
        });

      return matchQ && matchCat;
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
