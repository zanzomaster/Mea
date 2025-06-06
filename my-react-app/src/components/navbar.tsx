import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left: Logo & Title */}
      <div className="navbar-left">
        <img
          src="https://ap-southeast-2-seek-apac.graphassets.com/AEzBCRO50TYyqbV6XzRDQz/9xFH8cAERaaTTHDVwS5Y"
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
        <button className="navbar-btn signup">สมัคร</button>
      </div>
    </nav>
  );
};

export default Navbar;