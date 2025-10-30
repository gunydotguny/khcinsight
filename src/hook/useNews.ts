// hooks/useNews.ts
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export function useNews() {
    const { data, error, isLoading, mutate } = useSWR("/api/news?limit=5000", fetcher, {
        revalidateOnFocus: false,
        dedupingInterval: 1000 * 60 * 10, // 10분 중복 요청 방지
        revalidateIfStale: false,
    });

    return { news: data ?? [], error, isLoading, mutate };
}
