import React from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Login: React.FC<{ setUser: (user: { name: string }) => void }> = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ name: "ปริวรรต" }); // ตั้งชื่อผู้ใช้จำลอง
    navigate("/"); // กลับไปหน้าแรก
  };

  return (
    <div className="register-bg">
      <form className="register-form" onSubmit={handleLogin}>
        <label>อีเมล</label>
        <input type="email" className="register-input" />
        <label>รหัสผ่าน</label>
        <input type="password" className="register-input" />
        <button type="submit" className="register-btn">เข้าสู่ระบบ</button>
        <div className="register-or">หรือ</div>
        <button type="button" className="register-btn-line">
          <img src="https://play-lh.googleusercontent.com/74iMObG1vsR3Kfm82RjERFhf99QFMNIY211oMvN636_gULghbRBMjpVFTjOK36oxCbs=w240-h480-rw" alt="LINE" className="register-icon" />
          เข้าสู่ระบบด้วย LINE
        </button>
        <button type="button" className="register-btn-google">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" className="register-icon" />
          เข้าสู่ระบบด้วย Google
        </button>
        <div className="register-login-link">
          ยังไม่มีบัญชี? <a href="/register">สมัครสมาชิก</a>
        </div>
      </form>
    </div>
  );
};

export default Login;