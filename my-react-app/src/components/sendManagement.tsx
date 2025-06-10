import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./sendManagement.css";

const mockDetail = {
  name: "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  gpa: "3.65",
  university: "มหาวิทยาลัย ธุรกิจบัณฑิตย์",
  transcript: "transcript.pdf",
  transcriptFile: "Test.pdf",
  portfolio: "portfolio.pdf",
  portfolioFile: "porttest.pdf",
  job: "Tester, ออกแบบหน้าบ้านเว็บ, Security, ทำเว็บ",
};

const SendManagement: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const idx = Number(id) - 1;

  // ในงานจริงควรดึงข้อมูลตาม id
  const data = mockDetail;

  const handleAccept = () => {
    sessionStorage.setItem("managementStatus", JSON.stringify({ idx, status: "accept" }));
    navigate(-1);
  };

  const handleReject = () => {
    sessionStorage.setItem("managementStatus", JSON.stringify({ idx, status: "reject" }));
    navigate(-1);
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: 24 }}>
      <div className="management-title" style={{ marginTop: 24 }}>การจัดการ</div>
      <div style={{
        maxWidth: 700,
        margin: "0 auto",
        background: "#ffe3cf",
        borderRadius: 12,
        padding: 24,
      }}>
        <div style={{
          background: "#ffb381",
          borderRadius: 8,
          padding: 24,
          marginBottom: 24,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 12 }}>
            <span style={{
              background: "#fff",
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
              border: "2px solid #ff9800"
            }}>
              <svg width="28" height="28" fill="#ff9800" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4"/>
                <path d="M12 14c-5 0-8 2.5-8 4v2h16v-2c0-1.5-3-4-8-4z"/>
              </svg>
            </span>
            <div>
              {data.name}
              <div style={{ fontSize: 15, marginTop: 4 }}>
                เกรดเฉลี่ย {data.gpa} {data.university}
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <div>transcript</div>
            <input value={data.transcriptFile} readOnly style={{ marginRight: 8, borderRadius: 6, border: "1px solid #ccc", padding: "2px 8px" }} />
            <span>{data.transcript}</span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <div>portfolio</div>
            <input value={data.portfolioFile} readOnly style={{ marginRight: 8, borderRadius: 6, border: "1px solid #ccc", padding: "2px 8px" }} />
            <span>{data.portfolio}</span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <div>อยากทำงานอะไร/เกี่ยวกับอะไร</div>
            <div>{data.job}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button onClick={handleAccept} style={{
            background: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "10px 32px",
            fontSize: 16,
            cursor: "pointer"
          }}>ตกลงรับ</button>
          <button onClick={handleReject} style={{
            background: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "10px 32px",
            fontSize: 16,
            cursor: "pointer"
          }}>ปฏิเสธ</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button style={{
            background: "#fff",
            color: "#ff9800",
            border: "2px solid #ff9800",
            borderRadius: 6,
            padding: "8px 32px",
            fontSize: 16,
            cursor: "pointer"
          }}>ย้อนกลับ</button>
        </div>
      </div>
    </div>
  );
};

export default SendManagement;