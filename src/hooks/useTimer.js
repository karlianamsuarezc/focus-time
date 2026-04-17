import { useState, useEffect, useRef } from 'react';
import { Vibration } from 'react-native';

export const useTimer = (initialMinutes = 25) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (mins) => {
    setIsActive(false);
    setSeconds(mins * 60);
  };

  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      Vibration.vibrate();
      setIsActive(false);
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, seconds]);

  return { seconds, isActive, toggleTimer, resetTimer };
};