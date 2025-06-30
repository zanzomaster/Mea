import React, { useEffect, useState } from "react";

// ประเภทข้อมูลใบสมัคร
interface Application {
  id: number;
  user: { name: string };
  internship: { office: string; location?: string };
  status?: string;
  createdAt: string;
}

const Status: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/internship-applications")
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee", padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>สถานะการฝึกงานทั้งหมด</h2>
      {loading ? (
        <div>Loading...</div>
      ) : applications.length === 0 ? (
        <div style={{ color: "#888" }}>ยังไม่มีข้อมูลใบสมัครฝึกงาน</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f7f7f7" }}>
              <th style={{ padding: 8, textAlign: "left" }}>ชื่อผู้สมัคร</th>
              <th style={{ padding: 8, textAlign: "left" }}>สถานที่</th>
              <th style={{ padding: 8, textAlign: "left" }}>เขต</th>
              <th style={{ padding: 8, textAlign: "left" }}>วันที่สมัคร</th>
              <th style={{ padding: 8, textAlign: "left" }}>สถานะใบสมัคร</th>
              <th style={{ padding: 8, textAlign: "left" }}>สถานะฝึกงาน</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td style={{ padding: 8 }}>{app.user.name}</td>
                <td style={{ padding: 8 }}>{app.internship.office}</td>
                <td style={{ padding: 8 }}>{app.internship.location || "-"}</td>
                <td style={{ padding: 8 }}>{app.createdAt.slice(0, 10)}</td>
                <td style={{ padding: 8, fontWeight: 600, color:
                  app.status === "accept" ? "#4caf50" :
                  app.status === "reject" ? "#f44336" : "#ff9800"
                }}>
                  {app.status === "accept" && "ตอบรับแล้ว"}
                  {app.status === "reject" && "ปฏิเสธ"}
                  {app.status == null && "รอดำเนินการ"}
                </td>
                <td style={{ padding: 8, fontWeight: 600 }}>
                  {app.status === "accept" ? (
                    <>
                      กำลังฝึกงาน
                      <button
                        style={{ marginLeft: 8, padding: "2px 10px", borderRadius: 6, border: "1px solid #4caf50", background: "#e8f5e9", color: "#388e3c", cursor: "pointer" }}
                        onClick={async () => {
                          if (!window.confirm("ยืนยันว่าฝึกงานเสร็จแล้ว?")) return;
                          setLoading(true);
                          await fetch(`http://localhost:5000/internship-applications/${app.id}/status`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ status: "finished" })
                          });
                          // รีโหลดข้อมูลใหม่
                          const res = await fetch("http://localhost:5000/internship-applications");
                          const data = await res.json();
                          setApplications(data);
                          setLoading(false);
                        }}
                      >
                        ฝึกเสร็จแล้ว
                      </button>
                    </>
                  ) : app.status === "reject" ? "ไม่ได้ฝึก" : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Status;
