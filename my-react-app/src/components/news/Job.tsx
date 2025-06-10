import React from "react";
import "./news.css";

const Job: React.FC = () => (
  <div className="news-page">
    <h1>ลักษณะงานและหน้าที่ความรับผิดชอบ</h1>
    <ul>
      <li>
        <b>นักศึกษาฝึกงานฝ่าย IT</b>
        <br />
        - พัฒนาเว็บไซต์และแอปพลิเคชัน
        <br />
        - ดูแลระบบเครือข่ายและฐานข้อมูล
      </li>
      <li style={{ marginTop: 16 }}>
        <b>นักศึกษาฝึกงานฝ่ายวิศวกรรม</b>
        <br />
        - ตรวจสอบและบำรุงรักษาอุปกรณ์ไฟฟ้า
        <br />
        - สนับสนุนงานภาคสนาม
      </li>
    </ul>
  </div>
);

export default Job;