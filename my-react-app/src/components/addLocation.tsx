import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addLocation.css";

const AddLocation: React.FC = () => {
  const [office, setOffice] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [count, setCount] = useState<number | "">("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!office) {
      setError("กรุณากรอกชื่อสถานที่ฝึกงาน");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/internships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ office, desc, location, address, count: count ? Number(count) : null }),
      });
      if (res.ok) {
        alert("เพิ่มข้อมูลฝึกงานสำเร็จ");
        navigate("/"); // หรือจะ navigate ไปหน้า internship list ก็ได้
      } else {
        const data = await res.json();
        setError(data.error || "เกิดข้อผิดพลาด");
      }
    } catch {
      setError("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    }
  };

  return (
    <div className="add-location-bg">
      <form className="add-location-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>เพิ่มสถานที่ฝึกงาน</h2>
        <label>ชื่อสถานที่ฝึกงาน*</label>
        <input className="add-location-input" value={office} onChange={e => setOffice(e.target.value)} required />
        <label>รายละเอียด</label>
        <textarea className="add-location-input" value={desc} onChange={e => setDesc(e.target.value)} />
        <label>เขต/โซน</label>
        <input className="add-location-input" value={location} onChange={e => setLocation(e.target.value)} />
        <label>ที่อยู่</label>
        <input className="add-location-input" value={address} onChange={e => setAddress(e.target.value)} />
        <label>จำนวนรับ</label>
        <input className="add-location-input" type="number" min={1} value={count} onChange={e => setCount(e.target.value ? Number(e.target.value) : "")} />
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        <button className="add-location-btn" type="submit" style={{ marginTop: 24, width: "100%" }}>บันทึก</button>
      </form>
    </div>
  );
};

export default AddLocation;
