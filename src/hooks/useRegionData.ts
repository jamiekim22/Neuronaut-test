import useSWR from "swr";

export function useRegionData() {
  const { data, error } = useSWR("/data/regions.json", (url: string) =>
    fetch(url).then((res) => res.json())
  );
  return { regions: data as Record<string, any>, isLoading: !data && !error };
}
