import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Office.css";

// รายชื่อสำนักงาน/เขต พร้อม lat/lng และรายละเอียด
const officeLocations = [
  { name: "สำนักงานใหญ่คลองเตย", lat: 13.7156, lng: 100.5615, desc: "สำนักงานใหญ่คลองเตย" },
  { name: "สำนักงานเพลินจิต", lat: 13.7445, lng: 100.5447, desc: "สำนักงานเพลินจิต" },
  { name: "เขตวัดเลียบ", lat: 13.7296, lng: 100.4977, desc: "เขตวัดเลียบ" },
  { name: "เขตบางใหญ่", lat: 13.8766, lng: 100.4092, desc: "เขตบางใหญ่" },
  { name: "เขตนนทบุรี", lat: 13.8591, lng: 100.5217, desc: "เขตนนทบุรี" },
  { name: "เขตบางเขน", lat: 13.8706, lng: 100.6042, desc: "เขตบางเขน" },
  { name: "เขตบางกะปิ", lat: 13.7715, lng: 100.6436, desc: "เขตบางกะปิ" },
  { name: "เขตมีนบุรี", lat: 13.8301, lng: 100.7615, desc: "เขตมีนบุรี" },
  { name: "เขตบางพลี", lat: 13.6231, lng: 100.7265, desc: "เขตบางพลี" },
  { name: "เขตสมุทรปราการ", lat: 13.5991, lng: 100.5991, desc: "เขตสมุทรปราการ" },
  { name: "เขตยานนาวา", lat: 13.6937, lng: 100.5371, desc: "เขตยานนาวา" },
  { name: "เขตราษฎร์บูรณะ", lat: 13.6782, lng: 100.5107, desc: "เขตราษฎร์บูรณะ" },
  { name: "เขตบางขุนเทียน", lat: 13.6461, lng: 100.4572, desc: "เขตบางขุนเทียน" },
  { name: "เขตธนบุรี", lat: 13.7211, lng: 100.4861, desc: "เขตธนบุรี" },
  { name: "เขตนวลจันทร์", lat: 13.8327, lng: 100.6466, desc: "เขตนวลจันทร์" },
  { name: "เขตลาดกระบัง", lat: 13.7276, lng: 100.7785, desc: "เขตลาดกระบัง" },
  { name: "เขตบางนา", lat: 13.6682, lng: 100.6046, desc: "เขตบางนา" },
  { name: "เขตบางบัวทอง", lat: 13.9211, lng: 100.4247, desc: "เขตบางบัวทอง" },
  { name: "เขตสามเสน (ชั่วคราว)", lat: 13.7817, lng: 100.5147, desc: "เขตสามเสน (ชั่วคราว)" },
];

// กำหนดไอคอน marker ให้แสดงถูกใน react-leaflet
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// component สำหรับเปลี่ยน center ของแผนที่
function ChangeMapCenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.setView([lat, lng], map.getZoom());
  return null;
}

const Office: React.FC = () => {
  const [selected, setSelected] = useState(officeLocations[0]);

  return (
    <div className="office-container">
      <div className="office-content">
        <h2>ที่ตั้งสำนักงานเขต การไฟฟ้านครหลวง</h2>
        <div style={{ marginBottom: 16 }}>
          <label>เลือกสำนักงาน/เขต: </label>
          <select
            value={selected.name}
            onChange={e => {
              const found = officeLocations.find(o => o.name === e.target.value);
              if (found) setSelected(found);
            }}
            style={{ padding: 8, borderRadius: 6, marginLeft: 8 }}
          >
            {officeLocations.map(loc => (
              <option key={loc.name} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <div className="office-flex">
          {/* รายชื่อสำนักงาน */}
          <div className="office-list">
            <ul>
              {officeLocations.map((loc) => (
                <li key={loc.name}>
                  <span className="office-pin">📍</span>
                  <span className="office-name">{loc.name}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* แผนที่โต้ตอบ */}
          <div className="office-map-placeholder" style={{ minWidth: 350, minHeight: 300 }}>
            <MapContainer
              center={[selected.lat, selected.lng]}
              zoom={15}
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
            >
              <ChangeMapCenter lat={selected.lat} lng={selected.lng} />
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {officeLocations.map((loc) => (
                <Marker key={loc.name} position={[loc.lat, loc.lng]} icon={markerIcon}>
                  <Popup>
                    <b>{loc.name}</b>
                    <br />
                    {loc.desc}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
        {/* ข้อมูลสำนักงาน */}
        <div className="office-detail">
          <div className="office-detail-title">
            สถานที่ตั้งฝน.เขต : {selected.name}
          </div>
          <div className="office-detail-desc">
            {selected.desc}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Office;