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

const ITEMS_PER_PAGE = 6;

const Management = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [statusList, setStatusList] = useState<Record<number, "accept" | "reject" | null>>({});
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [showZoneList, setShowZoneList] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // โหลดเขตที่ admin มีสิทธิ์จาก localStorage (default)
  useEffect(() => {
    // สมมติ login frontend เก็บ adminZones เป็น array ของชื่อเขต
    const adminZones = localStorage.getItem("adminZones");
    if (adminZones) {
      try {
        const zones = JSON.parse(adminZones);
        if (Array.isArray(zones) && zones.length > 0) {
          setSelectedZones(zones);
        }
      } catch {}
    }
  }, []);

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

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pagedApplications = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleClick = (idx: number) => {
    navigate(`/sendmanagement/${pagedApplications[idx].id}`, { state: { idx } });
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
          {/* แสดง tag เขตที่ admin มีสิทธิ์ดู (ไม่มีปุ่ม x, ไม่มีปุ่มเขต) */}
          <div className="management-zone-btn-row" style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
            {selectedZones.map((zone) => (
              <span
                key={zone}
                style={{
                  background: "rgb(255, 146, 95)",
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
              </span>
            ))}
          </div>
          <div className="management-list">
            {pagedApplications.map((app, idx) => (
              <div
                className="management-item"
                key={app.id}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(idx)}
              >
                <div className="management-item-info">
                  <span className="management-avatar">
                    <svg width="28" height="28" fill="#FE5000" viewBox="0 0 24 24">
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
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="management-pagination-arrow"
            >
              ‹
            </button>
            <span style={{ margin: "0 12px" }}>
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="management-pagination-arrow"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;