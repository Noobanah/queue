import { useState, useEffect } from "react";

function useHook() {
  const [target, setTarget] = useState(null);
  const [queue, setQueue] = useState([]);
  const [started, setStarted] = useState(false);
  const [reached, setReached] = useState(false);
  const [username, setUsername] = useState(null);
  const [landingPage, setLandingPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_URL = "https://unexpected-eastern-margin.glitch.me";

  const fetchTarget = async () => {
    setLoading(true);
    setStarted(true);
    try {
      const res = await fetch(`${API_URL}/api/queue/generate`);
      const data = await res.json();
      setTarget(data.target);
      setQueue(data.queue);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const leaveQueue = async () => {
    console.log("Leave queue clicked!");
    await fetch(`${API_URL}/api/queue/left`, {
      method: "POST",
    });
    setStarted(false);
    setUsername(null);
    setTarget(null);
  };

  const notifyReached = async () => {
    try {
      await fetch(`${API_URL}/api/queue/reached`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error notifying reached:", error);
    }
  };

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(async () => {
        try {
          const resQueue = await fetch(`${API_URL}/api/queue/status`);
          const dataQueue = await resQueue.json();
          console.log("Status:", dataQueue);
          setQueue(dataQueue.queue);
          setReached(dataQueue.reached);

          if (dataQueue.reached) {
            await notifyReached();
            clearInterval(interval);
            setStarted(false);
          }
        } catch (error) {
          console.error("Error fetching queue:", error);
        }
      }, 12000);
    }

    return () => clearInterval(interval);
  }, [started]);

  const handleFinish = () => {
    setReached(false);
    setLandingPage(true);
  };

  const handleHome = () => {
    setTarget(null);
    setUsername(null);
    setLandingPage(false);
  };

  return {
    fetchTarget,
    leaveQueue,
    queue,
    target,
    started,
    reached,
    username,
    setUsername,
    handleFinish,
    handleHome,
    setLandingPage,
    landingPage,
    loading,
    notifyReached,
  };
}

export default useHook;
