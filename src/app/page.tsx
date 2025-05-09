"use client";

import { IceBreakerHead } from "./components/IceBreakerHead";
import { Shuffle } from "./components/Shuffle";
import { Timer } from "./components/Timer";
import { IceBreakerFoot } from "./components/IceBreakerFoot";
export default function Home() {
  return (
    <div className="min-h-screen">
      <IceBreakerHead />

      <main className="flex flex-col items-center justify-center p-8 space-y-8">
        <div className="w-full max-w-2xl">
          <Shuffle />
        </div>
        <Timer large={false} />
      </main>
      <IceBreakerFoot />
    </div>
  );
}
