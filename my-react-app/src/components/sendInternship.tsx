import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./sendInternship.css";

type InternshipType = {
  id: number;
  office: string;
  desc?: string;
  location?: string;
  address?: string;
  count?: number;
};

const SendInternship: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<InternshipType | null>(null);
  const [about, setAbout] = useState("");
  const [transcript, setTranscript] = useState<File | null>(null);
  const [portfolio, setPortfolio] = useState<File | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/internships`)
      .then(res => res.json())
      .then((list: InternshipType[]) => {
        const found = list.find(item => item.id === Number(id));
        setData(found || null);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("internshipId", String(id));
    formData.append("about", about);
    if (transcript) formData.append("transcript", transcript);
    if (portfolio) formData.append("portfolio", portfolio);
    const userId = localStorage.getItem("userId");
    if (userId) formData.append("userId", userId);

    const res = await fetch("http://localhost:5000/apply-internship", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      alert("ส่งใบสมัครฝึกงานสำเร็จ");
      setAbout("");
      setTranscript(null);
      setPortfolio(null);
    } else {
      alert("เกิดข้อผิดพลาดในการส่งใบสมัคร");
    }
  };

  return (
    <div className="send-internship-bg">
      <div className="internship-title" style={{ marginTop: 24 }}>ขอฝึกงาน</div>
      <div className="send-internship-container">
        <div className="send-internship-detail">
          <img src="https://mapapi.mea.or.th/static/media/logo3.8549861c.png" alt="logo" className="send-internship-logo" />
          <div>
            <div className="send-internship-office">{data?.office}</div>
            <div>{data?.desc}</div>
            <div className="send-internship-location">
              <span style={{ color: "#f47c20", marginRight: 4 }}>📍</span>
              {data?.location}
            </div>
            <div className="send-internship-address">{data?.address}</div>
            <div className="send-internship-count">
              <span style={{ color: "#f47c20", marginRight: 4 }}>👥</span>
              จำนวน {data?.count} คน
            </div>
          </div>
        </div>
        <form className="send-internship-form" onSubmit={handleSubmit}>
          <div className="send-internship-form-row">
            <input
              type="text"
              placeholder="อยากทำงานอะไร/เกี่ยวกับอะไร"
              className="send-internship-input"
              value={about}
              onChange={e => setAbout(e.target.value)}
            />
          </div>
          <div className="send-internship-form-row">
            <div>ส่ง transcript</div>
            <input type="file" onChange={e => setTranscript(e.target.files?.[0] || null)} />
          </div>
          <div className="send-internship-form-row">
            <div>ส่ง portfolio</div>
            <input type="file" onChange={e => setPortfolio(e.target.files?.[0] || null)} />
          </div>
          <button
            type="submit"
            className="send-internship-btn"
          >
            ส่ง
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendInternship;