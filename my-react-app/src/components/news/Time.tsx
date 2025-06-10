import React from "react";
import "./news.css";

const Time: React.FC = () => (
  <div className="news-page">
    <h1>เวลาทำงาน</h1>
    <ul>
      <li>
        <b>เวลาทำการปกติ</b> : วันจันทร์ - ศุกร์ เวลา 08:00 - 16:00 น.
      </li>
      <li>
        <b>พักกลางวัน</b> : เวลา 12:00 - 13:00 น.
      </li>
      <li>
        <b>หยุดทำการ</b> : วันเสาร์, อาทิตย์ และวันหยุดนักขัตฤกษ์
      </li>
    </ul>
  </div>
);

export default Time;