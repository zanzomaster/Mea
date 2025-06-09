import React from "react";
import "./management.css";

const mockData = [
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
  "นายปวีรวรรณ อาชวรรณ คณะวิศวกรรม สาขาวิศวกรรมคอมพิวเตอร์ เขตนนทบุรี",
];

const Management = () => (
  <div className="management-bg">
    <div className="management-title">การจัดการ</div>
    <div className="management-container">
      <div className="management-content">
        <div className="management-zone-btn-row">
          <button className="management-zone-btn">เขต</button>
        </div>
        <div className="management-list">
          {mockData.map((name, idx) => (
            <div className="management-item" key={idx}>
              <div className="management-item-info">
                <span className="management-avatar">
                  <svg width="28" height="28" fill="#ff9800" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M12 14c-5 0-8 2.5-8 4v2h16v-2c0-1.5-3-4-8-4z"/>
                  </svg>
                </span>
                <span>{name}</span>
              </div>
              <span>
                <svg width="28" height="28" fill="none" stroke="#ff9800" strokeWidth="3" viewBox="0 0 24 24">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          ))}
        </div>
        <div className="management-pagination">
          1
          <span className="management-pagination-arrow">›</span>
        </div>
      </div>
    </div>
  </div>
);

export default Management;