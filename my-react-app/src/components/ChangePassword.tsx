import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle change password logic
    alert("เปลี่ยนรหัสผ่านสำเร็จ!");
    navigate("/profile");
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