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
  <div style={{ background: "#fff", minHeight: "100vh", padding: 0 }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 32 }}>
      <h2 style={{ textAlign: "center", marginTop: 24, color: "#222" }}>
        ที่ตั้งสำนักงานเขต การไฟฟ้านครหลวง
      </h2>
      <div style={{ display: "flex", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
        {/* รายชื่อสำนักงาน */}
        <div style={{ flex: "0 0 260px" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {officeList.map((name, idx) => (
              <li key={name} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                <span style={{ color: "#ff5722", fontSize: 20, marginRight: 8 }}>📍</span>
                <span style={{ fontSize: 16 }}>{name}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* เว้นว่างสำหรับแผนที่ */}
        <div style={{ flex: 1, minWidth: 320, background: "#f5f5f5", minHeight: 350, borderRadius: 8, border: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#bbb" }}>เว้นว่างสำหรับแผนที่</span>
        </div>
      </div>
      {/* ข้อมูลสำนักงาน */}
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <div style={{ color: "#ff9800", fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
          สถานที่ตั้งฝน.เขต : สำนักงานเพลินจิต
        </div>
        <div style={{ fontSize: 16, color: "#222", marginBottom: 8 }}>
          สถานที่ตั้งเลขที่ 30 ซอย ชิดลม ถนน เพลินจิต แขวงลุมพินี เขต ปทุมวัน กทม. 10330<br />
          เบอร์โทรศัพท์ 0 2256 3000<br />
          โทรสาร 0 2256 3678<br />
          จุดสังเกต ด้านข้างเป็นร้านจำหน่ายสรรพสินค้าเซ็นทรัลชิดลม ด้านหน้าติดกับทางขึ้น-ลงสถานีรถไฟฟ้าชิดลม ตรงข้าม รร. นานาชาติวิทยาลัย
        </div>
      </div>
    </div>
  </div>
);

export default Office;