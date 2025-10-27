import { useEffect, useState } from 'react';

export default function Timer({ isRunning, onTimeUpdate }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds(sec => {
        onTimeUpdate(sec + 1);
        return sec + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, onTimeUpdate]);

  return <div>Time: {seconds}s</div>;
}

