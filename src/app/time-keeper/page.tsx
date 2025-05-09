"use client";

import { IceBreakerHead } from "../components/IceBreakerHead";
import { Timer } from "../components/Timer";
import { IceBreakerFoot } from "../components/IceBreakerFoot";
import { useState } from "react";

export default function TimeKeeper() {
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen">
      <IceBreakerHead />

      <main className="flex flex-col items-center justify-center p-8 space-y-8">
        <div className="w-full space-y-6 flex flex-col items-center">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder=""
            className="w-full max-w-2xl p-1 rounded border dark:border-gray-600 resize-y"
            style={{
              backgroundColor: "var(--textarea-bg)",
              color: "var(--textarea-text)",
            }}
          />

          {text && (
            <div className="p-6 rounded text-center">
              <p className="text-4xl sm:text-6xl md:text-7xl font-bold break-words">
                {text}
              </p>
            </div>
          )}
        </div>
        <Timer large />
      </main>
      <IceBreakerFoot />
    </div>
  );
}
