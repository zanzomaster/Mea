import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./management.css";

type ApplicationType = {
  id: number;
  about?: string;
  transcript?: string;
  portfolio?: string;
  createdAt: string;
  user: { name: string };
  internship: { office: string; location?: string };
  status?: "accept" | "reject" | null;
  // เพิ่ม field อื่นๆ ตาม schema
};

const allZones = [
  "สำนักงานใหญ่คลองเตย", "สำนักงานเพลินจิต", "วัดเลียบ", "มีนบุรี",
  "บางใหญ่", "นนทบุรี", "บางเขน", "บางกะปิ", "บางพลี", "สมุทรปราการ",
  "ยานนาวา", "ราชบุรีุรณะ", "บางขุนเทียน", "ธนบุรี", "นวลจันทร์",
  "ลาดกระบัง", "บางนา"
];

const Management = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [statusList, setStatusList] = useState<Record<number, "accept" | "reject" | null>>({});
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [showZoneList, setShowZoneList] = useState(false);
  const [search, setSearch] = useState("");

  // โหลดข้อมูลจาก backend
  useEffect(() => {
    fetch("http://localhost:5000/internship-applications")
      .then(res => res.json())
      .then(data => setApplications(data));
  }, []);

  // รับค่ากลับมาจากหน้า sendManagement
  useEffect(() => {
    // โหลดสถานะจาก sessionStorage (กรณี refresh หน้า)
    const status = sessionStorage.getItem("managementStatus");
    if (status) {
      setStatusList(JSON.parse(status));
    }

    // ฟัง event storage (กรณีเปลี่ยน tab)
    const handler = (e: StorageEvent) => {
      if (e.key === "managementStatus" && e.newValue) {
        setStatusList(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // ฟิลเตอร์ตามเขตและค้นหา
  const filtered = applications.filter(app => {
    const matchZone =
      selectedZones.length === 0 ||
      (app.internship.location && selectedZones.includes(app.internship.location));
    const matchSearch =
      !search ||
      app.user.name.includes(search) ||
      app.internship.office.includes(search) ||
      app.about?.includes(search);
    return matchZone && matchSearch;
  });

  const handleClick = (idx: number) => {
    navigate(`/sendmanagement/${filtered[idx].id}`, { state: { idx } });
  };

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
            {filtered.map((app, idx) => (
              <div
                className="management-item"
                key={app.id}
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
                  <span>
                    {app.user.name} | {app.internship.office} {app.internship.location && `(${app.internship.location})`}
                  </span>
                </div>
                <span className="management-status-row">
                  <span className="management-status-icon">
                    {app.status === "accept" && (
                      <svg width="28" height="28" fill="none" stroke="#4caf50" strokeWidth="3" viewBox="0 0 24 24">
                        <polyline points="20 6 10 18 4 12" />
                      </svg>
                    )}
                    {app.status === "reject" && (
                      <svg width="28" height="28" fill="none" stroke="#f44336" strokeWidth="3" viewBox="0 0 24 24">
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="6" y1="18" x2="18" y2="6" />
                      </svg>
                    )}
                    {app.status == null && (
                      <svg width="28" height="28" fill="none" stroke="#ff9800" strokeWidth="3" viewBox="0 0 24 24">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    )}
                  </span>
                  <span
                    className="management-status-text"
                    style={{
                      color:
                        app.status === "accept"
                          ? "#4caf50"
                          : app.status === "reject"
                          ? "#f44336"
                          : "#ff9800",
                      fontWeight: 600,
                    }}
                  >
                    {app.status === "accept" && "ตอบรับแล้ว"}
                    {app.status === "reject" && "ปฏิเสธ"}
                  </span>
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