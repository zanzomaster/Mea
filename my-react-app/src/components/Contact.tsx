import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Office.css";

const mainOffice = {
  name: "สำนักงานใหญ่ การไฟฟ้านครหลวง",
  address: (
    <>
      อาคารวัฒนวิภาส เลขที่ 1192 ถนนพระรามที่ 4<br />
      แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110
    </>
  ),
  lat: 13.7223,
  lng: 100.5372,
};

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const Contact: React.FC = () => (
  <div className="office-container">
    <div className="office-content">
      <h2 style={{ marginTop: 0 }}>ติดต่อเรา</h2>
      <div className="contact-main-office">
        <div className="contact-title">{mainOffice.name}</div>
        <div className="contact-address">{mainOffice.address}</div>
        <div className="contact-icons">
          <span className="contact-icon" title="ที่ตั้ง"><span style={{color:"#ff9800",fontSize:24}}>📍</span></span>
          <span className="contact-icon" title="MRT"><span style={{color:"#ff9800",fontSize:24}}>🚇</span></span>
        </div>
        <div className="contact-transport">
          รถไฟฟ้า MRT - สถานีคลองเตย<br />
          รถเมล์สาย 4, 13, 22, 45, 46, 47, 74, 115, 116, 141, 149
        </div>
      </div>
      <div className="office-map-placeholder" style={{margin:"32px 0", minHeight: 300}}>
        <MapContainer
          center={[mainOffice.lat, mainOffice.lng]}
          zoom={17}
          style={{ width: "100%", height: "100%", minHeight: 300, borderRadius: 8 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[mainOffice.lat, mainOffice.lng]} icon={markerIcon}>
            <Popup>
              <b>{mainOffice.name}</b>
              <br />
              อาคารวัฒนวิภาส เลขที่ 1192 ถนนพระรามที่ 4<br />
              แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110
            </Popup>
          </Marker>
        </MapContainer>
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