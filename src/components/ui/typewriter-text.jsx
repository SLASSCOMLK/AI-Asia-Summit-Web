import * as React from "react";
import { useEffect, useState } from "react";

/**
 * Typewriter Component
 *
 * Types out text letter-by-letter with blinking cursor.
 * Supports startDelay, loop, deleteSpeed, pause delay, and custom cursor.
 */
export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 2000,
  startDelay = 200,
  className = "",
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(startDelay <= 0);

  const textArray = React.useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text]
  );
  const currentText = textArray[textArrayIndex] || "";

  // Handle start delay
  useEffect(() => {
    if (hasStarted) return;
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [hasStarted, startDelay]);

  // Main typing effect loop
  useEffect(() => {
    if (!hasStarted || !currentText) return;

    let timer;

    if (!isDeleting) {
      if (currentIndex < currentText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentText.slice(0, currentIndex + 1));
          setCurrentIndex((prev) => prev + 1);
        }, speed);
      } else if (loop) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delay);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deleteSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentIndex(0);
          setTextArrayIndex((prev) => (prev + 1) % textArray.length);
        }, speed);
      }
    }

    return () => clearTimeout(timer);
  }, [
    hasStarted,
    currentIndex,
    isDeleting,
    currentText,
    displayText.length,
    loop,
    speed,
    deleteSpeed,
    delay,
    textArray.length,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span className="typewriter-cursor">{cursor}</span>
    </span>
  );
}

export default Typewriter;