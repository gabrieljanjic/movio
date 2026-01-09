"use client";

import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
        <MoonLoader color="#1E3A8A" size={45} />
      </div>
    </div>
  );
};

export default Loading;
