import SpoilerText from "@/components/SpoilerText";
import getExactSeason from "@/lib/api/external/series/getExactSeason";
import Image from "next/image";

const SingleSeasonView = async ({
  params,
}: {
  params: { id: string; seasonNumber: string };
}) => {
  const data = await getExactSeason(params.id, params.seasonNumber);
  console.log(data);

  return (
    <div>
      {data.episodes.map((episode: any) => {
        return (
          <div>
            <p>{episode.air_date}</p>
            <p>{episode.episode_number}</p>
            <p>{episode.name}</p>
            <SpoilerText text={episode.overview} />
            <p>{episode.runtime}</p>
            <Image
              src={`${process.env.TMDB_POSTER_PATH}/w500${episode.still_path}`}
              alt={episode.name}
              width={200}
              height={150}
            />
            <p>{episode.still_path}</p>
            <p>{episode.vote_average}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SingleSeasonView;
