import { formatDate, formatTime, getDominantColor } from "@/lib/utils";
import Image from "next/image";
import FavoritesWatchListComponent from "../FavoritesWatchlistComponent";
import { isTrue, MovieDetail } from "@/types/types";

const MoviesSingleComponent = async ({
  data,
  isInFavorites,
  isInWatchlist,
}: {
  data: MovieDetail;
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
    <article
      className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 rounded-tl rounded-tr text-white"
      style={backgroundStyle}
    >
      <div className="relative w-40 h-60 sm:w-48 sm:h-72 mx-auto md:mx-0">
        {data.poster_path && (
          <Image
            src={posterUrl}
            alt={data.title}
            fill
            className="rounded"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjE0IiBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
          />
        )}
      </div>
      <div className="flex-1">
        <div>
          <div className="flex flex-row justify-between gap-3 sm:gap-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
              {data.title || data.title}
            </h1>
            <div>
              <FavoritesWatchListComponent
                wholeContent={data}
                isInFavorites={isInFavorites.success}
                isInWatchlist={isInWatchlist.success}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-2 text-xs sm:text-base">
            {data.release_date && <span>{formatDate(data.release_date)}</span>}
            {data.release_date && <span>•</span>}
            {data.runtime && <span>{formatTime(data.runtime)}</span>}
          </div>
          <div className="flex mb-4 sm:mb-5">
            {data.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-2 sm:px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-800"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          {data.tagline && (
            <p className="italic mb-3 sm:mb-4 text-sm sm:text-base">
              {data.tagline}
            </p>
          )}
          <p className="text-lg sm:text-xl font-bold mb-2">Overview</p>
          <p className="mb-3 text-sm sm:text-base leading-relaxed">
            {data.overview}
          </p>
          {data.homepage && (
            <a
              href={data.homepage}
              target="_blank"
              className="text-blue-400 hover:text-blue-300 underline text-sm sm:text-base"
            >
              Official website
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default MoviesSingleComponent;
