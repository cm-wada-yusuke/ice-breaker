"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, time]);

  const setTimerValue = (seconds: number) => {
    setTime(seconds);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    if (time > 0) {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <header className="bg-[#1a1a1a] p-4">
        <h1 className="text-xl">icebreaker</h1>
      </header>

      <main className="flex flex-col items-center justify-center p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-xl mb-8">トークテーマはコチラから</h2>
          <div className="text-[200px] font-mono leading-none">{formatTime(time)}</div>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          <button
            onClick={() => setTimerValue(30)}
            className="bg-[#666666] px-6 py-2 rounded-full hover:bg-[#555555] min-w-[80px]"
          >
            00:30
          </button>
          <button
            onClick={() => setTimerValue(60)}
            className="bg-[#666666] px-6 py-2 rounded-full hover:bg-[#555555] min-w-[80px]"
          >
            01:00
          </button>
          <button
            onClick={() => setTimerValue(120)}
            className="bg-[#666666] px-6 py-2 rounded-full hover:bg-[#555555] min-w-[80px]"
          >
            02:00
          </button>
          <button
            onClick={() => setTimerValue(180)}
            className="bg-[#666666] px-6 py-2 rounded-full hover:bg-[#555555] min-w-[80px]"
          >
            03:00
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={toggleTimer}
            disabled={time === 0}
            className="bg-[#333333] px-12 py-3 rounded disabled:opacity-50 hover:bg-[#444444] min-w-[120px]"
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="bg-[#333333] px-12 py-3 rounded hover:bg-[#444444] min-w-[120px]"
          >
            Reset
          </button>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full text-center p-4 text-[#666666]">
        © cline
      </footer>
    </div>
  );
}
