import { useState } from "react";

export const Shuffle: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [isShuffling, setIsShuffling] = useState(false);

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
    const lines = inputText
      .trim()
      .split("\n")
      .filter((line) => line.trim());

    // アニメーション開始
    const startTime = Date.now();
    const duration = 3000; // 3秒間

    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        // アニメーション中は頻繁にシャッフル
        setResult(shuffle(lines).join(" "));
        requestAnimationFrame(animate);
      } else {
        // 最終的なシャッフル結果
        setResult(shuffle(lines).join(" "));
        setIsShuffling(false);
      }
    };

    requestAnimationFrame(animate);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-8">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="改行区切りで入力したテキストをシャッフルできます"
          className="w-full h-48 p-4 rounded border dark:border-gray-600 resize-y"
          style={{
            backgroundColor: "var(--textarea-bg)",
            color: "var(--textarea-text)",
          }}
        />

        <button
          onClick={handleShuffle}
          disabled={isShuffling || !inputText.trim()}
          className="btn-primary px-12 py-3 rounded disabled:opacity-50 transition-colors"
        >
          シャッフル
        </button>
        {result && (
          <div className="rounded min-h-[60px] transition-colors">
            <p className="text-2xl break-words">{result}</p>
          </div>
        )}
      </div>
    </>
  );
};
