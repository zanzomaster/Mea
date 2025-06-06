import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
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
        <div className="navbar-menu-item">
          ข่าวสาร
          <span className="navbar-menu-arrow">▼</span>
        </div>
        <div className="navbar-menu-item">ขอฝึกงาน</div>
        <div className="navbar-menu-item">ที่ทำการ</div>
        <div className="navbar-menu-item">ติดต่อเรา</div>
      </div>

      {/* Right: Buttons */}
      <div className="navbar-right">
        <button className="navbar-btn login">เข้าสู่ระบบ</button>
        <Link to="/register" className="navbar-btn signup">สมัคร</Link>
      </div>
    </nav>
  );
};

export default Navbar;