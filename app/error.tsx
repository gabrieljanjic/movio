"use client";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="mx-auto">
      <p>Something went wrong...</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
};

export default Error;
