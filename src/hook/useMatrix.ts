// hooks/useMatrix.ts
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export function useMatrix() {
  const { data, error, isLoading, mutate } = useSWR("/api/matrix", fetcher, {
    revalidateOnFocus: false,       // 탭 전환 시 재요청 안함
    dedupingInterval: 1000 * 60 * 10, // 10분간 중복 요청 방지
    revalidateIfStale: false,       // stale이어도 리로드 전까진 그대로 사용
  });

  return { strategies: data ?? [], error, isLoading, mutate };
}
