import SpoilerText from "@/components/SpoilerText";
import getExactSeason from "@/lib/api/external/series/getExactSeason";
import { formatYear, formRating } from "@/lib/utils";
import Image from "next/image";

const SingleSeasonView = async ({
  params,
}: {
  params: { id: string; seasonNumber: string };
}) => {
  const data = await getExactSeason(params.id, params.seasonNumber);
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.name}</h1>
      <p className="mb-4 text-gray-800 text-sm sm:text-base">{data.overview}</p>
      <hr className="border-gray-300 mb-6" />
      <div className="space-y-4 ">
        {data.episodes.reverse().map((episode: any) => (
          <article
            className="flex flex-col items-center md:flex-row md:items-start gap-4 rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
            key={episode.id}
          >
            <div className="relative w-72 h-40 mt-3 xs:w-96 xs:h-56 md:w-72 md:h-40 md:mt-0 flex-shrink-0">
              <Image
                src={
                  episode.still_path
                    ? `${process.env.TMDB_POSTER_PATH}/w500${episode.still_path}`
                    : "/images/no-image-placeholder-horizontal-16-9.jpg"
                }
                alt={episode.name}
                fill
                className="rounded md:rounded-non"
              />
            </div>
            <div className="flex-1 p-2">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-lg sm:text-xl font-semibold text-gray-900">
                  {episode.episode_number}
                </span>
                <span className="text-gray-400">•</span>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {episode.name}
                </h2>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
                <div className="bg-gray-700 px-2 py-1 flex text-white items-baseline rounded">
                  <p className="text-[12px]">
                    {formRating(episode.vote_average)}
                  </p>
                  <span className="text-[8px]">%</span>
                </div>
                {episode.air_date && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {formatYear(episode.air_date)}
                    </span>
                  </>
                )}
                {episode.runtime && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {episode.runtime} mins
                    </span>
                  </>
                )}
              </div>
              {episode.overview && (
                <p className="text-gray-800 text-sm sm:text-base">
                  {episode.overview}{" "}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SingleSeasonView;
