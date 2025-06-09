import React from "react";
import "./Office.css";

const Contact: React.FC = () => (
  <div className="office-container">
    <div className="office-content">
      <h2 style={{ marginTop: 0 }}>ติดต่อเรา</h2>
      <div className="contact-main-office">
        <div className="contact-title">สำนักงานใหญ่ การไฟฟ้านครหลวง</div>
        <div className="contact-address">
          อาคารวัฒนวิภาส เลขที่ 1192 ถนนพระรามที่ 4<br />
          แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110
        </div>
        <div className="contact-icons">
          <span className="contact-icon" title="ที่ตั้ง"><span style={{color:"#ff9800",fontSize:24}}>📍</span></span>
          <span className="contact-icon" title="MRT"><span style={{color:"#ff9800",fontSize:24}}>🚇</span></span>
        </div>
        <div className="contact-transport">
          รถไฟฟ้า MRT - สถานีคลองเตย<br />
          รถเมล์สาย 4, 13, 22, 45, 46, 47, 74, 115, 116, 141, 149
        </div>
      </div>
      <div className="office-map-placeholder" style={{margin:"32px 0"}}>
        <img
          src="https://pailin.voicetv.co.th/assets/aW1hZ2UvMjAxOC0xMi8xYTdkZDUxYTUwZTYzM2U2ZDVjYjQ2ZGY1MjViMDdiZi5qcGc="
          alt="แผนที่สำนักงาน"
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
        />
      </div>
      <div className="contact-callcenter">
        <div className="contact-callcenter-title">MEA Call Center</div>
        <div>
          ศูนย์บริการข้อมูลผู้ใช้ไฟฟ้าการไฟฟ้านครหลวง ให้บริการตลอด 24 ชั่วโมง "ทุกคำถามเรื่องไฟฟ้า ทุกเวลามีคำตอบ"
        </div>
        <div className="contact-callcenter-info">
          <span className="contact-icon" title="โทรศัพท์" style={{marginRight:8}}>
            <span style={{color:"#ff9800",fontSize:24}}>📞</span>
          </span>
          1130
        </div>
        <div className="contact-callcenter-info">
          <span className="contact-icon" title="อีเมล" style={{marginRight:8}}>
            <span style={{color:"#ff9800",fontSize:24}}>✉️</span>
          </span>
          callcenter@mea.or.th
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
