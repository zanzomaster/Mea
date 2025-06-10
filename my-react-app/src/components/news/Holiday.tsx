import React from "react";
import "./news.css";

const Holiday: React.FC = () => (
  <div className="news-page">
    <h1>ประกาศวันหยุด</h1>
    <ul>
      <li>
        <b>วันอาสาฬหบูชา</b> : 20 กรกฎาคม 2568
      </li>
      <li>
        <b>วันเข้าพรรษา</b> : 21 กรกฎาคม 2568
      </li>
      <li>
        <b>วันแม่แห่งชาติ</b> : 12 สิงหาคม 2568
      </li>
    </ul>
  </div>
);

export default Holiday;