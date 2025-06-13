import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // เพิ่มบรรทัดนี้
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

type SearchProps = {
  search: string;
  setSearch: (v: string) => void;
  selectedZones: string[];
  setSelectedZones: (zs: string[]) => void;
};

const Search: React.FC<SearchProps> = ({
  search,
  setSearch,
  selectedZones,
  setSelectedZones,
}) => {
  const [zoneSearch, setZoneSearch] = useState("");
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // เพิ่มบรรทัดนี้

  // ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowZoneDropdown(false);
      }
    };
    if (showZoneDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showZoneDropdown]);

  const filteredZones = ZONES.filter(
    (z) => z.includes(zoneSearch) && !selectedZones.includes(z)
  );

  const toggleZone = (zone: string) => {
    setSelectedZones(
      selectedZones.includes(zone)
        ? selectedZones.filter((z) => z !== zone)
        : [...selectedZones, zone]
    );
  };

  const removeZone = (zone: string) => {
    setSelectedZones(selectedZones.filter((z) => z !== zone));
  };

  const role = localStorage.getItem("role"); // สมมติ login แล้วเก็บ role ไว้

  return (
    <div className="search-bar-bg">
      <form
        className="search-bar-form"
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 32,
          justifyContent: "center",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          if (role === "ADMIN") {
            navigate("/add-location");
          }
        }}
      >
        <input
          className="search-bar-input"
          type="text"
          placeholder="คำที่ต้องการค้นหา"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* เขต Dropdown */}
        <div className="zone-dropdown" ref={dropdownRef}>
          <button
            type="button"
            className="zone-dropdown-btn"
            onClick={() => setShowZoneDropdown((v) => !v)}
          >
            {selectedZones.length === 0
              ? "ที่ตั้งสำนักงานเขต"
              : selectedZones.map((z) => (
                  <span key={z} className="zone-tag zone-tag-selected">
                    {z}
                    <span
                      className="zone-tag-remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeZone(z);
                      }}
                      title="ลบเขตนี้"
                    >
                      ×
                    </span>
                  </span>
                ))}
            <span className="zone-dropdown-arrow">▼</span>
          </button>
          {showZoneDropdown && (
            <div className="zone-dropdown-list">
              <input
                className="zone-tag-search"
                type="text"
                placeholder="ค้นหาเขต"
                value={zoneSearch}
                onChange={(e) => setZoneSearch(e.target.value)}
              />
              <div className="zone-tag-list">
                {filteredZones.length === 0 && (
                  <span style={{ color: "#fff" }}>ไม่พบเขต</span>
                )}
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
          )}
        </div>

        {role === "ADMIN" && (
          <button className="search-bar-btn" type="submit">
            เพิ่ม
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;