import { formatDate, formatTime, getDominantColor } from "@/lib/utils";
import Image from "next/image";
import FavoritesWatchListComponent from "../FavoritesWatchlistComponent";

const MoviesSingleComponent = async ({
  data,
  isInFavorites,
  isInWatchlist,
}: {
  data: any;
  isInFavorites: any;
  isInWatchlist: any;
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
      className="flex gap-8 p-8 rounded-tl rounded-tr text-white"
      style={backgroundStyle}
    >
      <div className="w-[266px] shrink-0">
        {data.poster_path && (
          <Image
            src={posterUrl}
            alt={data.title}
            width={266}
            height={400}
            className="rounded-xl"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjE0IiBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
          />
        )}
      </div>
      <div>
        <div>
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold mb-3">
              {data.title || data.original_name}
            </h1>
            <FavoritesWatchListComponent
              wholeContent={data}
              isInFavorites={isInFavorites.success}
              isInWatchlist={isInWatchlist.success}
            />
          </div>
          <div className="flex gap-2 mb-2">
            {data.release_date && <span>{formatDate(data.release_date)}</span>}
            {data.release_date && <span>•</span>}
            {data.runtime && <span>{formatTime(data.runtime)}</span>}
          </div>
          <div className="flex mb-5">
            {data.genres.length > 0 && (
              <div className="flex gap-2">
                {data.genres.map((genre: any) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-800"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          {data.tagline && <p className="italic mb-4">{data.tagline}</p>}
          <p className="text-xl font-bold">Overview</p>
          <p className="mb-3">{data.overview}</p>
          {data.homepage && (
            <a href={data.homepage} target="_blank" className="text-blue-700">
              Official website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesSingleComponent;
