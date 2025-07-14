import React, { useState, useEffect } from "react";

const FileSave: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/admin-files")
      .then(res => res.json())
      .then(setUploadedFiles);
  }, []);

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
    await fetch("http://localhost:5000/admin-files", {
      method: "POST",
      body: formData,
    });
    setFiles([]);
    setUploading(false);
    // reload list
    fetch("http://localhost:5000/admin-files")
      .then(res => res.json())
      .then(setUploadedFiles);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee", padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>ไฟล์สำหรับ Admin</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading || files.length === 0} style={{ marginLeft: 12 }}>
        {uploading ? "กำลังอัปโหลด..." : "อัปโหลดไฟล์"}
      </button>
      <div style={{ marginTop: 32 }}>
        <h3>ไฟล์ที่อัปโหลดแล้ว</h3>
        <ul>
          {uploadedFiles.map((f, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
              <a href={`http://localhost:5000/${f.path.replace(/\\/g, "/")}`} target="_blank" rel="noopener noreferrer">{f.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileSave;
