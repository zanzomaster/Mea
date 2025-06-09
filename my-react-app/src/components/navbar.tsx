import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ user, setUser }: { user: { name: string } | null, setUser: (u: null) => void }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // เพิ่ม useNavigate

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Left: Logo & Title */}
      <div className="navbar-left">
        <img
          src="https://mapapi.mea.or.th/static/media/logo3.8549861c.png"
          alt="MEA Logo"
          className="navbar-logo"
        />
        <div>
          <div className="navbar-subtitle">เว็บไซต์ของฝึกงาน</div>
          <div className="navbar-title">การไฟฟ้านครหลวง</div>
          <div className="navbar-en-title">Metropolitan Electricity Authority</div>
        </div>
      </div>

      {/* Center: Menu */}
      <div className="navbar-center">
        <div className="navbar-menu-item news-dropdown">
          ข่าวสาร
          <span className="navbar-menu-arrow">▼</span>
          <div className="navbar-dropdown-menu">
            <Link to="/news/education" className="navbar-dropdown-item">การศึกษา</Link>
            <Link to="/news/job" className="navbar-dropdown-item">ลักษณะงานและหน้าที่ความรับผิดชอบ</Link>
            <Link to="/news/holiday" className="navbar-dropdown-item">ประกาศวันหยุด</Link>
            <Link to="/news/time" className="navbar-dropdown-item">เวลาทำงาน</Link>
          </div>
        </div>
        <Link to="/" className="navbar-menu-item">ขอฝึกงาน</Link>
        <Link to="/Office" className="navbar-menu-item">ที่ทำการ</Link>
        <Link to="/contact" className="navbar-menu-item">ติดต่อเรา</Link>
        <Link to="/management" className="navbar-menu-item">การจัดการ</Link>
      </div>

      {/* Right: Buttons */}
      <div className="navbar-right">
        {user ? (
          <div
            className="navbar-user-dropdown"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <span className="navbar-user">
              นาย{user.name}
              <span className="navbar-user-icon">
                <svg width="28" height="28" fill="#ff9800" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M12 14c-5 0-8 2.5-8 4v2h16v-2c0-1.5-3-4-8-4z"/>
                </svg>
              </span>
              <span className="navbar-caret">▼</span>
            </span>
            {open && (
              <div className="navbar-dropdown-menu">
                <Link to="/profile" className="navbar-dropdown-item">โปรไฟล์</Link>
                <Link to="/education" className="navbar-dropdown-item">การศึกษา</Link>
                <Link to="/mailbox" className="navbar-dropdown-item">กล่องจดหมาย</Link>
                <Link to="/change-password" className="navbar-dropdown-item">เปลี่ยนรหัสผ่าน</Link>
                <div
                  className="navbar-dropdown-item logout"
                  onClick={handleLogout}
                >
                  ออกจากระบบ
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="navbar-btn login">เข้าสู่ระบบ</Link>
            <Link to="/register" className="navbar-btn signup">สมัคร</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;