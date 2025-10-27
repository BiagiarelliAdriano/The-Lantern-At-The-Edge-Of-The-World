import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

function Stars({ count = 100, triggerAnimation = false, onReset }) {
  const [stars, setStars] = useState([]);
  const animationRef = useRef(null);
  const bottomSpawnRef = useRef(null);

  // Generate initial static stars
  const generateStaticStars = useCallback(() => {
    const newStars = [];
    for (let i = 0; i < count; i++) {
      newStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        brightness: Math.random() * 0.5 + 0.5,
        speedX: Math.random() * 0.02 + 0.01, // small drifting speed
        speedY: Math.random() * 0.01 + 0.005,
      });
    }
    setStars(newStars);
  }, [count]);

  // Reset function exposed to parent
  const handleReset = useCallback(() => {
    cancelAnimationFrame(animationRef.current);
    clearInterval(bottomSpawnRef.current);
    generateStaticStars();
  }, [generateStaticStars]);

  useEffect(() => {
    if (onReset) onReset(handleReset);
  }, [onReset, handleReset]);

  // Initial stars
  useEffect(() => {
    generateStaticStars();
  }, [generateStaticStars]);

  // Animate stars and spawn new ones from the bottom when triggerAnimation is true
  useEffect(() => {
    if (!triggerAnimation) return;

    // Animate pre-existing stars
    const animate = () => {
      setStars((prevStars) =>
        prevStars.map((s) => {
          let newX = s.x - s.speedX;
          let newY = s.y - s.speedY;
          if (newX < -5) newX = 105;
          if (newY < -5) newY = 105;
          return { ...s, x: newX, y: newY };
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    // Periodically spawn new stars from bottom
    bottomSpawnRef.current = setInterval(() => {
      setStars((prevStars) => [
        ...prevStars,
        {
          x: Math.random() * 100,
          y: 100, // start at bottom
          size: Math.random() * 2 + 1,
          brightness: Math.random() * 0.5 + 0.5,
          speedX: Math.random() * 0.03 + 0.01,
          speedY: -(Math.random() * 0.05 + 0.02), // arc upwards
        },
      ]);
    }, 200); // spawn a new star every 0.2s

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearInterval(bottomSpawnRef.current);
    };
  }, [triggerAnimation]);

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
            position: "absolute",
            borderRadius: "50%",
          }}
        ></div>
      ))}
    </div>
  );
}

export default Stars;
