import { formatYear } from "@/lib/utils";
import Link from "next/link";

const AllCreditsActorsComponent = ({
  data,
  series,
  movie,
}: {
  data: any;
  series?: any;
  movie?: any;
}) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">{movie?.title ?? series?.name}</h1>
      {series && (
        <div className="flex gap-2">
          <p>{series?.number_of_seasons} seasons</p>
          {series?.number_of_seasons && series?.number_of_episodes && <p>•</p>}
          <p>{series?.number_of_episodes} episodes</p>
        </div>
      )}
      <hr className="border-[1px] border-gray-300 my-2"></hr>
      <div className="flex gap-10 mb-12">
        <div className="w-1/2">
          <h1 className="text-2xl font-semibold mb-3">Cast</h1>
          <div className="w-full custom-box-shadow rounded-lg">
            {data.cast.map((cast: any) => {
              return (
                <div
                  key={cast.id}
                  className="border-b-[1px] border-gray-600 last:border-b-0"
                >
                  <div className="px-2 py-1 flex gap-2">
                    <p className="font-bold">-</p>
                    <div>
                      <Link
                        className="hover:underline"
                        href={`/person/${cast.id}`}
                      >
                        <h3 className="font-semibold">
                          {cast.title || cast.name}
                        </h3>
                      </Link>
                      <div>
                        <p>{cast.character}</p>
                      </div>
                      <div className="flex gap-2">
                        {cast.release_date && (
                          <p>{formatYear(cast.release_date)}</p>
                        )}
                        {cast.first_air_date && (
                          <p>{formatYear(cast.first_air_date)}</p>
                        )}
                        {cast.episode_count && <p>•</p>}
                        {cast.episode_count && (
                          <p>
                            {cast.episode_count}{" "}
                            {cast.episode_count === 1 ? "episode" : "episodes"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" w-1/2">
          <h1 className="text-2xl font-semibold mb-3">Crew</h1>
          <div className="w-full custom-box-shadow rounded-lg">
            {data.crew.map((crew: any) => {
              return (
                <div
                  key={crew.id}
                  className="border-b-[1px] border-gray-600 last:border-b-0"
                >
                  <div className="flex gap-2 px-2 py-1">
                    <p className="font-bold">-</p>
                    <div className="">
                      <Link href={`/person/${crew.id}`}>
                        <h3 className=" font-semibold">
                          {crew.title || crew.name}
                        </h3>
                      </Link>
                      <div className="flex gap-2">
                        {crew.release_date && (
                          <p>{formatYear(crew.release_date)}</p>
                        )}
                        {crew.release_date && crew.job && <p>•</p>}
                        {crew.job && <p>{crew.job}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCreditsActorsComponent;
