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
        <form className="send-internship-form">
          <div className="send-internship-form-row">
            <input
              type="text"
              placeholder="อยากทำงานอะไร/เกี่ยวกับอะไร"
              className="send-internship-input"
            />
          </div>
          <div className="send-internship-form-row">
            <div>ส่ง transcript</div>
            <input type="file" />
          </div>
          <div className="send-internship-form-row">
            <div>ส่ง portfolio</div>
            <input type="file" />
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