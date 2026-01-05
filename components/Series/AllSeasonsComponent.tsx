import Image from "next/image";
import { formatYear, formRating, getColorByPercentage } from "@/lib/utils";
import Link from "next/link";
const AllSeasonsComponent = ({ data }: { data: any }) => {
  console.log("OVOOOOOOOOOOOOO", data);
  return (
    <div className="flex flex-col gap-3 p-6">
      <h1 className="text-2xl font-semibold mb-1">All seasons</h1>
      {data.seasons.reverse().map((season: any) => {
        return (
          <div className="flex w-full gap-2 rounded-md custom-box-shadow overflow-x-hidden">
            <div className="w-[120px]">
              <Image
                src={`https://image.tmdb.org/t/p/w200/${season.poster_path}`}
                width={120}
                height={170}
                alt={season.name}
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjE0IiBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
              />
            </div>
            <div className="flex flex-col w-full py-2 px-2">
              <Link
                href={`/series/episode/${data.id}/season/${season.season_number}`}
              >
                <h1 className="whitespace-nowrap text-lg font-semibold hover:underline">
                  {season.name}
                </h1>
              </Link>
              <div className="flex flex-col">
                <div className="flex gap-2 items-center mb-3">
                  <div className="rounded bg-gray-700 w-fit px-2 flex items-center">
                    <p className="text-white text-sm">
                      {formRating(season.vote_average)}
                      <span className="text-[8px]"> %</span>
                    </p>
                  </div>
                  {season.vote_average && <span>•</span>}
                  {season.air_date && <p>{formatYear(season.air_date)}</p>}
                  {season.air_date && season.episode_count && <span>•</span>}
                  <p>{season.episode_count} episodes</p>
                </div>
                <p>{season.overview}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllSeasonsComponent;
