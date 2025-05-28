"use client"

interface RegionInfo {
    name: string;
    desc: string;
    refs: string[];
}

export default function RegionInfoPanel({ 
    regionId, 
    regions 
}: { 
    regionId: string | null; 
    regions: Record<string, RegionInfo> | null; 
}) {    if (!regionId || !regions) {
        console.log("RegionInfoPanel: Missing data", { regionId, regions: !!regions });
        return null;
    }
    
    const info = regions[regionId];
    if (!info) {
        console.log("Available region IDs:", Object.keys(regions));
        console.warn(`No information found for region: ${regionId}`);
        return null;
    }

    return (
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">{info.name}</h2>
        <p>{info.desc}</p>
        <ul className="mt-2 text-sm text-gray-600">
          {info.refs?.map((ref: string, index: number) => (
            <li key={index}>{ref}</li>
          ))}
        </ul>
      </div>
    );
  }
  