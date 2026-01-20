"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const MovieCarouselComponent = ({
  title,
  items,
  type = "movie",
}: {
  title: string;
  items: any;
  type?: "movie" | "tv" | "mixed";
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const getColorByPercentage2 = (percent: number) => {
    if (percent >= 90) return "#00ff00";
    if (percent >= 80) return "#33ff00";
    if (percent >= 70) return "#66ff00";
    if (percent >= 60) return "#99ff00";
    if (percent >= 50) return "#ccff00";
    if (percent >= 40) return "#ffff00";
    if (percent >= 30) return "#ffcc00";
    if (percent >= 20) return "#ff9900";
    if (percent >= 10) return "#ff6600";
    return "#ff0000";
  };

  return (
    <section className="space-y-4 group/section">
      <h2 className="text-2xl font-bold text-gray-900 px-0 md:px-8">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-4 z-10 w-12 md:w-16 bg-gradient-to-r from-white via-gray-50/80 to-transparent opacity-0 group-hover/section:opacity-100 transition-opacity flex items-center justify-start hover:from-gray-100"
          aria-label="Scroll left"
        >
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-gray-900 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide px-10">
          <div className="flex gap-4 pb-4">
            {items.slice(0, 20).map((item: any) => (
              <Link
                key={item.id}
                href={`/${type === "mixed" ? (item.media_type === "movie" ? "movies" : "series") : type === "movie" ? "movies" : "series"}/${item.id}`}
                className="group cursor-pointer transform hover:scale-105 transition-transform duration-200"
              >
                <div className="rounded-lg bg-gray-100 border border-gray-300 h-full flex flex-col">
                  <div className="relative w-48 h-72 flex-shrink-0">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title || item.name || "Movie poster"}
                      width={192}
                      height={288}
                      className="object-cover rounded-t-lg"
                    />
                    <div
                      className="absolute left-2 -bottom-5 w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold text-sm border-2"
                      style={{
                        borderColor: getColorByPercentage2(
                          item.vote_average.toFixed(1) * 10,
                        ),
                      }}
                    >
                      <p className="text-[12px]">
                        {item.vote_average.toFixed(1) * 10}
                      </p>
                      <span className="text-[7px]">%</span>
                    </div>
                  </div>
                  <h3 className="text-gray-900 text-sm font-semibold line-clamp-2 mt-5 p-2 flex-grow">
                    {item.title || item.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-4 z-10 w-12 md:w-16 bg-gradient-to-l from-white via-gray-50/80 to-transparent opacity-0 group-hover/section:opacity-100 transition-opacity flex items-center justify-end hover:from-gray-100"
          aria-label="Scroll right"
        >
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-gray-900 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default MovieCarouselComponent;
