import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

type MailType = {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

const Mailbox: React.FC = () => {
  const navigate = useNavigate();
  const [mails, setMails] = useState<MailType[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    fetch(`http://localhost:5000/mailbox?userId=${userId}`)
      .then(res => res.json())
      .then(setMails);
  }, []);

  return (
    <div className="profile-bg">
      <div className="profile-sidebar">
        <button className="profile-sidebar-btn" onClick={() => navigate("/profile")}>โปรไฟล์</button>
        <button className="profile-sidebar-btn" onClick={() => navigate("/education")}>การศึกษา</button>
        <button className="profile-sidebar-btn active" onClick={() => navigate("/mailbox")}>กล่องจดหมาย</button>
      </div>
      <div className="profile-form-container">
        <div style={{ width: "100%" }}>
          {mails.length === 0 && (
            <div style={{ color: "#888", textAlign: "center", marginTop: 32 }}>ไม่มีจดหมาย</div>
          )}
          {mails.map(mail => (
            <div
              key={mail.id}
              style={{
                background: "#ffd2ad",
                borderRadius: "8px",
                padding: "16px 16px 16px 24px",
                marginBottom: "16px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <span style={{ fontWeight: 600 }}>{mail.title}</span>
              <span style={{ marginTop: 6 }}>{mail.message}</span>
              <span style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
                {new Date(mail.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mailbox;