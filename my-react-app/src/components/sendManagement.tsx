import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./sendManagement.css";

type ApplicationType = {
  id: number;
  about?: string;
  transcript?: string;
  portfolio?: string;
  createdAt: string;
  user: { name: string };
  internship: { office: string; location?: string };
};

const SendManagement: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<ApplicationType | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/internship-applications`)
      .then(res => res.json())
      .then((apps: ApplicationType[]) => {
        const found = apps.find(app => app.id === Number(id));
        setData(found || null);
      });
  }, [id]);

  const handleAccept = async () => {
    await fetch(`http://localhost:5000/internship-applications/${data?.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "accept" }),
    });
    navigate(-1);
  };

  const handleReject = async () => {
    await fetch(`http://localhost:5000/internship-applications/${data?.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "reject" }),
    });
    navigate(-1);
  };

  if (!data) return <div>Loading...</div>;

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
              {data.user.name}
              <div className="send-management-gpa">
                {/* เพิ่ม field อื่นๆ ตามต้องการ */}
              </div>
            </div>
          </div>
          <div className="send-management-row">
            <div>transcript</div>
            {data.transcript && (
              <a
                href={`http://localhost:5000/${data.transcript.replace(/\\/g, "/")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                ดูไฟล์
              </a>
            )}
          </div>
          <div className="send-management-row">
            <div>portfolio</div>
            {data.portfolio && (
              <a
                href={`http://localhost:5000/${data.portfolio.replace(/\\/g, "/")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                ดูไฟล์
              </a>
            )}
          </div>
          <div className="send-management-row">
            <div>อยากทำงานอะไร/เกี่ยวกับอะไร</div>
            <div>{data.about}</div>
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