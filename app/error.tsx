"use client";

const Error = ({ reset }: { reset: () => void }) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4 py-16 bg-gray-50">
      <div className="text-center max-w-md space-y-5">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 bg-red-100 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute inset-4 bg-red-200 rounded-full opacity-75"></div>
          <div className="absolute inset-8 bg-red-500 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-xl md:text-3xl font-bold text-gray-900">
          Oops! Something went wrong
        </h2>
        <div className="space-y-3 pt-2">
          <button
            onClick={reset}
            className="block w-full sm:w-auto sm:inline-block px-3 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-200"
          >
            Try Again
          </button>
          <p className="text-sm text-gray-500">
            or{" "}
            <a href="/" className="text-red-600 hover:underline font-medium">
              return to homepage
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
