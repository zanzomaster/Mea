import React, { useState, useEffect } from "react";
import "./imageSection.css";

const images = [
  "https://foretoday.asia/wp-content/uploads/2024/08/Design-A-Dark-BG-5-1024x536.png",
  "https://www.ict.mahidol.ac.th/thai/wp-content/uploads/2021/05/Cover-Internship-in-Thailand.png",
  "https://scbtechx.io/wp-content/uploads/2023/01/other_internship-1024x757.png",
  "https://academic.swu.ac.th/Portals/62/EasyDNNNews/6656/600600p14049EDNthumbimg-357541873_649360190561753_2521784235876263986_n.jpg",
  // เพิ่ม URL รูปอื่นๆ ได้ที่นี่
];

const ImageSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => setCurrent(idx);

  return (
    <div className="image-section-carousel">
      <img
        src={images[current]}
        alt={`img-${current}`}
        className="image-section-img"
      />
      <div className="image-section-indicators">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`indicator-dot${current === idx ? " active" : ""}`}
            onClick={() => goTo(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSection;