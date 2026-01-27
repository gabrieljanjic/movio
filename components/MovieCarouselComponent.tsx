"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

type MovieCarouselProps = {
  id: string;
  media_type: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
};

const MovieCarouselComponent = ({
  title,
  items,
  type = "movie",
}: {
  title: string;
  items: MovieCarouselProps[];
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
    <section className="space-y-2 md:space-y-4 group/section">
      <h2 className="text-lg sm:text-xl  md:text-2xl font-bold text-gray-900 px-0 md:px-8">
        {title}
      </h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-4 z-10 w-12 md:w-16 bg-gradient-to-r from-white via-gray-50/80 to-transparent opacity-0 group-hover/section:opacity-100 transition-opacity flex items-center justify-start hover:from-gray-100"
          aria-label="Scroll left"
        >
          <FaArrowLeftLong className="text-lg sm:text-xl md:text-2xl text-gray-800" />
        </button>
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide px-1 sm:px-6 md:px-10"
        >
          <div className="flex gap-2 md:gap-4 pb-2 md:pb-4">
            {items.slice(0, 20).map((item) => (
              <Link
                key={item.id}
                href={`/${type === "mixed" ? (item.media_type === "movie" ? "movies" : "series") : type === "movie" ? "movies" : "series"}/${item.id}`}
                className="group cursor-pointer transform hover:scale-102 sm:hover:scale-105 transition-transform duration-200"
              >
                <div className="rounded-lg bg-gray-100 border border-gray-300 h-full flex flex-col">
                  <div className="relative w-24 h-36 sm:w-32 sm:h-48 md:w-48 md:h-72 flex-shrink-0">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title || item.name || "Movie poster"}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div
                      className="absolute left-2 -bottom-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold text-xs md:text-sm border-2"
                      style={{
                        borderColor: getColorByPercentage2(
                          Number(item.vote_average.toFixed(1)) * 10,
                        ),
                      }}
                    >
                      <p className="text-[12px]">
                        {Number(item.vote_average.toFixed(1)) * 10}
                      </p>
                      <span className="text-[7px]">%</span>
                    </div>
                  </div>
                  <h3 className="text-gray-900 text-xs md:text-sm font-semibold mt-3 sm:mt-4 md:mt-5 p-2">
                    {item.title || item.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 p-2 bottom-4 z-10 w-12 md:w-16 bg-gradient-to-l from-white via-gray-50/80 to-transparent opacity-0 group-hover/section:opacity-100 transition-opacity flex items-center justify-end hover:from-gray-100"
          aria-label="Scroll right"
        >
          <FaArrowRightLong className="text-lg sm:text-xl md:text-2xl text-gray-800" />
        </button>
      </div>
    </section>
  );
};

export default MovieCarouselComponent;
