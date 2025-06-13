import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Login: React.FC<{ setUser: (user: { name: string; role: string }) => void }> = ({ setUser }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // เพิ่ม useEffect นี้
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const role = localStorage.getItem("role");
    if (userName && role) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ name: data.user.name, role: data.user.role });
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("userName", data.user.name); // <-- เพิ่มบรรทัดนี้
        navigate("/");
      } else {
        setError(data.error || "เกิดข้อผิดพลาด");
      }
    } catch {
      setError("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    }
  };

  return (
    <div className="register-bg">
      <form className="register-form" onSubmit={handleLogin}>
        <label>อีเมล</label>
        <input type="email" className="register-input" name="email" value={form.email} onChange={handleChange} />
        <label>รหัสผ่าน</label>
        <input type="password" className="register-input" name="password" value={form.password} onChange={handleChange} />
        <button type="submit" className="register-btn">เข้าสู่ระบบ</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {/* <div className="register-or">หรือ</div> */}
        {/* <button type="button" className="register-btn-line">
          <img src="https://play-lh.googleusercontent.com/74iMObG1vsR3Kfm82RjERFhf99QFMNIY211oMvN636_gULghbRBMjpVFTjOK36oxCbs=w240-h480-rw" alt="LINE" className="register-icon" />
          เข้าสู่ระบบด้วย LINE
        </button>
        <button type="button" className="register-btn-google">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" className="register-icon" />
          เข้าสู่ระบบด้วย Google
        </button> */}
        <div className="register-login-link">
          ยังไม่มีบัญชี? <a href="/register">สมัครสมาชิก</a>
        </div>
      </form>
    </div>
  );
};

export default Login;