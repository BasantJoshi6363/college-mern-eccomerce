import React, { useState, useEffect, useRef } from 'react';

function Timer({ endTime }) {
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  const endTimeRef = useRef(endTime);

  useEffect(() => {
    endTimeRef.current = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // Set timer for 3 days from now

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTimeRef.current - now;

      const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(daysLeft < 10 ? '0' + daysLeft : daysLeft);
      setHours(hoursLeft < 10 ? '0' + hoursLeft : hoursLeft);
      setMinutes(minutesLeft < 10 ? '0' + minutesLeft : minutesLeft);
      setSeconds(secondsLeft < 10 ? '0' + secondsLeft : secondsLeft);

      if (distance < 0) {
        clearInterval(interval);
        setDays('00');
        setHours('00');
        setMinutes('00');
        setSeconds('00');
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []); // Empty dependency array for single execution

  return (
    <div>
      <span>{days}: </span>
      <span>{hours}: </span>
      <span>{minutes}: </span>
      <span>{seconds}</span>
    </div>
  );
}

export default Timer;
