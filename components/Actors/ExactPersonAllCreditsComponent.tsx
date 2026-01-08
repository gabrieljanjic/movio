import { formatYear } from "@/lib/utils";
import Image from "next/image";

const ExactPersonAllCreditsComponent = ({ data }: { data: any }) => {
  return (
    <div>
      <div>
        <h1>CAST</h1>
        {data.cast.map((cast: any) => {
          return (
            <div>
              <Image
                src={
                  cast.poster_path
                    ? `${process.env.TMDB_POSTER_PATH}/w300/${cast.poster_path}`
                    : "/images/portrait-placeholder.jpg"
                }
                width={200}
                height={300}
                alt={cast.title}
              />
              <div>
                {cast.episode_count && (
                  <p>
                    {cast.episode_count}{" "}
                    {cast.episode_count === 1 ? "episode" : "episodes"}
                  </p>
                )}
                {cast.release_date && <p>{formatYear(cast.release_date)}</p>}
                {cast.first_air_date && (
                  <p>{formatYear(cast.first_air_date)}</p>
                )}
              </div>
              <p>{cast.character}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExactPersonAllCreditsComponent;
