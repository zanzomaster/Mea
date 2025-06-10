import React from "react";
import "./news.css";

const Education: React.FC = () => (
  <div className="news-page">
    <h1>การศึกษา</h1>
    <ul>
      <li>
        <b>โครงการอบรมเชิงปฏิบัติการสำหรับนักศึกษาฝึกงาน</b>
        <br />
        วันที่ 10-12 มิถุนายน 2568 ณ ห้องประชุมใหญ่ การไฟฟ้านครหลวง
        <br />
        <span style={{ color: "#f47c20" }}>ประกาศเมื่อ 1 มิ.ย. 2568</span>
      </li>
      <li style={{ marginTop: 16 }}>
        <b>ทุนการศึกษาสำหรับนักศึกษาฝึกงานดีเด่น</b>
        <br />
        เปิดรับสมัครถึง 30 มิถุนายน 2568
        <br />
        <span style={{ color: "#f47c20" }}>ประกาศเมื่อ 25 พ.ค. 2568</span>
      </li>
    </ul>
  </div>
);

export default Education;