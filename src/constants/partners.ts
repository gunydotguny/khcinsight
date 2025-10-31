// constants/partners.ts

export const PARTNER_CATEGORIES = [
  {
    key: "consumer_general",
    label: "소비자(일반)",
    value: "소비자(일반)",
    emoji: "👤",
  },
  {
    key: "consumer_patient",
    label: "소비자(환자)",
    value: "소비자(환자)",
    emoji: "🧍‍♂️",
  },
  {
    key: "hospital",
    label: "의료기관",
    value: "의료기관",
    emoji: "🏥",
  },
  {
    key: "research_public",
    label: "연구기관/공공",
    value: "연구기관/공공",
    emoji: "🏛️",
  },
  {
    key: "pharma_bio",
    label: "제약/바이오",
    value: "제약/바이오",
    emoji: "💊",
  },
  {
    key: "device_iot",
    label: "디바이스/IoT",
    value: "디바이스/IoT",
    emoji: "📱",
  },
  {
    key: "ai_data",
    label: "AI/데이터기업",
    value: "AI/데이터기업",
    emoji: "🤖",
  },
  {
    key: "insurance_fintech",
    label: "보험/핀테크",
    value: "보험/핀테크",
    emoji: "💰",
  },
  {
    key: "platform_service",
    label: "플랫폼/서비스",
    value: "플랫폼/서비스",
    emoji: "🧩",
  },
];

// 수요자 / 공급자 공통으로 사용 가능
export const DEMAND_FILTERS = PARTNER_CATEGORIES;
export const SUPPLY_FILTERS = PARTNER_CATEGORIES;
export const PARTNER_EMOJI_MAP = Object.fromEntries(
  PARTNER_CATEGORIES.map((c) => [c.label, c.emoji])
);
