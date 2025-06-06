import React, { useState } from "react";
import "./search.css";

const ZONES = [
  "สำนักงานใหญ่คลองเตย",
  "สำนักงานเพลินจิต",
  "วัดเลียบ",
  "มีนบุรี",
  "บางใหญ่",
  "นนทบุรี",
  "บางเขน",
  "บางกะปิ",
  "บางพลี",
  "สมุทรปราการ",
  "ยานนาวา",
  "ราชภูมิรษะ",
  "บางขุนเทียน",
  "ธนบุรี",
  "นวลจันทร์",
  "ลาดกระบัง",
  "บางนา",
];

const Search: React.FC = () => {
  const [search, setSearch] = useState("");
  const [zoneSearch, setZoneSearch] = useState("");
  const [selectedZones, setSelectedZones] = useState<string[]>([]);

  const filteredZones = ZONES.filter((z) => z.includes(zoneSearch));

  const toggleZone = (zone: string) => {
    setSelectedZones((zs) =>
      zs.includes(zone) ? zs.filter((z) => z !== zone) : [...zs, zone]
    );
  };

  return (
    <div className="search-bar-bg">
      <form
        className="search-bar-form"
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        <div style={{ width: "100%" }}>
          <input
            className="search-bar-input"
            type="text"
            placeholder="คำที่ต้องการค้นหา"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", marginBottom: 12 }}
          />
        </div>
        <div className="zone-tag-box">
          <input
            className="zone-tag-search"
            type="text"
            placeholder="ค้นหาเขต"
            value={zoneSearch}
            onChange={(e) => setZoneSearch(e.target.value)}
          />
          <div className="zone-tag-list">
            {filteredZones.map((zone) => (
              <button
                type="button"
                key={zone}
                className={`zone-tag${
                  selectedZones.includes(zone) ? " selected" : ""
                }`}
                onClick={() => toggleZone(zone)}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>
        <button
          className="search-bar-btn"
          type="submit"
          style={{ alignSelf: "flex-end" }}
        >
          ค้นหา
        </button>
      </form>
    </div>
  );
};

export default Search;