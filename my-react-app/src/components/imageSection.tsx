import React, { useState } from "react";
import "./imageSection.css";

const images = [
  "https://foretoday.asia/wp-content/uploads/2024/08/Design-A-Dark-BG-5-1024x536.png",
  "https://ap-southeast-2-seek-apac.graphassets.com/AEzBCRO50TYyqbV6XzRDQz/9xFH8cAERaaTTHDVwS5Y",
  // เพิ่ม URL รูปอื่นๆ ได้ที่นี่
];

const ImageSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

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