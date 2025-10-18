import React, { useState, useEffect } from "react";
import "./App.css";

function Stars({ count = 100 }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const newStars = [];

    for (let i = 0; i < count; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const brightness = Math.random() * 0.5 + 0.5;
      newStars.push({ x, y, size, brightness });
    }

    setStars(newStars);
  }, [count]);

  return (
    <div className="stars">
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.brightness,
          }}
        ></div>
      ))}
    </div>
  );
}

export default Stars;
