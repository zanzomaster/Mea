import React, { useState } from "react";
import "./register.css";

const Register: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    if (form.password !== form.confirm) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("สมัครสมาชิกสำเร็จ");
        setForm({ name: "", email: "", password: "", confirm: "" });
      } else {
        setError(data.error || "เกิดข้อผิดพลาด");
      }
    } catch {
      setError("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    }
  };

  return (
    <div className="register-bg">
      <form className="register-form" onSubmit={handleSubmit}>
        <label>ชื่อ</label>
        <input type="text" className="register-input" name="name" value={form.name} onChange={handleChange} />
        <label>อีเมล</label>
        <input type="email" className="register-input" name="email" value={form.email} onChange={handleChange} />
        <label>รหัสผ่าน</label>
        <input type="password" className="register-input" name="password" value={form.password} onChange={handleChange} />
        <label>ยืนยันรหัสผ่าน</label>
        <input type="password" className="register-input" name="confirm" value={form.confirm} onChange={handleChange} />
        <button type="submit" className="register-btn">ดำเนินการต่อ</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}
        <div className="register-or">หรือ</div>
        <button type="button" className="register-btn-line">
          <img src="https://play-lh.googleusercontent.com/74iMObG1vsR3Kfm82RjERFhf99QFMNIY211oMvN636_gULghbRBMjpVFTjOK36oxCbs=w240-h480-rw" alt="LINE" className="register-icon" />
          ลงทะเบียนด้วย LINE
        </button>
        <button type="button" className="register-btn-google">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" className="register-icon" />
          ลงทะเบียนด้วย Google
        </button>
        <div className="register-login-link">
          มีบัญชีอยู่แล้ว ? <a href="/login">เข้าสู่ระบบ</a>
        </div>
      </form>
    </div>
  );
};

export default Register;