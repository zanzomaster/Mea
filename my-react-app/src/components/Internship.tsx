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

  useEffect(() => {
    fetch("http://localhost:5000/internships")
      .then((res) => res.json())
      .then((data) => setInternships(data));
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
              style={{ cursor: "pointer" }}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Internship;