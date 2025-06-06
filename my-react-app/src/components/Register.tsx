import React from "react";
import "./register.css";

const Register: React.FC = () => {
  return (
    <div className="register-bg">
      <form className="register-form">
        <label>อีเมล</label>
        <input type="email" className="register-input" />
        <label>รหัสผ่าน</label>
        <input type="password" className="register-input" />
        <label>ยืนยันรหัสผ่าน</label>
        <input type="password" className="register-input" />
        <button type="submit" className="register-btn">ดำเนินการต่อ</button>
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