import React from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-bg">
      <div className="profile-sidebar">
        <button className="profile-sidebar-btn" onClick={() => navigate("/profile")}>โปรไฟล์</button>
        <button className="profile-sidebar-btn" onClick={() => navigate("/education")}>การศึกษา</button>
        <button className="profile-sidebar-btn" onClick={() => navigate("/mailbox")}>กล่องจดหมาย</button>
      </div>
      <div className="profile-form-container">
        <form className="profile-form">
          <div className="profile-form-row">
            <div style={{ flex: 1 }}>
              <label>ชื่อ</label>
              <input className="profile-input" />
            </div>
            <div style={{ flex: 1 }}>
              <label>นามสกุล</label>
              <input className="profile-input" />
            </div>
          </div>
          <div>
            <label>เพศ</label>
            <div className="profile-radio-group">
              <label><input type="radio" name="gender" defaultChecked /> ชาย</label>
              <label><input type="radio" name="gender" /> หญิง</label>
            </div>
          </div>
          <div className="profile-form-row">
            <div>
              <label>วันเกิด</label>
              <div className="profile-form-row">
                <select className="profile-input" style={{ width: 70 }}>
                  <option>31</option>
                </select>
                <select className="profile-input" style={{ width: 120 }}>
                  <option>กรกฎาคม</option>
                </select>
                <select className="profile-input" style={{ width: 90 }}>
                  <option>2546</option>
                </select>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label>สัญชาติ</label>
              <input className="profile-input" />
            </div>
            <div style={{ flex: 1 }}>
              <label>ศาสนา</label>
              <input className="profile-input" />
            </div>
          </div>
          <div>
            <label>ระดับภาษาอังกฤษ</label>
            <div className="profile-radio-group">
              <label><input type="radio" name="eng" /> พอใช้</label>
              <label><input type="radio" name="eng" /> ปานกลาง</label>
              <label><input type="radio" name="eng" defaultChecked /> ดี</label>
              <label><input type="radio" name="eng" /> ยอดเยี่ยม</label>
            </div>
          </div>
          <div>
            <label>Email</label>
            <input className="profile-input--long" />
          </div>
          <div>
            <label>เบอร์โทร</label>
            <input className="profile-input--long" />
          </div>
          <div className="profile-form-row">
            <div style={{ flex: 1 }}>
              <label>วันที่เริ่มฝึกงาน</label>
              <input className="profile-input" />
            </div>
            <div style={{ flex: 1 }}>
              <label>วันที่สิ้นสุดฝึกงาน</label>
              <input className="profile-input" />
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

export default Profile;