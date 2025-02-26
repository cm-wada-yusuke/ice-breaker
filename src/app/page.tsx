"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./contexts/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [isShuffling, setIsShuffling] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const shuffle = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleShuffle = () => {
    if (!inputText.trim() || isShuffling) return;

    setIsShuffling(true);
    const lines = inputText.trim().split('\n').filter(line => line.trim());
    
    // アニメーション開始
    const startTime = Date.now();
    const duration = 3000; // 3秒間
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        // アニメーション中は頻繁にシャッフル
        setResult(shuffle(lines).join(' '));
        requestAnimationFrame(animate);
      } else {
        // 最終的なシャッフル結果
        setResult(shuffle(lines).join(' '));
        setIsShuffling(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

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
    <div className="min-h-screen">
      <header className="header p-4 flex justify-between items-center">
        <h1 className="text-xl">icebreaker</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="テーマ切り替え"
        >
          {theme === "light" ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          )}
        </button>
      </header>

      <main className="flex flex-col items-center justify-center p-8 space-y-8">
        <div className="w-full max-w-2xl space-y-6">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="改行区切りで入力したテキストをシャッフルできます"
            className="w-full h-48 p-4 rounded border dark:border-gray-600 resize-y"
            style={{ backgroundColor: 'var(--textarea-bg)', color: 'var(--textarea-text)' }}
          />
          
          <div className="flex justify-center">
            <button
              onClick={handleShuffle}
              disabled={isShuffling || !inputText.trim()}
              className="btn-primary px-12 py-3 rounded disabled:opacity-50 transition-colors"
            >
              シャッフル
            </button>
          </div>

          {result && (
            <div className="p-6 rounded min-h-[60px] transition-colors">
              <p className="break-words">{result}</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="text-[200px] font-mono leading-none">{formatTime(time)}</div>
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
      </main>

      <footer className="footer fixed bottom-0 w-full text-center p-4">
        © cline
      </footer>
    </div>
  );
}
