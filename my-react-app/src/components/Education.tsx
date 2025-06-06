import React from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";

const Education: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-bg">
      <div className="profile-sidebar">
        <button className="profile-sidebar-btn" onClick={() => navigate("/profile")}>โปรไฟล์</button>
        <button className="profile-sidebar-btn active">การศึกษา</button>
        <button className="profile-sidebar-btn" onClick={() => navigate("/mailbox")}>กล่องจดหมาย</button>
      </div>
      <div className="profile-form-container">
        <form className="profile-form">
          <div>
            <label>ระดับการศึกษา</label>
            <select className="profile-input profile-input--long">
              <option>กรุณาเลือก</option>
              <option>ปริญญาตรี</option>
              <option>ปริญญาโท</option>
              <option>ปริญญาเอก</option>
            </select>
          </div>
          <div>
            <label>ชื่อสถานศึกษา</label>
            <input className="profile-input profile-input--long" />
          </div>
          <div className="profile-form-row">
            <div style={{ flex: 1 }}>
              <label>คณะ/วิทยาลัย</label>
              <input className="profile-input profile-input--long" />
            </div>
            <div style={{ flex: 1 }}>
              <label>สาขา</label>
              <input className="profile-input profile-input--long" />
            </div>
          </div>
          <div>
            <label>เกรดเฉลี่ย</label>
            <input className="profile-input profile-input--long" />
          </div>
          <div>
            <label>สถานะ:</label>
            <div className="profile-radio-group">
              <label>
                <input type="radio" name="status" defaultChecked /> กำลังศึกษา
              </label>
              <label>
                <input type="radio" name="status" /> จบการศึกษาแล้ว
              </label>
            </div>
          </div>
          <div className="profile-form-row" style={{ justifyContent: "flex-end" }}>
            <button type="submit" className="profile-submit-btn">ตกลง</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Education;