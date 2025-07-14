import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import colorWhite from "../assets/Color-white.jpg";

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
              data.internshipStart
                ? data.internshipStart.slice(0, 10)
                : ""
            );
            setInternshipEnd(
              data.internshipEnd ? data.internshipEnd.slice(0, 10) : ""
            );
          }
        });
    }
  }, [userId]);

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
          src={colorWhite}
          alt="Certificate"
          style={{
            width: 800,
            height: 400,
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
            fontSize: "2rem",
            fontWeight: "bold",
            pointerEvents: "none",
            width: "90%",
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {userId && fullName
            ? `Certificate for ${fullName}\nวันที่เริ่มฝึกงาน: ${internshipStart}\nวันที่สิ้นสุดฝึกงาน: ${internshipEnd}`
            : userId
            ? `Certificate for User ID: ${userId}`
            : "ข้อความที่ต้องการพิมพ์"}
        </div>
      </div>
      <button onClick={handleSave} style={{ marginTop: 10 }}>
        Save as Image
      </button>
    </div>
  );
};

export default Certificate;