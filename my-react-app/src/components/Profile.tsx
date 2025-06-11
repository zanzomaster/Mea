import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const userId = 1; // ตัวอย่าง: ควรดึงจาก auth จริง

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "ชาย",
    birthDate: "",
    nationality: "",
    religion: "",
    englishLevel: "ดี",
    email: "",
    phone: "",
    internshipStart: "",
    internshipEnd: "",
  });

  // โหลดข้อมูลโปรไฟล์
  useEffect(() => {
    fetch(`http://localhost:5000/profile?userId=${userId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setForm(f => ({
            ...f,
            ...data,
            birthDate: data.birthDate ? data.birthDate.slice(0, 10) : "",
            internshipStart: data.internshipStart ? data.internshipStart.slice(0, 10) : "",
            internshipEnd: data.internshipEnd ? data.internshipEnd.slice(0, 10) : "",
          }));
        }
      });
  }, []);

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // handle radio
  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5000/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId }),
    });
    alert("บันทึกโปรไฟล์สำเร็จ");
  };

  return (
    <div className="profile-bg">
      <div className="profile-sidebar">
        <button className="profile-sidebar-btn active" onClick={() => navigate("/profile")}>โปรไฟล์</button>
        <button className="profile-sidebar-btn" onClick={() => navigate("/education")}>การศึกษา</button>
        <button className="profile-sidebar-btn" onClick={() => navigate("/mailbox")}>กล่องจดหมาย</button>
      </div>
      <div className="profile-form-container">
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-form-row">
            <div style={{ flex: 1 }}>
              <label>ชื่อ</label>
              <input className="profile-input" name="firstName" value={form.firstName} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <label>นามสกุล</label>
              <input className="profile-input" name="lastName" value={form.lastName} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label>เพศ</label>
            <div className="profile-radio-group">
              <label>
                <input type="radio" name="gender" value="ชาย" checked={form.gender === "ชาย"} onChange={handleRadio} /> ชาย
              </label>
              <label>
                <input type="radio" name="gender" value="หญิง" checked={form.gender === "หญิง"} onChange={handleRadio} /> หญิง
              </label>
            </div>
          </div>
          <div className="profile-form-row">
            <div>
              <label>วันเกิด</label>
              <input
                className="profile-input"
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
                style={{ width: 180 }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>สัญชาติ</label>
              <input className="profile-input" name="nationality" value={form.nationality} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <label>ศาสนา</label>
              <input className="profile-input" name="religion" value={form.religion} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label>ระดับภาษาอังกฤษ</label>
            <div className="profile-radio-group">
              {["พอใช้", "ปานกลาง", "ดี", "ยอดเยี่ยม"].map(level => (
                <label key={level}>
                  <input
                    type="radio"
                    name="englishLevel"
                    value={level}
                    checked={form.englishLevel === level}
                    onChange={handleRadio}
                  /> {level}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label>Email</label>
            <input className="profile-input--long" name="email" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label>เบอร์โทร</label>
            <input className="profile-input--long" name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div className="profile-form-row">
            <div style={{ flex: 1 }}>
              <label>วันที่เริ่มฝึกงาน</label>
              <input className="profile-input" type="date" name="internshipStart" value={form.internshipStart} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <label>วันที่สิ้นสุดฝึกงาน</label>
              <input className="profile-input" type="date" name="internshipEnd" value={form.internshipEnd} onChange={handleChange} />
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