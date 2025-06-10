import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

type Status = "accept" | "reject" | null;

const Management = () => {
  const navigate = useNavigate();

  // เก็บสถานะของแต่ละรายการ
  const [statusList, setStatusList] = useState<Status[]>(Array(mockData.length).fill(null));

  const handleClick = (idx: number) => {
    navigate(`/sendmanagement/${idx + 1}`, {
      state: { idx }
    });
  };

  // รับค่ากลับมาจากหน้า sendManagement
  React.useEffect(() => {
    // listen event จาก sessionStorage (หรือจะใช้ context/store ก็ได้)
    const handler = (e: StorageEvent) => {
      if (e.key === "managementStatus" && e.newValue) {
        const { idx, status } = JSON.parse(e.newValue);
        setStatusList((prev) => {
          const copy = [...prev];
          copy[idx] = status;
          return copy;
        });
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <div className="management-bg">
      <div className="management-title">การจัดการ</div>
      <div className="management-container">
        <div className="management-content">
          <div className="management-zone-btn-row">
            <button className="management-zone-btn">เขต</button>
          </div>
          <div className="management-list">
            {mockData.map((name, idx) => (
              <div
                className="management-item"
                key={idx}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(idx)}
              >
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
                  {statusList[idx] === "accept" && (
                    <svg width="28" height="28" fill="none" stroke="#4caf50" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="20 6 10 18 4 12" />
                    </svg>
                  )}
                  {statusList[idx] === "reject" && (
                    <svg width="28" height="28" fill="none" stroke="#f44336" strokeWidth="3" viewBox="0 0 24 24">
                      <line x1="6" y1="6" x2="18" y2="18" />
                      <line x1="6" y1="18" x2="18" y2="6" />
                    </svg>
                  )}
                  {statusList[idx] === null && (
                    <svg width="28" height="28" fill="none" stroke="#ff9800" strokeWidth="3" viewBox="0 0 24 24">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  )}
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
};

export default Management;