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
          {mails.map(mail => {
            // แยกไฟล์แนบออกจากข้อความ
            let message = mail.message;
            let fileLinks: string[] = [];
            const match = message.match(/\[แนบไฟล์\](.*)/);
            if (match) {
              // ตัด [แนบไฟล์] ออก แล้วแยก path
              fileLinks = match[1]
                .replace(/^\s*|\s*$/g, "") // trim
                .split(",")
                .map(s => s.trim())
                .filter(s => !!s);
              message = message.replace(/\[แนบไฟล์\].*/s, "").trim();
            }

            return (
              <div
                key={mail.id}
                style={{
                  background: "#ffc5aa",
                  borderRadius: "8px",
                  padding: "16px 16px 16px 24px",
                  marginBottom: "16px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative"
                }}
              >
                <span style={{ fontWeight: 600 }}>{mail.title}</span>
                {/* ข้อความหลัก */}
                {message && <span style={{ marginTop: 6, whiteSpace: "pre-line" }}>{message}</span>}
                {/* แสดงไฟล์แนบ */}
                {fileLinks.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <span style={{ fontWeight: 500 }}>ไฟล์ที่ส่ง:</span>
                    <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                      {fileLinks.map((file, idx) => (
                        <li key={idx}>
                          <a
                          
                            href={`http://localhost:5000/${file.replace(/\\/g, "/")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#f47c20", textDecoration: "underline" }}
                            onClick={e => e.stopPropagation()}
                          >
                            {file.split(/[\\/]/).pop()}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <span style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
                  {new Date(mail.createdAt).toLocaleString()}
                </span>
                <button
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "#f47c20",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 16px",
                    cursor: "pointer"
                  }}
                  onClick={() => navigate(`/mailbox/send/${mail.id}`)}
                >
                  ส่งไฟล์
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Mailbox;