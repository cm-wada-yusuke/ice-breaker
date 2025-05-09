"use client";

import { useTheme } from "../contexts/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function IceBreakerHead() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="header p-4 flex justify-between items-center">
      <div className="flex items-center">
        <nav className="flex">
          <Link 
            href="/" 
            className={`px-3 py-2 mr-2 font-medium transition-colors ${
              pathname === "/" 
                ? "border-b-2 border-black dark:border-white"
                : "hover:text-gray-600 dark:hover:text-gray-400"
            }`}
          >
            アイスブレイカー
          </Link>
          <Link 
            href="/time-keeper" 
            className={`px-3 py-2 font-medium transition-colors ${
              pathname === "/time-keeper" 
                ? "border-b-2 border-black dark:border-white" 
                : "hover:text-gray-600 dark:hover:text-gray-400"
            }`}
          >
            タイムキーパー
          </Link>
        </nav>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        aria-label="テーマ切り替え"
      >
        {theme === "light" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        )}
      </button>
    </header>
  );
}
