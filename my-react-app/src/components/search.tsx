import React from "react";
import "./search.css";

const Search: React.FC = () => {
  return (
    <div className="search-bar-bg">
      <form className="search-bar-form">
        <input
          className="search-bar-input"
          type="text"
          placeholder="คำที่ต้องการค้นหา"
        />
        <select className="search-bar-select">
          <option>ที่ตั้งสำนักงานเขต</option>
          {/* เพิ่ม option อื่นๆ ได้ */}
        </select>
        <button className="search-bar-btn" type="submit">
          ค้นหา
        </button>
      </form>
    </div>
  );
};

export default Search;