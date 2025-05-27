"use client"

export default function RegionInfoPanel({ regionId, regions }) {
    if (!regionId) return null;
    const info = regions[regionId];
    return (
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">{info.name}</h2>
        <p>{info.desc}</p>
        <ul className="mt-2 text-sm text-gray-600">
          {info.refs.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    );
  }
  