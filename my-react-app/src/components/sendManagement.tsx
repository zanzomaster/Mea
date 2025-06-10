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
    <div className="send-management-bg">
      <div className="management-title" style={{ marginTop: 24 }}>การจัดการ</div>
      <div className="send-management-container">
        <div className="send-management-detail">
          <div className="send-management-header">
            <span className="send-management-avatar">
              <svg width="28" height="28" fill="#ff9800" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4"/>
                <path d="M12 14c-5 0-8 2.5-8 4v2h16v-2c0-1.5-3-4-8-4z"/>
              </svg>
            </span>
            <div>
              {data.name}
              <div className="send-management-gpa">
                เกรดเฉลี่ย {data.gpa} {data.university}
              </div>
            </div>
          </div>
          <div className="send-management-row">
            <div>transcript</div>
            <input value={data.transcriptFile} readOnly className="send-management-input" />
            <span>{data.transcript}</span>
          </div>
          <div className="send-management-row">
            <div>portfolio</div>
            <input value={data.portfolioFile} readOnly className="send-management-input" />
            <span>{data.portfolio}</span>
          </div>
          <div className="send-management-row">
            <div>อยากทำงานอะไร/เกี่ยวกับอะไร</div>
            <div>{data.job}</div>
          </div>
        </div>
        <div className="send-management-btn-row">
          <button onClick={handleAccept} className="send-management-btn accept">ตกลงรับ</button>
          <button onClick={handleReject} className="send-management-btn reject">ปฏิเสธ</button>
        </div>
        <div className="send-management-back-row">
          <button
            onClick={() => navigate(-1)}
            className="send-management-btn-back"
          >
            ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendManagement;