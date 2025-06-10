import React from "react";
import { useParams } from "react-router-dom";
import "./sendInternship.css";

const mockInternships = [
  {
    id: 1,
    office: "การไฟฟ้านครหลวง เขตนนทบุรี",
    desc: "รับนักศึกษาฝึกงาน หลายอัตรา",
    location: "ฝ่ายงาน บางกระสอ",
    address: "อำเภอเมืองนนทบุรี นนทบุรี 11000",
    count: 4,
  },
  // ...เพิ่ม mock อื่นถ้าต้องการ...
];

const SendInternship: React.FC = () => {
  const { id } = useParams();
  const data = mockInternships.find((item) => item.id === Number(id));

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: 24 }}>
      <div className="internship-title" style={{ marginTop: 24 }}>ขอฝึกงาน</div>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        background: "#fff6f0",
        borderRadius: 12,
        padding: 24,
      }}>
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          background: "#fff6f0",
          borderRadius: 12,
          padding: 24,
        }}>
          <img src="https://mapapi.mea.or.th/static/media/logo3.8549861c.png" alt="logo" style={{ width: 90, height: 90, marginRight: 24 }} />
          <div>
            <div style={{ fontWeight: "bold", fontSize: 20 }}>{data?.office}</div>
            <div>{data?.desc}</div>
            <div style={{ margin: "8px 0" }}>
              <span style={{ color: "#f47c20", marginRight: 4 }}>📍</span>
              {data?.location}
            </div>
            <div style={{ color: "#888" }}>{data?.address}</div>
            <div style={{ marginTop: 8 }}>
              <span style={{ color: "#f47c20", marginRight: 4 }}>👥</span>
              จำนวน {data?.count} คน
            </div>
          </div>
        </div>
        <form style={{ marginTop: 24 }}>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="อยากทำงานอะไร/เกี่ยวกับอะไร"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ddd",
                fontSize: 16,
                marginBottom: 12,
              }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <div>ส่ง transcript</div>
            <input type="file" />
          </div>
          <div style={{ marginBottom: 12 }}>
            <div>ส่ง portfolio</div>
            <input type="file" />
          </div>
          <button
            type="submit"
            style={{
              background: "#f47c20",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "10px 32px",
              fontSize: 18,
              cursor: "pointer",
              marginTop: 12,
            }}
          >
            ส่ง
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendInternship;