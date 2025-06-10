import React from "react";
import { useNavigate } from "react-router-dom"; // เพิ่ม
import Search from "./search";
import "./internship.css";

const mockInternships = [
  {
    id: 1,
    office: "การไฟฟ้านครหลวง เขตนนทบุรี",
    desc: "รับนักศึกษาฝึกงาน หลายอัตรา",
    location: "ฝ่ายงาน บางกระสอ",
    address: "อำเภอเมืองนนทบุรี นนทบุรี 11000",
    count: 4,
  },
  {
    id: 2,
    office: "การไฟฟ้านครหลวง เขตนนทบุรี",
    desc: "รับนักศึกษาฝึกงาน หลายอัตรา",
    location: "ฝ่ายงาน บางกระสอ",
    address: "อำเภอเมืองนนทบุรี นนทบุรี 11000",
    count: 4,
  },
  {
    id: 3,
    office: "การไฟฟ้านครหลวง เขตนนทบุรี",
    desc: "รับนักศึกษาฝึกงาน หลายอัตรา",
    location: "ฝ่ายงาน บางกระสอ",
    address: "อำเภอเมืองนนทบุรี นนทบุรี 11000",
    count: 4,
  },
];

const Internship: React.FC = () => {
  const navigate = useNavigate(); // เพิ่ม

  const handleClick = (id: number) => {
    navigate(`/send/${id}`); // ไปหน้า send พร้อม id
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: "0 0 40px 0" }}>
      <div className="internship-title"></div>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Search />
        <div className="internship-list-bg">
          {mockInternships.map((item, idx) => (
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