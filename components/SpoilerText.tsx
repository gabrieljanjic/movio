"use client";

import { useState } from "react";

type SpoilerTextProps = {
  text: string;
};

const SpoilerText = ({ text }: SpoilerTextProps) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative">
      <p
        className={`
          transition-all duration-300 text-gray-800
          ${revealed ? "blur-0 opacity-100" : "blur-sm opacity-70"}
        `}
      >
        {text}
      </p>
      {!revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="
            absolute inset-0 flex items-center pl-2
            text-xs font-medium text-white
            bg-black/40 backdrop-blur-sm
            rounded
            hover:bg-black/50
            transition
          "
        >
          Spoiler alert
        </button>
      )}
    </div>
  );
};

export default SpoilerText;
