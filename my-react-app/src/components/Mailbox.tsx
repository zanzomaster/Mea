import React from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Mailbox: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-bg">
      <div className="profile-sidebar">
        <button className="profile-sidebar-btn" onClick={() => navigate("/profile")}>โปรไฟล์</button>
        <button className="profile-sidebar-btn" onClick={() => navigate("/education")}>การศึกษา</button>
        <button className="profile-sidebar-btn active" onClick={() => navigate("/mailbox")}>กล่องจดหมาย</button>
      </div>
      <div className="profile-form-container">
        <div style={{ width: "100%" }}>
          <div style={{
            background: "#ffd2ad",
            borderRadius: "8px",
            padding: "16px 16px 16px 24px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span>จดหมายฝึกงาน....</span>
            <span style={{ fontSize: 28 }}>
              <svg width="28" height="28" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="7" width="18" height="10" rx="2" stroke="#222" strokeWidth="2" fill="none"/>
                <path d="M3 7l9 6 9-6" stroke="#222" strokeWidth="2" fill="none"/>
              </svg>
            </span>
          </div>
          <div style={{
            background: "#ffd2ad",
            borderRadius: "8px",
            padding: "16px 16px 16px 24px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span>จดหมายฝึกงาน....</span>
            <span style={{ fontSize: 28 }}>
              <svg width="28" height="28" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="7" width="18" height="10" rx="2" stroke="#222" strokeWidth="2" fill="none"/>
                <path d="M3 7l9 6 9-6" stroke="#222" strokeWidth="2" fill="none"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mailbox;