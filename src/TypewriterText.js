import React, { useState, useEffect, useRef } from "react";

function TypewriterText({ text, speed = 30, onComplete }) {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);
  const intervalRef = useRef(null);
  const onCompleteRef = useRef(onComplete); // store the latest callback

  // keep ref updated without triggering effect
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setDisplayedText("");
    indexRef.current = 0;

    intervalRef.current = setInterval(() => {
      setDisplayedText((prev) => {
        if (indexRef.current <= text.length) {
          const nextText = text.slice(0, indexRef.current + 1);
          indexRef.current += 1;
          return nextText;
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          if (onCompleteRef.current) onCompleteRef.current(); // call latest callback
          return prev;
        }
      });
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, speed]); // no onComplete here

  return <p className="scene-text">{displayedText}</p>;
}

export default TypewriterText;
