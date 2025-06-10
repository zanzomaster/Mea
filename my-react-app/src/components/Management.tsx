import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./management.css";

const allZones = [
  "สำนักงานใหญ่คลองเตย", "สำนักงานเพลินจิต", "วัดเลียบ", "มีนบุรี",
  "บางใหญ่", "นนทบุรี", "บางเขน", "บางกะปิ", "บางพลี", "สมุทรปราการ",
  "ยานนาวา", "ราชบุรีุรณะ", "บางขุนเทียน", "ธนบุรี", "นวลจันทร์",
  "ลาดกระบัง", "บางนา"
];

type Status = "accept" | "reject" | null;

const mockData = [
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี"
];

const Management = () => {
  const navigate = useNavigate();
  const [statusList, setStatusList] = useState<Status[]>(Array(mockData.length).fill(null));
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [showZoneList, setShowZoneList] = useState(false);
  const [search, setSearch] = useState("");

  const handleClick = (idx: number) => {
    navigate(`/sendmanagement/${idx + 1}`, { state: { idx } });
  };

  // รับค่ากลับมาจากหน้า sendManagement
  React.useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "managementStatus" && e.newValue) {
        const { idx, status } = JSON.parse(e.newValue);
        setStatusList((prev) => {
          const copy = [...prev];
          copy[idx] = status;
          return copy;
        });
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const handleZoneBtnClick = () => setShowZoneList((prev) => !prev);

  const handleSelectZone = (zone: string) => {
    if (!selectedZones.includes(zone)) {
      setSelectedZones([...selectedZones, zone]);
    }
    setShowZoneList(false);
    setSearch("");
  };

  const handleRemoveZone = (zone: string) => {
    setSelectedZones(selectedZones.filter((z) => z !== zone));
  };

  const filteredZones = allZones.filter(
    (zone) =>
      zone.toLowerCase().includes(search.toLowerCase()) &&
      !selectedZones.includes(zone)
  );

  return (
    <div className="management-bg">
      <div className="management-title">การจัดการ</div>
      <div className="management-container">
        <div className="management-content">
          <div className="management-zone-btn-row" style={{ display: "flex", gap: 12, alignItems: "center", position: "relative" }}>
            {/* ปุ่มเลือกเขต */}
            <button
              className="management-zone-btn"
              type="button"
              onClick={handleZoneBtnClick}
              style={{
                minWidth: 80,
                border: showZoneList ? "2px solid #2196f3" : "2px solid transparent",
                color: "#222",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontWeight: 500,
                background: "#ffb36b"
              }}
            >
              เขต
              <span style={{ color: "#f47c20", marginLeft: 2, fontSize: 18 }}>›</span>
            </button>
            {/* แสดงเขตที่เลือก */}
            {selectedZones.map((zone) => (
              <span
                key={zone}
                style={{
                  background: "#ffb36b",
                  borderRadius: 10,
                  padding: "4px 14px 4px 14px",
                  marginRight: 4,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500,
                  fontSize: 18
                }}
              >
                {zone}
                <span
                  style={{
                    color: "#f44336",
                    marginLeft: 6,
                    cursor: "pointer",
                    fontSize: 20,
                    userSelect: "none"
                  }}
                  onClick={() => handleRemoveZone(zone)}
                  title="ลบเขตนี้"
                >
                  ×
                </span>
              </span>
            ))}
            {/* Dropdown */}
            {showZoneList && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 48,
                  background: "#ffb36b",
                  borderRadius: 14,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  zIndex: 10,
                  minWidth: 320,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12
                }}
              >
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input
                    type="text"
                    placeholder="ค้นหา"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                      flex: 1,
                      borderRadius: 6,
                      border: "1px solid #eee",
                      padding: "6px 12px",
                      fontSize: 16
                    }}
                  />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {filteredZones.length === 0 && (
                    <span style={{ color: "#888" }}>ไม่พบเขต</span>
                  )}
                  {filteredZones.map((zone) => (
                    <button
                      key={zone}
                      type="button"
                      style={{
                        background: "#fff",
                        border: "none",
                        borderRadius: 10,
                        padding: "6px 16px",
                        fontWeight: 500,
                        fontSize: 16,
                        cursor: "pointer",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
                      }}
                      onClick={() => handleSelectZone(zone)}
                    >
                      {zone}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="management-list">
            {mockData.map((name, idx) => (
              <div
                className="management-item"
                key={idx}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(idx)}
              >
                <div className="management-item-info">
                  <span className="management-avatar">
                    <svg width="28" height="28" fill="#ff9800" viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M12 14c-5 0-8 2.5-8 4v2h16v-2c0-1.5-3-4-8-4z"/>
                    </svg>
                  </span>
                  <span>{name}</span>
                </div>
                <span>
                  {statusList[idx] === "accept" && (
                    <svg width="28" height="28" fill="none" stroke="#4caf50" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="20 6 10 18 4 12" />
                    </svg>
                  )}
                  {statusList[idx] === "reject" && (
                    <svg width="28" height="28" fill="none" stroke="#f44336" strokeWidth="3" viewBox="0 0 24 24">
                      <line x1="6" y1="6" x2="18" y2="18" />
                      <line x1="6" y1="18" x2="18" y2="6" />
                    </svg>
                  )}
                  {statusList[idx] === null && (
                    <svg width="28" height="28" fill="none" stroke="#ff9800" strokeWidth="3" viewBox="0 0 24 24">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="management-pagination">
            1
            <span className="management-pagination-arrow">›</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;