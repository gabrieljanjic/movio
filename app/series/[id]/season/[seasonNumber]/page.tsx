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
  console.log("ssss", data);
  return (
    <div className="p-6 bg-white custom-card-box-shadow flex flex-col gap-4 overflow-hidden">
      <h1 className="text-2xl font-semibold">{data.name}</h1>
      <hr className="border-1 my-1  border-gray-300"></hr>

      {data.episodes.reverse().map((episode: any) => {
        return (
          <div
            className="flex gap-2 custom-card-box-shadow rounded overflow-hidden"
            key={episode.id}
          >
            <div className="relative w-[267px] h-[150px] flex-shrink-0">
              <Image
                src={
                  episode.still_path
                    ? `${process.env.TMDB_POSTER_PATH}/w500${episode.still_path}`
                    : "/images/no-image-placeholder-horizontal-16-9.jpg"
                }
                alt={episode.name}
                fill
                sizes="267px"
              />
            </div>
            <div className="p-1">
              <div className="flex gap-1">
                <h3 className="text-xl">{episode.episode_number}</h3>
                <p>-</p>
                <h3 className="text-xl">{episode.name}</h3>
              </div>
              <div className="mb-2 px-2 text-white bg-slate-600 w-fit flex rounded">
                <p className="text-[12px]">
                  {formRating(episode.vote_average)}
                  <span className="text-[11px]">%</span>
                </p>
              </div>
              <div className="flex gap-2">
                {episode.air_date && <p>{formatYear(episode.air_date)}</p>}
                {episode.episode_number && <p>•</p>}
                {episode.runtime && <p>{episode.runtime} mins</p>}
              </div>
              <SpoilerText text={episode.overview} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SingleSeasonView;
