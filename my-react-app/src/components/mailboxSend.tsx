import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

const MailboxSend: React.FC = () => {
  const { id } = useParams();
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [sentFiles, setSentFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // ดึง mailbox เพื่อดูไฟล์ที่เคยส่ง
    if (!id) return;
    fetch(`http://localhost:5000/mailbox?userId=0&id=${id}`) // สมมติ backend รองรับ query id
      .then((res) => res.json())
      .then((data) => {
        const mailbox = Array.isArray(data) ? data[0] : data;
        if (mailbox && mailbox.message) {
          // หาไฟล์แนบทั้งหมด (รวมทุกครั้ง)
          const match = mailbox.message.match(/\[แนบไฟล์\](.*)/s);
          if (match) {
            const files = match[1]
              .split(",")
              .map((f: string) => f.trim())
              .filter((f: string) => !!f);
            setSentFiles(files);
          }
        }
      });
  }, [id]);

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      // กันไฟล์ชื่อซ้ำ
      if (files.some((f) => f.name === newFile.name && f.size === newFile.size)) {
        setStatus("ไฟล์นี้ถูกเพิ่มแล้ว");
        e.target.value = "";
        return;
      }
      setFiles((prev) => [...prev, newFile]);
      // reset input เพื่อเลือกไฟล์ซ้ำชื่อเดิมได้
      e.target.value = "";
    }
  };

  const handleRemoveFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!files.length) {
      setStatus("กรุณาเลือกไฟล์");
      return;
    }
    const formData = new FormData();
    formData.append("mailboxId", id || "");
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await fetch("http://localhost:5000/mailbox/send-file", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setStatus("ส่งไฟล์สำเร็จ");
        setFiles([]);
      } else {
        setStatus("เกิดข้อผิดพลาดในการส่งไฟล์");
      }
    } catch (err) {
      setStatus("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        background: "#fff",
        padding: 24,
        borderRadius: 8,
      }}
    >
      <h2>ส่งไฟล์ตอบกลับจดหมาย</h2>
      {/* แสดงไฟล์ที่เคยส่ง */}
      {sentFiles.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <b>ไฟล์ที่เคยส่งไปแล้ว:</b>
          <ul style={{ paddingLeft: 20 }}>
            {sentFiles.map((file, idx) => (
              <li key={file + idx}>
                <a
                  href={`http://localhost:5000/${file.replace(/\\/g, "/")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.split(/[\\/]/).pop()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>เลือกไฟล์ (เลือกทีละไฟล์ กดเพิ่มได้หลายครั้ง)</label>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAddFile}
              style={{ display: "none" }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                background: "#ffd966",
                border: "none",
                borderRadius: 4,
                padding: "4px 12px",
                cursor: "pointer",
              }}
            >
              เพิ่มไฟล์
            </button>
          </div>
        </div>
        {files.length > 0 && (
          <ul style={{ marginTop: 12, paddingLeft: 20 }}>
            {files.map((file, idx) => (
              <li
                key={file.name + file.size + idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <span style={{ flex: 1 }}>{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(idx)}
                  style={{
                    background: "#ff7875",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "2px 10px",
                    marginLeft: 8,
                    cursor: "pointer",
                  }}
                >
                  ลบ
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          style={{
            background: "#f47c20",
            color: "#fff",
            padding: "8px 24px",
            border: "none",
            borderRadius: 4,
            marginTop: 16,
          }}
        >
          ส่งไฟล์
        </button>
      </form>
      {status && (
        <div style={{ marginTop: 16, color: "#f47c20" }}>{status}</div>
      )}
    </div>
  );
};

export default MailboxSend;