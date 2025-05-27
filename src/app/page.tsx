"use client";
import { useState } from "react";
import BrainCanvas from "@/components/BrainCanvas";
import RegionInfoPanel from "@/components/RegionInfoPanel";
import { useRegionData } from "@/hooks/useRegionData";

export default function Page() {
  const [selected, setSelected] = useState<string | null>(null);
  const { regions, isLoading } = useRegionData();

  if (isLoading) return <p>Loading metadata…</p>;

  return (
    <div className="flex h-screen">
      <div className="w-3/4">
        <BrainCanvas onSelect={setSelected} />
      </div>
      <div className="w-1/4 p-4 overflow-y-auto bg-gray-50">
        <RegionInfoPanel regionId={selected} regions={regions} />
      </div>
    </div>
  );
}
