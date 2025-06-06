import React, { useState } from "react";
import "./zoneSelect.css";

const zones = [
  "สำนักงานใหญ่คลองเตย", "สำนักงานเพลินจิต", "วัดเลียบ", "มีนบุรี",
  "บางใหญ่", "นนทบุรี", "บางเขน", "บางกะปิ",
  "บางพลี", "สมุทรปราการ", "ยานนาวา",
  "ราชภูมิรษะ", "บางขุนเทียน", "ธนบุรี",
  "นวลจันทร์", "ลาดกระบัง", "บางนา"
];

const ZoneSelect: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(zones);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setFiltered(zones.filter(z => z.includes(value)));
  };

  return (
    <div className="zone-select-container">
      <div className="zone-select-header">
        <button className="zone-select-dropdown">
          เขต <span style={{ color: "#ff9800" }}>➤</span>
        </button>
      </div>
      <div className="zone-select-box">
        <div className="zone-select-row">
          <input
            className="zone-select-input"
            value={search}
            onChange={handleSearch}
            placeholder="ค้นหา"
          />
        </div>
        <div className="zone-select-tags">
          {filtered.map((zone, idx) => (
            <span className="zone-select-tag" key={idx}>{zone}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ZoneSelect;