import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./addLocation.css";

type InternshipType = {
  id: number;
  office: string;
  desc?: string;
  location?: string;
  address?: string;
  count?: number;
};

const EditInternship: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<InternshipType | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<InternshipType, "id">>({
    office: "",
    desc: "",
    location: "",
    address: "",
    count: undefined,
  });
  const [zones, setZones] = useState<{ id: number; name: string }[]>([]);
  const [adminZoneIds, setAdminZoneIds] = useState<number[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/zones")
      .then((res) => res.json())
      .then((data) => setZones(data));
    const ids = JSON.parse(localStorage.getItem("adminZoneIds") || "[]");
    setAdminZoneIds(ids);
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/internships`)
      .then((res) => res.json())
      .then((list: InternshipType[]) => {
        const found = list.find((item) => item.id === Number(id));
        if (found) {
          setData(found);
          setForm({
            office: found.office,
            desc: found.desc || "",
            location: found.location || "",
            address: found.address || "",
            count: found.count,
          });
        }
        setLoading(false);
      });
  }, [id]);

  // Auto-select เขตเดียวถ้ามีสิทธิ์แค่ 1 เขต
  useEffect(() => {
    if (adminZoneIds.length === 1 && zones.length > 0) {
      const zone = zones.find((z) => z.id === adminZoneIds[0]);
      if (zone) setForm((f) => ({ ...f, location: zone.name }));
    }
  }, [adminZoneIds, zones]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "count" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const res = await fetch(`http://localhost:5000/internships/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("แก้ไขข้อมูลฝึกงานสำเร็จ");
      navigate(-1);
    } else {
      alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
    }
  };

  if (loading) return <div style={{ padding: 40 }}>กำลังโหลดข้อมูล...</div>;
  if (!data) return <div style={{ padding: 40 }}>ไม่พบข้อมูลฝึกงาน</div>;

  return (
    <div className="add-location-bg">
      <form className="add-location-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>แก้ไขข้อมูลฝึกงาน</h2>
        <label>สถานที่ฝึกงาน / ที่อยู่*</label>
        <input
          className="add-location-input"
          name="office"
          placeholder="สถานที่ฝึกงาน / ที่อยู่"
          value={form.office}
          onChange={handleChange}
          required
        />
        <label style={{ marginTop: 14 }}>รายละเอียด</label>
        <textarea
          className="add-location-input"
          name="desc"
          value={form.desc}
          onChange={handleChange}
        />
        <label style={{ marginTop: 14 }}>หน่วยงาน</label>
        <select
          className="add-location-input"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
          disabled={adminZoneIds.length === 1}
        >
          <option value="">-- เลือกหน่วยงาน --</option>
          {zones
            .filter((z) => adminZoneIds.includes(z.id))
            .map((zone) => (
              <option key={zone.id} value={zone.name}>
                {zone.name}
              </option>
            ))}
        </select>
        <label style={{ marginTop: 14 }}>จำนวนรับ</label>
        <input
          className="add-location-input"
          type="number"
          name="count"
          min={1}
          value={form.count ?? ""}
          onChange={handleChange}
        />
        <button
          className="add-location-btn"
          type="submit"
          style={{ marginTop: 24, width: "100%" }}
        >
          บันทึก
        </button>
      </form>
    </div>
  );
};

export default EditInternship;