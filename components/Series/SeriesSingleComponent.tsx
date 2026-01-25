import { formRating, getColorByPercentage } from "@/lib/utils";

import Image from "next/image";
import { getDominantColor } from "@/lib/utils";
import FavoritesWatchListComponent from "../FavoritesWatchlistComponent";
import { isTrue, SeriesDetail } from "@/types/types";

const SeriesSingleComponent = async ({
  data,
  isInFavorites,
  isInWatchlist,
}: {
  data: SeriesDetail;
  isInFavorites: isTrue;
  isInWatchlist: isTrue;
}) => {
  let backgroundStyle = {
    background:
      "linear-gradient(0deg, rgb(255,255,255) 0%, rgba(0,0,0,0.85) 70%)",
  };
  let posterUrl = "";

  if (data.poster_path) {
    posterUrl = `${process.env.TMDB_POSTER_PATH}/w300${data.poster_path}`;

    try {
      const dominantColor = await getDominantColor(posterUrl);
      backgroundStyle = {
        background: `linear-gradient(
          0deg,
          rgb(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b}) 0%,
          rgba(0,0,0,0.85) 70%
        )`,
      };
    } catch (error) {
      console.error("Failed to get dominant color:", error);
    }
  }

  return (
    <div
      className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 rounded-tl rounded-tr text-white"
      style={backgroundStyle}
    >
      <div className="relative w-40 h-60 sm:w-48 sm:h-72 mx-auto md:mx-0">
        {data.poster_path && (
          <Image
            src={posterUrl}
            alt={data.name}
            fill
            className="rounded"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjE0IiBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
          />
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
            {data.name}
          </h1>
          <FavoritesWatchListComponent
            wholeContent={data}
            isInFavorites={isInFavorites.success}
            isInWatchlist={isInWatchlist.success}
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-2 text-xs sm:text-base py-2 md:py-0">
          {data.genres?.map((genre) => (
            <span
              key={genre.id}
              className="px-2 py-1 md:px-3 md:py-1 text-xs font-medium rounded-full bg-white/80 text-black"
            >
              {genre.name}
            </span>
          ))}
        </div>
        <div className="flex gap-2 items-center mb-2">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${getColorByPercentage(
              data.vote_average * 10,
            )}`}
          >
            {data.vote_average ? (
              <>
                {formRating(data.vote_average)}
                <span className="text-[10px]">%</span>
              </>
            ) : (
              <span className="text-[10px]">?</span>
            )}
          </div>
          <p className="font-semibold">User score</p>
        </div>

        {data.tagline && (
          <p className="italic mb-3 sm:mb-4 text-sm sm:text-base">
            {data.tagline}
          </p>
        )}
        <p className="text-lg sm:text-xl font-bold mb-2">Overview</p>
        <div className="flex gap-2 mb-2 text-sm sm:text-base">
          {data.number_of_seasons && (
            <span>
              <span className="font-semibold">{data.number_of_seasons}</span>{" "}
              seasons
            </span>
          )}
          {data.number_of_seasons && <span>•</span>}
          {data.number_of_episodes && (
            <span>
              <span className="font-semibold">{data.number_of_episodes}</span>{" "}
              episodes
            </span>
          )}
        </div>

        <p className="mb-3 max-w-2xl text-sm sm:text-base">{data.overview}</p>

        {data.homepage && (
          <a
            href={data.homepage}
            target="_blank"
            className="text-blue-300 underline text-sm sm:text-base"
          >
            Official website
          </a>
        )}
      </div>
    </div>
  );
};

export default SeriesSingleComponent;
