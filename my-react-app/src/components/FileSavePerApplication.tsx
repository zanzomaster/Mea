import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FileSavePerApplication: React.FC = () => {
  const { applicationId } = useParams();
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, [applicationId]);

  const fetchFiles = () => {
    fetch(`http://localhost:5000/application-files/${applicationId}`)
      .then(res => res.json())
      .then(setUploadedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    const formData = new FormData();
    files.forEach(f => formData.append("files", f));
    await fetch(`http://localhost:5000/application-files/${applicationId}`, {
      method: "POST",
      body: formData,
    });
    setFiles([]);
    setUploading(false);
    fetchFiles();
  };

  const handleDelete = async (fileName: string) => {
    const confirmDelete = window.confirm(`ต้องการลบไฟล์ "${fileName}" หรือไม่?`);
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/application-files/${applicationId}/${encodeURIComponent(fileName)}`, {
      method: "DELETE",
    });

    fetchFiles();
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee", padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>ไฟล์ของใบสมัคร #{applicationId}</h2>
      
      <input type="file" multiple onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        style={{ marginLeft: 12 }}
      >
        {uploading ? "กำลังอัปโหลด..." : "อัปโหลดไฟล์"}
      </button>

      <div style={{ marginTop: 32 }}>
        <h3>ไฟล์ที่อัปโหลดแล้ว</h3>
        {uploadedFiles.length === 0 ? (
          <p>ยังไม่มีไฟล์</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {uploadedFiles.map((f, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                  paddingBottom: 8,
                }}
              >
                <a
                  href={`http://localhost:5000/${f.path.replace(/\\/g, "/")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  {f.name}
                </a>
                <button
                  onClick={() => handleDelete(f.name)}
                  style={{
                    marginLeft: 12,
                    background: "transparent",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  ❌ ลบ
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileSavePerApplication;
