import Image from "next/image";
import { formatYear, formRating, getDominantColor } from "@/lib/utils";
import Link from "next/link";
import { SeriesDetail } from "@/types/types";

const AllSeasonsComponent = async ({ data }: { data: SeriesDetail }) => {
  console.log("SSSS", data);
  return (
    <div className="flex flex-col gap-3 p-4 sm:p-6 bg-white border-y border-gray-200">
      {data.seasons !== undefined && (
        <>
          <h1 className="text-xl sm:text-2xl font-semibold mb-1 text-gray-900">
            All seasons
          </h1>
          {data.seasons.reverse().map((season) => {
            return (
              <div
                className="flex flex-col items-center pt-2 sm:pt-0 sm:items-start sm:flex-row w-full rounded-md border border-gray-200 bg-gray-50 overflow-hidden"
                key={data.id}
              >
                <div className="relative w-40 h-60 sm:w-32 sm:h-48 md:w-36 md:h-54 flex-shrink-0">
                  <Image
                    src={
                      season.poster_path
                        ? `${process.env.TMDB_POSTER_PATH}/w300/${season.poster_path}`
                        : "/images/no-image-placeholder.png"
                    }
                    fill
                    alt={season.name}
                    className="rounded sm:rounded-none"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjE0IiBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
                  />
                </div>
                <div className="flex flex-1 flex-col w-full py-3 px-4 sm:py-2 sm:px-3">
                  {season.season_number ? (
                    <Link
                      href={`/series/${data.id}/season/${season.season_number}`}
                    >
                      <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-all">
                        {season.name}
                      </h1>
                    </Link>
                  ) : (
                    <h1 className="text-lg font-semibold">{season.name}</h1>
                  )}
                  <div className="flex flex-col">
                    <div className="flex flex-wrap gap-1 xs:gap-2 items-center mb-3">
                      <div className="rounded bg-gray-700 w-fit px-2 flex items-center">
                        <p className="text-white text-sm">
                          {formRating(season.vote_average)}
                          <span className="text-xs"> %</span>
                        </p>
                      </div>
                      <span className="text-sm text-gray-600">•</span>
                      {season.air_date && (
                        <p className="text-sm text-gray-600">
                          {formatYear(season.air_date)}
                        </p>
                      )}
                      {season.air_date && season.episode_count && (
                        <span className="text-sm text-gray-600">•</span>
                      )}
                      <p className="text-sm text-gray-600">
                        {season.episode_count} episodes
                      </p>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-3 sm:line-clamp-4">
                      {season.overview}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default AllSeasonsComponent;
