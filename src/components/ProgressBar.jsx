import { useState, useEffect } from "react";

export default function ProgressBar({ started }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [started]);

  return (
    <div>
      <progress value={progress} max="100" />
    </div>
  );
}
