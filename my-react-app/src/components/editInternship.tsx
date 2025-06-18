import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/internships`)
      .then(res => res.json())
      .then((list: InternshipType[]) => {
        const found = list.find(item => item.id === Number(id));
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({
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
      navigate(-1); // กลับหน้าก่อนหน้า
    } else {
      alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
    }
  };

  if (loading) return <div style={{ padding: 40 }}>กำลังโหลดข้อมูล...</div>;
  if (!data) return <div style={{ padding: 40 }}>ไม่พบข้อมูลฝึกงาน</div>;

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", background: "#fff", padding: 24, borderRadius: 8 }}>
      <h2>แก้ไขข้อมูลฝึกงาน</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>ชื่อสถานที่ฝึกงาน</label>
          <input
            type="text"
            name="office"
            value={form.office}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>รายละเอียด</label>
          <textarea
            name="desc"
            value={form.desc}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>เขต/Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>ที่อยู่</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>จำนวนรับ</label>
          <input
            type="number"
            name="count"
            value={form.count ?? ""}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <button type="submit" style={{ background: "#f47c20", color: "#fff", padding: "8px 24px", border: "none", borderRadius: 4 }}>
          บันทึก
        </button>
      </form>
    </div>
  );
};

export default EditInternship;