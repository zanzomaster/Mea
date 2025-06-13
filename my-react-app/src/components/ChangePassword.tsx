import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("รหัสผ่านใหม่กับยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("ไม่พบข้อมูลผู้ใช้");
      return;
    }
    const res = await fetch("http://localhost:5000/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        oldPassword,
        newPassword,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("เปลี่ยนรหัสผ่านสำเร็จ!");
      navigate("/profile");
    } else {
      alert(data.error || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="register-bg">
      <form className="register-form" onSubmit={handleSubmit}>
        <label>รหัสผ่านเดิม</label>
        <input
          className="register-input"
          type="password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          required
        />
        <label>รหัสผ่านใหม่</label>
        <input
          className="register-input"
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <label>ยืนยันรหัสผ่านใหม่</label>
        <input
          className="register-input"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <button className="register-btn" type="submit">
          เปลี่ยนรหัสผ่าน
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;