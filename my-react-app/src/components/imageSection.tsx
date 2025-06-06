import React from "react";
import "./imageSection.css";

const images = [
  "https://ap-southeast-2-seek-apac.graphassets.com/AEzBCRO50TYyqbV6XzRDQz/9xFH8cAERaaTTHDVwS5Y",
  // เพิ่ม URL รูปอื่นๆ ได้ที่นี่
];

const ImageSection: React.FC = () => {
  return (
    <div className="image-section-scroll">
      {images.map((src, idx) => (
        <img key={idx} src={src} alt={`img-${idx}`} className="image-section-img" />
      ))}
    </div>
  );
};

export default ImageSection;