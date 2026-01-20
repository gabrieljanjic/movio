import Image from "next/image";
import { formatYear, formRating, getDominantColor } from "@/lib/utils";
import Link from "next/link";
const AllSeasonsComponent = async ({ data }: { data: any }) => {
  /*Maknut pozadinu na sezonama i mal dodat text-gray-600 i povecat malo slike na sezonama */

  return (
    <div className="flex flex-col gap-3 p-6 bg-white border-y border-gray-200">
      <h1 className="text-2xl font-semibold mb-1 text-gray-900">All seasons</h1>
      {data.seasons.reverse().map((season: any) => {
        return (
          <div
            className="flex w-full rounded-md border border-gray-200 bg-gray-50 overflow-x-hidden"
            key={data.id}
          >
            <div className="w-36">
              <Image
                src={
                  season.poster_path
                    ? `${process.env.TMDB_POSTER_PATH}/w200/${season.poster_path}`
                    : "/images/no-image-placeholder.png"
                }
                width={144}
                height={216}
                alt={season.name}
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjE0IiBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
              />
            </div>
            <div className="flex flex-col w-full py-2 px-3">
              {season.season_number ? (
                <Link
                  href={`/series/${data.id}/season/${season.season_number}`}
                >
                  <h1 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-all">
                    {season.name}
                  </h1>
                </Link>
              ) : (
                <h1 className="whitespace-nowrap text-lg font-semibold">
                  {season.name}
                </h1>
              )}
              <div className="flex flex-col">
                <div className="flex gap-2 items-center mb-3">
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
                <p className=" text-gray-600">{season.overview}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllSeasonsComponent;
