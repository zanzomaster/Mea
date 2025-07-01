import React, { useEffect, useState } from "react";

// ประเภทข้อมูลใบสมัคร
interface Application {
  id: number;
  user: { name: string; profile?: { internshipStart?: string; internshipEnd?: string } };
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
    <div style={{ maxWidth: 1300, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee", padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>สถานะการฝึกงานทั้งหมด</h2>
      {loading ? (
        <div>Loading...</div>
      ) : applications.length === 0 ? (
        <div style={{ color: "#888" }}>ยังไม่มีข้อมูลใบสมัครฝึกงาน</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <thead>
            <tr style={{ background: "#f7f7f7" }}>
              <th style={{ padding: 8, textAlign: "left", width: 120 }}>ชื่อผู้สมัคร</th>
              <th style={{ padding: 8, textAlign: "left", width: 140 }}>สถานที่</th>
              <th style={{ padding: 8, textAlign: "left", width: 160 }}>เขต</th>
              <th style={{ padding: 8, textAlign: "left", width: 120 }}>วันที่สมัคร</th>
              <th style={{ padding: 8, textAlign: "left", width: 140 }}>สถานะใบสมัคร</th>
              <th style={{ padding: 8, textAlign: "left", width: 160 }}>สถานะฝึกงาน</th>
              <th style={{ padding: 8, textAlign: "left", width: 120 }}>วันที่เริ่ม</th>
              <th style={{ padding: 8, textAlign: "left", width: 120 }}>วันที่จบ</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => {
              // เช็คถ้าวันนี้เกิน internshipEnd แล้วและ status ยังเป็น accept ให้แสดงฝึกเสร็จแล้ว
              let showStatus = app.status;
              const end = app.user.profile?.internshipEnd;
              if (app.status === "accept" && end) {
                const today = new Date();
                const endDate = new Date(end);
                if (today > endDate) {
                  showStatus = "finished";
                }
              }
              return (
                <tr key={app.id}>
                  <td style={{ padding: 8 }}>{app.user.name}</td>
                  <td style={{ padding: 8 }}>{app.internship.office}</td>
                  <td style={{ padding: 8 }}>{app.internship.location || "-"}</td>
                  <td style={{ padding: 8 }}>{app.createdAt.slice(0, 10)}</td>
                  <td style={{ padding: 8, fontWeight: 600, color:
                    showStatus === "accept" || showStatus === "finished" ? "#4caf50" :
                    showStatus === "reject" ? "#f44336" : "#ff9800"
                  }}>
                    {(showStatus === "accept" || showStatus === "finished") && "ตอบรับแล้ว"}
                    {showStatus === "reject" && "ปฏิเสธ"}
                    {showStatus == null && "รอดำเนินการ"}
                  </td>
                  <td style={{ padding: 8, fontWeight: 600 }}>
                    {showStatus === "accept" ? (
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
                    ) : showStatus === "reject" ? "ไม่ได้ฝึก" : showStatus === "finished" ? "ฝึกเสร็จแล้ว" : "-"}
                  </td>
                  <td style={{ padding: 8 }}>{app.user.profile?.internshipStart ? app.user.profile.internshipStart.slice(0, 10) : "-"}</td>
                  <td style={{ padding: 8 }}>{app.user.profile?.internshipEnd ? app.user.profile.internshipEnd.slice(0, 10) : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Status;
