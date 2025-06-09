import React from "react";
import "./Office.css";

const officeList = [
  "สำนักงานใหญ่คลองเตย",
  "สำนักงานเพลินจิต",
  "เขตรัชดา",
  "เขตบางใหญ่",
  "เขตบางบัวทอง",
  "เขตบางนา",
  "เขตบางเขน",
  "เขตบางกะปิ",
  "เขตบางพลัด",
  "เขตสัมพันธวงศ์",
  "เขตบางรัก",
  "เขตบางซื่อ",
  "เขตธนบุรี",
  "เขตบางบอน",
  "เขตบางขุนเทียน",
  "เขตบางบำหรุ",
  "เขตบางซ่อน",
  "เขตดอนเมือง",
  "เขตบางซื่อ (ชั่วคราว)",
];

const Office: React.FC = () => (
  <div className="office-container">
    <div className="office-content">
      <h2>ที่ตั้งสำนักงานเขต การไฟฟ้านครหลวง</h2>
      <div className="office-flex">
        {/* รายชื่อสำนักงาน */}
        <div className="office-list">
          <ul>
            {officeList.map((name) => (
              <li key={name}>
                <span className="office-pin">📍</span>
                <span className="office-name">{name}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* เว้นว่างสำหรับแผนที่ */}
        <div className="office-map-placeholder">
          <img
            src="https://pailin.voicetv.co.th/assets/aW1hZ2UvMjAxOC0xMi8xYTdkZDUxYTUwZTYzM2U2ZDVjYjQ2ZGY1MjViMDdiZi5qcGc="
            alt="แผนที่สำนักงาน"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
          />
        </div>
      </div>
      {/* ข้อมูลสำนักงาน */}
      <div className="office-detail">
        <div className="office-detail-title">
          สถานที่ตั้งฝน.เขต : สำนักงานเพลินจิต
        </div>
        <div className="office-detail-desc">
          สถานที่ตั้งเลขที่ 30 ซอย ชิดลม ถนน เพลินจิต แขวงลุมพินี เขต ปทุมวัน กทม. 10330
          <br />
          เบอร์โทรศัพท์ 0 2256 3000
          <br />
          โทรสาร 0 2256 3678
          <br />
          จุดสังเกต ด้านข้างเป็นร้านจำหน่ายสรรพสินค้าเซ็นทรัลชิดลม ด้านหน้าติดกับทางขึ้น-ลงสถานีรถไฟฟ้าชิดลม ตรงข้าม รร. นานาชาติวิทยาลัย
        </div>
      </div>
    </div>
  </div>
);

export default Office;