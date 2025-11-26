import { useState, useEffect, useRef } from 'react';

export const useTypingEffect = (text: string, typingSpeed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  const animationFrameId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    setDisplayText('');
    startTime.current = null;

    const animate = (timestamp: number) => {
      if (startTime.current === null) {
        startTime.current = timestamp;
      }

      const elapsedTime = timestamp - startTime.current;
      const charsToShow = Math.min(Math.floor(elapsedTime / typingSpeed), text.length);

      const currentText = text.substring(0, charsToShow);
      setDisplayText(currentText);

      if (currentText.length < text.length) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [text, typingSpeed]);

  return displayText;
};
