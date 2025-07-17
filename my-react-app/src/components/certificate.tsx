import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import certificate from "../assets/S__47480898_0.jpg";

const Certificate = () => {
  const certRef = useRef<HTMLDivElement>(null);
  const { userId } = useParams();
  const [fullName, setFullName] = useState<string>("");
  const [internshipStart, setInternshipStart] = useState<string>("");
  const [internshipEnd, setInternshipEnd] = useState<string>("");

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/profile?userId=${userId}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) {
            setFullName(
              `${data.firstName || ""} ${data.lastName || ""}`.trim()
            );
            setInternshipStart(
              data.internshipStart ? data.internshipStart.slice(0, 10) : ""
            );
            setInternshipEnd(
              data.internshipEnd ? data.internshipEnd.slice(0, 10) : ""
            );
          }
        });
    }
  }, [userId]);

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year}`;
  };

  const handleSave = async () => {
    if (certRef.current) {
      const canvas = await html2canvas(certRef.current);
      const link = document.createElement("a");
      link.download = "certificate.jpg";
      link.href = canvas.toDataURL("image/jpeg");
      link.click();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={certRef}
        style={{
          position: "relative",
          display: "inline-block",
          margin: "auto",
        }}
      >
        <img
          src={certificate}
          alt="Certificate"
          style={{
            width: 800,
            height: 1200,
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* ชื่อ */}
        <div
          style={{
            position: "absolute",
            top: "41%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "black",
            pointerEvents: "none",
            textAlign: "center",
            width: "100%",
          }}
        >
          {fullName}
        </div>

        {/* ช่วงวันที่ */}
        <div
          style={{
            position: "absolute",
            top: "51%", // อยู่ต่ำกว่าชื่อ
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "black",
            pointerEvents: "none",
            textAlign: "center",
            width: "100%",
          }}
        >
          {internshipStart && internshipEnd
            ? `ระหว่างวันที่ ${formatDate(internshipStart)} ถึงวันที่ ${formatDate(internshipEnd)}`
            : ""}
        </div>
      </div>

      <button onClick={handleSave} style={{ marginTop: 10 }}>
        Save as Image
      </button>
    </div>
  );
};

export default Certificate;
