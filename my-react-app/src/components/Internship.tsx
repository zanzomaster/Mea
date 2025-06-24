import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./search";
import "./internship.css";

type InternshipType = {
  id: number;
  office: string;
  desc?: string;
  location?: string;
  address?: string;
  count?: number;
};

const Internship: React.FC = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState<InternshipType[]>([]);
  const [search, setSearch] = useState("");
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null); // เพิ่ม state สำหรับ role
  const [adminZones, setAdminZones] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/internships")
      .then((res) => res.json())
      .then((data) => setInternships(data));
    // ดึง role จาก localStorage (หรือที่เก็บ token/role)
    const role = localStorage.getItem("role"); // สมมติ login แล้วเก็บ role ไว้
    setUserRole(role);
    // สมมติ login แล้วเก็บชื่อเขต admin ไว้ใน localStorage เป็น array ของชื่อเขต เช่น ["บางกะปิ", "จตุจักร"]
    const zones = JSON.parse(localStorage.getItem("adminZones") || "[]");
    setAdminZones(zones);
  }, []);

  // ฟังก์ชัน filter
  const filtered = internships.filter((item) => {
    // เงื่อนไขค้นหาด้วยคำค้น
    const matchSearch =
      !search ||
      item.office?.toLowerCase().includes(search.toLowerCase()) ||
      item.desc?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase()) ||
      item.address?.toLowerCase().includes(search.toLowerCase());
    // เงื่อนไขเลือกเขต
    const matchZone =
      selectedZones.length === 0 ||
      (item.location && selectedZones.includes(item.location));
    return matchSearch && matchZone;
  });

  const handleClick = (id: number) => {
    navigate(`/send/${id}`);
  };

  // รับค่าจาก Search component
  const handleSearchChange = (value: string) => setSearch(value);
  const handleZoneChange = (zones: string[]) => setSelectedZones(zones);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: "0 0 40px 0" }}>
      <div className="internship-title"></div>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Search
          search={search}
          setSearch={handleSearchChange}
          selectedZones={selectedZones}
          setSelectedZones={handleZoneChange}
        />
        <div className="internship-list-bg">
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", color: "#888", marginTop: 40 }}>
              ไม่พบข้อมูลที่ค้นหา
            </div>
          )}
          {filtered.map((item) => (
            <div
              className="internship-item"
              key={item.id}
              style={{ cursor: "pointer", position: "relative" }}
              onClick={() => handleClick(item.id)}
            >
              <img src="https://mapapi.mea.or.th/static/media/logo3.8549861c.png" alt="logo" className="internship-logo" />
              <div className="internship-info">
                <div className="internship-office">{item.office}</div>
                <div>{item.desc}</div>
                <div className="internship-location-row">
                  <span style={{ color: "#f47c20", marginRight: 4 }}>📍</span>
                  <span>{item.location}</span>
                </div>
                <div className="internship-address">{item.address}</div>
                <div className="internship-count-row">
                  <span style={{ color: "#f47c20", marginRight: 4 }}>👥</span>
                  จำนวน {item.count} คน
                </div>
              </div>
              <div className="internship-arrow">
                <svg width="32" height="32" fill="none" stroke="#f47c20" strokeWidth="3" viewBox="0 0 24 24">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </div>
              {/* ปุ่มแก้ไขและลบ (แสดงเฉพาะ admin) */}
              {userRole === "ADMIN" && adminZones.includes(item.location || "") && (
                <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 8, zIndex: 2 }}>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/edit-internship/${item.id}`);
                    }}
                    style={{
                      background: "#ffd966",
                      border: "none",
                      borderRadius: 4,
                      padding: "4px 10px",
                      cursor: "pointer"
                    }}
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={async e => {
                      e.stopPropagation();
                      if (window.confirm("ต้องการลบข้อมูลนี้ใช่หรือไม่?")) {
                        await fetch(`http://localhost:5000/internships/${item.id}`, {
                          method: "DELETE"
                        });
                        setInternships(internships => internships.filter(i => i.id !== item.id));
                      }
                    }}
                    style={{
                      background: "#ff7875",
                      border: "none",
                      borderRadius: 4,
                      padding: "4px 10px",
                      color: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    ลบ
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Internship;