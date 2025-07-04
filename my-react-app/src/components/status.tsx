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
  const [zones, setZones] = useState<string[]>([]);
  const [selectedZone, setSelectedZone] = useState<string>("");
  const [yearRange, setYearRange] = useState<{start: string, end: string}>({start: "", end: ""});
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [internshipStatusFilter, setInternshipStatusFilter] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5000/zones")
      .then(res => res.json())
      .then(data => {
        setZones(data.map((z: any) => z.name));
      });
  }, []);

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
      <div style={{ display: "flex", gap: 24, marginBottom: 16, flexWrap: "wrap" }}>
        <div>
          <label style={{ marginRight: 8 }}>เลือกเขต:</label>
          <select
            value={selectedZone}
            onChange={e => setSelectedZone(e.target.value)}
            style={{ padding: 6, borderRadius: 6, border: "1px solid #ccc", minWidth: 120 }}
          >
            <option value="">ทุกเขต</option>
            {zones.map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ marginRight: 8 }}>ปีเริ่ม:</label>
          <input type="date" value={yearRange.start} onChange={e => setYearRange(r => ({...r, start: e.target.value}))} style={{ padding: 6, borderRadius: 6, border: "1px solid #ccc" }} />
          <span style={{ margin: "0 8px" }}>ถึง</span>
          <input type="date" value={yearRange.end} onChange={e => setYearRange(r => ({...r, end: e.target.value}))} style={{ padding: 6, borderRadius: 6, border: "1px solid #ccc" }} />
        </div>
        <div>
          <label style={{ marginRight: 8 }}>สถานะใบสมัคร:</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: 6, borderRadius: 6, border: "1px solid #ccc", minWidth: 100 }}>
            <option value="">ทั้งหมด</option>
            <option value="accept">ตอบรับแล้ว</option>
            <option value="reject">ปฏิเสธ</option>
            <option value="pending">รอดำเนินการ</option>
          </select>
        </div>
        <div>
          <label style={{ marginRight: 8 }}>สถานะฝึกงาน:</label>
          <select value={internshipStatusFilter} onChange={e => setInternshipStatusFilter(e.target.value)} style={{ padding: 6, borderRadius: 6, border: "1px solid #ccc", minWidth: 100 }}>
            <option value="">ทั้งหมด</option>
            <option value="wait">รอฝึกงาน</option>
            <option value="accept">กำลังฝึกงาน</option>
            <option value="finished">ฝึกเสร็จแล้ว</option>
            <option value="reject">ไม่ได้ฝึก</option>
          </select>
        </div>
      </div>
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
            {applications
              .filter(app => !selectedZone || app.internship.location === selectedZone)
              .filter(app => {
                // filter ปี/วันที่เริ่ม-จบ
                const start = app.user.profile?.internshipStart ? new Date(app.user.profile.internshipStart) : null;
                const end = app.user.profile?.internshipEnd ? new Date(app.user.profile.internshipEnd) : null;
                let pass = true;
                if (yearRange.start) {
                  pass = pass && !!start && start >= new Date(yearRange.start);
                }
                if (yearRange.end) {
                  pass = pass && !!end && end <= new Date(yearRange.end);
                }
                return pass;
              })
              .filter(app => {
                // filter สถานะใบสมัคร
                if (!statusFilter) return true;
                if (statusFilter === "pending") return !app.status;
                if (statusFilter === "accept") return app.status === "accept" || app.status === "finished";
                return app.status === statusFilter;
              })
              .filter(app => {
                // filter สถานะฝึกงาน (logic เดียวกับ showStatus)
                let showStatus = app.status;
                const start = app.user.profile?.internshipStart;
                const end = app.user.profile?.internshipEnd;
                if (app.status === "accept" && start && end) {
                  const today = new Date();
                  const startDate = new Date(start);
                  const endDate = new Date(end);
                  if (today < startDate) {
                    showStatus = "wait";
                  } else if (today >= startDate && today <= endDate) {
                    showStatus = "accept";
                  } else if (today > endDate) {
                    showStatus = "finished";
                  }
                }
                if (!internshipStatusFilter) return true;
                if (internshipStatusFilter === "wait") return showStatus === "wait";
                return showStatus === internshipStatusFilter;
              })
              .map(app => {
                // กำหนดสถานะฝึกงานแบบอัตโนมัติ
                let showStatus = app.status;
                const start = app.user.profile?.internshipStart;
                const end = app.user.profile?.internshipEnd;
                if (app.status === "accept" && start && end) {
                  const today = new Date();
                  const startDate = new Date(start);
                  const endDate = new Date(end);
                  if (today < startDate) {
                    showStatus = "wait";
                  } else if (today >= startDate && today <= endDate) {
                    showStatus = "accept";
                  } else if (today > endDate) {
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
                      showStatus === "accept" || showStatus === "finished" || showStatus === "wait" ? "#4caf50" :
                      showStatus === "reject" ? "#f44336" : "#ff9800"
                    }}>
                      {(showStatus === "accept" || showStatus === "finished" || showStatus === "wait") && "ตอบรับแล้ว"}
                      {showStatus === "reject" && "ปฏิเสธ"}
                      {showStatus == null && "รอดำเนินการ"}
                    </td>
                    <td style={{ padding: 8, fontWeight: 600 }}>
                      {showStatus === "wait" ? "รอฝึกงาน" :
                       showStatus === "accept" ? "กำลังฝึกงาน" :
                       showStatus === "finished" ? "ฝึกเสร็จแล้ว" :
                       showStatus === "reject" ? "ไม่ได้ฝึก" : "-"}
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
