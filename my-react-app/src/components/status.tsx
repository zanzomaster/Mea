import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ประเภทข้อมูลใบสมัคร
interface Application {
  id: number;
  user: { id: number; name: string; profile?: { internshipStart?: string; internshipEnd?: string } };
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
  const [certificateUserId, setCertificateUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

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
    <div style={{ maxWidth: '100%', margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee", padding: 32 }}>
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
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto", minWidth: 900 }}>
            <thead>
              <tr style={{ background: "#f7f7f7" }}>
                <th style={{ padding: 8, textAlign: "left" }}>ชื่อผู้สมัคร</th>
                <th style={{ padding: 8, textAlign: "left" }}>สถานที่</th>
                <th style={{ padding: 8, textAlign: "left" }}>เขต</th>
                <th style={{ padding: 8, textAlign: "left" }}>วันที่สมัคร</th>
                <th style={{ padding: 8, textAlign: "left" }}>สถานะใบสมัคร</th>
                <th style={{ padding: 8, textAlign: "left" }}>สถานะฝึกงาน</th>
                <th style={{ padding: 8, textAlign: "left" }}>วันที่เริ่ม</th>
                <th style={{ padding: 8, textAlign: "left" }}>วันที่จบ</th>
                <th style={{ padding: 8, textAlign: "left" }}>ใบประกาศ</th>
                <th style={{ padding: 8, textAlign: "center" }}>ไฟล์</th>
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
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
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
                        showStatus === "reject" ? "#f44336" : showStatus === "cancel" ? "#888" : "#ff9800"
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <span>
                            {(showStatus === "accept" || showStatus === "finished" || showStatus === "wait") && "ตอบรับแล้ว"}
                            {showStatus === "reject" && "ปฏิเสธ"}
                            {showStatus == null && "รอดำเนินการ"}
                            {showStatus === "cancel" && "ยกเลิก"}
                          </span>
                          {/* ปุ่มยกเลิกอยู่ข้างล่าง */}
                          {showStatus !== "cancel" && (
                            <button
                              style={{ marginTop: 8, background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95em', minWidth: 0 }}
                              onClick={async () => {
                                await fetch(`http://localhost:5000/internship-applications/${app.id}/status`, {
                                  method: "PUT",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ status: "cancel" })
                                });
                                alert("ยกเลิกใบสมัครแล้ว");
                                window.location.reload();
                              }}
                            >
                              ยกเลิก
                            </button>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: 8, fontWeight: 600 }}>
                        {showStatus === "wait" ? "รอฝึกงาน" :
                         showStatus === "accept" ? "กำลังฝึกงาน" :
                         showStatus === "finished" ? "ฝึกเสร็จแล้ว" :
                         showStatus === "reject" ? "ไม่ได้ฝึก" : "-"}
                      </td>
                      <td style={{ padding: 8 }}>{app.user.profile?.internshipStart ? app.user.profile.internshipStart.slice(0, 10) : "-"}</td>
                      <td style={{ padding: 8 }}>{app.user.profile?.internshipEnd ? app.user.profile.internshipEnd.slice(0, 10) : "-"}</td>
                      <td style={{ padding: 8 }}>
                        {showStatus === "finished" && (
                          <>
    
                            <button
                              style={{ marginLeft: 8 }}
                              onClick={async () => {
                                await fetch("http://localhost:5000/mailbox/certificate", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    userId: app.user.id,
                                    certificateUrl: `${window.location.origin}/certificate/${app.user.id}`
                                  })
                                });
                                alert("ส่งใบ certificate ไปที่ mailbox แล้ว");
                              }}
                            >
                              ส่งใบ certificate
                            </button>
                          </>
                        )}
                      </td>
                      <td style={{ padding: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                          <button
                            style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95em', minWidth: 60 }}
                            onClick={() => navigate(`/files/${app.id}`)}
                          >
                            ไฟล์
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination controls */}
      {applications.length > itemsPerPage && (
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 8 }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{ padding: '4px 12px', borderRadius: 4, border: '1px solid #ccc', background: currentPage === 1 ? '#eee' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            ก่อนหน้า
          </button>
          <span style={{ padding: '4px 12px', fontWeight: 600 }}>
          หน้า {currentPage} / {Math.ceil(applications.length / itemsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(Math.ceil(applications.length / itemsPerPage), p + 1))}
            disabled={currentPage === Math.ceil(applications.length / itemsPerPage)}
            style={{ padding: '4px 12px', borderRadius: 4, border: '1px solid #ccc', background: currentPage === Math.ceil(applications.length / itemsPerPage) ? '#eee' : '#fff', cursor: currentPage === Math.ceil(applications.length / itemsPerPage) ? 'not-allowed' : 'pointer' }}
          >
            ถัดไป
          </button>
        </div>
      )}
      {/* Modal แสดงใบประกาศ */}
      {certificateUserId && (
        <div className="modal-bg" onClick={() => setCertificateUserId(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={`http://localhost:5000/certificate/${certificateUserId}`} alt="certificate" style={{ maxWidth: 600 }} />
            <button onClick={() => setCertificateUserId(null)}>ปิด</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
