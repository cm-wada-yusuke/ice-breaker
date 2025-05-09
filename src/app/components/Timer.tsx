"use client";

import React, { useState, useEffect } from "react";

export const Timer: React.FC<{ large: boolean }> = ({ large = false }) => {
  // タイマー関連の状態を移動
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false); // カウントダウン終了状態

  // タイマー関連の関数を移動
  const setTimerValue = (seconds: number) => {
    setTime(seconds);
    setIsRunning(false);
    setHasFinished(false); // リセット
  };

  const toggleTimer = () => {
    if (time > 0) {
      setIsRunning(!isRunning);
      // タイマー開始時は終了状態ではないが、既に0秒でhasFinishedがtrueの場合はリセットしない
      // （0秒からStartを押すことはUI上できないため、基本的には不要な考慮）
    }
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setHasFinished(false); // リセット
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // タイマーのカウントダウン処理のuseEffectを移動
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && time > 0) {
      setHasFinished(false); // カウントダウン開始時にリセット
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            setHasFinished(true); // カウントダウン終了
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

  return (
    <>
      <div className="text-center">
        <div
          className={`font-mono leading-none w-full ${
            large ? "text-[400px]" : "text-[200px]"
          } ${
            time === 0 && hasFinished ? "text-pink-500" : ""
          }`}
        >
          {formatTime(time)}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        <button
          onClick={() => setTimerValue(30)}
          className="btn-secondary px-6 py-2 rounded-full min-w-[80px] transition-colors"
        >
          00:30
        </button>
        <button
          onClick={() => setTimerValue(60)}
          className="btn-secondary px-6 py-2 rounded-full min-w-[80px] transition-colors"
        >
          01:00
        </button>
        <button
          onClick={() => setTimerValue(120)}
          className="btn-secondary px-6 py-2 rounded-full min-w-[80px] transition-colors"
        >
          02:00
        </button>
        <button
          onClick={() => setTimerValue(180)}
          className="btn-secondary px-6 py-2 rounded-full min-w-[80px] transition-colors"
        >
          03:00
        </button>
        <button
          onClick={() => setTimerValue(300)}
          className="btn-secondary px-6 py-2 rounded-full min-w-[80px] transition-colors"
        >
          05:00
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          disabled={time === 0}
          className="btn-primary px-12 py-3 rounded disabled:opacity-50 min-w-[120px] transition-colors"
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="btn-primary px-12 py-3 rounded min-w-[120px] transition-colors"
        >
          Reset
        </button>
      </div>
    </>
  );
};
