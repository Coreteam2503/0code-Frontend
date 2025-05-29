import React, { useState, useEffect } from 'react';

const Timer = ({ duration = 60, onTimeUp, isActive, onReset }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, onReset]);

  useEffect(() => {
    let intervalId;

    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            onTimeUp();
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerClass = () => {
    if (timeLeft <= 10) return 'timer danger';
    if (timeLeft <= 30) return 'timer warning';
    return 'timer';
  };

  return (
    <div className={getTimerClass()}>
      {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
