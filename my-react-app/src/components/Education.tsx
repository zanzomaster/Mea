import React, { useEffect, useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";


const Education: React.FC = () => {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId")); // ดึง userId จริงจาก localStorage
  const [form, setForm] = useState({
    level: "",
    school: "",
    faculty: "",
    major: "",
    gpa: "",
    status: "กำลังศึกษา",
  });

  // โหลดข้อมูลการศึกษา
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/education?userId=${userId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setForm({
            level: data.level || "",
            school: data.school || "",
            faculty: data.faculty || "",
            major: data.major || "",
            gpa: data.gpa ? String(data.gpa) : "",
            status: data.status || "กำลังศึกษา",
          });
        }
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, status: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("ไม่พบ userId กรุณาเข้าสู่ระบบใหม่");
      return;
    }
    await fetch("http://localhost:5000/education", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, gpa: form.gpa ? parseFloat(form.gpa) : null, userId }),
    });
    alert("บันทึกข้อมูลการศึกษาสำเร็จ");
  };

  return (
    <div className="profile-bg">
      <div className="profile-sidebar">
        <button className="profile-sidebar-btn" onClick={() => navigate("/profile")}>โปรไฟล์</button>
        <button className="profile-sidebar-btn active">การศึกษา</button>
        <button className="profile-sidebar-btn" onClick={() => navigate("/mailbox")}>กล่องจดหมาย</button>
      </div>
      <div className="profile-form-container">
        <form className="profile-form" onSubmit={handleSubmit}>
          <div>
            <label>ระดับการศึกษา</label>
            <select
              className="profile-input profile-input--long"
              name="level"
              value={form.level}
              onChange={handleChange}
            >
              <option value="">กรุณาเลือก</option>
              <option value="ปริญญาตรี">ปริญญาตรี</option>
              <option value="ปริญญาโท">ปริญญาโท</option>
              <option value="ปริญญาเอก">ปริญญาเอก</option>
            </select>
          </div>
          <div>
            <label>ชื่อสถานศึกษา</label>
            <input className="profile-input profile-input--long" name="school" value={form.school} onChange={handleChange} />
          </div>
          <div className="profile-form-row">
            <div style={{ flex: 1 }}>
              <label>คณะ/วิทยาลัย</label>
              <input className="profile-input profile-input--long" name="faculty" value={form.faculty} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <label>สาขา</label>
              <input className="profile-input profile-input--long" name="major" value={form.major} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label>เกรดเฉลี่ย</label>
            <input className="profile-input profile-input--long" name="gpa" value={form.gpa} onChange={handleChange} type="number" step="0.01" min="0" max="4" />
          </div>
          <div>
            <label>สถานะ:</label>
            <div className="profile-radio-group">
              <label>
                <input type="radio" name="status" value="กำลังศึกษา" checked={form.status === "กำลังศึกษา"} onChange={handleRadio} /> กำลังศึกษา
              </label>
              <label>
                <input type="radio" name="status" value="จบการศึกษาแล้ว" checked={form.status === "จบการศึกษาแล้ว"} onChange={handleRadio} /> จบการศึกษาแล้ว
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