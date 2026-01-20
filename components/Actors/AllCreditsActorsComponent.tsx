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
    <div className="mt-4">
      <h1 className="text-3xl font-semibold ml-2">
        {movie?.title ?? series?.name}
      </h1>
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
          <h1 className="text-2xl font-semibold mb-3 ml-2">Cast</h1>
          <div className="w-full rounded-lg flex flex-col gap-1">
            {data.cast.map((cast: any) => {
              return (
                <div
                  key={cast.id}
                  className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <div className="px-3 py-2 flex gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    <div>
                      <Link
                        className="text-gray-900 hover:text-blue-600 transition-all"
                        href={`/person/${cast.id}`}
                      >
                        <h3 className="font-semibold">
                          {cast.title || cast.name}
                        </h3>
                      </Link>
                      <div>
                        <p className="text-sm text-gray-600">
                          {cast.character}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-1/2">
          <h1 className="text-2xl font-semibold mb-3 ml-2">Crew</h1>
          <div className="w-full rounded-lg flex flex-col gap-1">
            {data.crew.map((crew: any) => {
              return (
                <div
                  key={crew.id}
                  className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <div className="px-3 py-2 flex gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    <div>
                      <Link
                        href={`/person/${crew.id}`}
                        className=" text-gray-900 hover:text-blue-600 transition-all"
                      >
                        <h3 className="font-semibold">
                          {crew.title || crew.name}
                        </h3>
                      </Link>
                      <div className="flex gap-2">
                        {crew.release_date && (
                          <p className="text-sm text-gray-600">
                            {formatYear(crew.release_date)}
                          </p>
                        )}
                        {crew.release_date && crew.job && (
                          <p className="text-sm text-gray-600">•</p>
                        )}
                        {crew.job && (
                          <p className="text-sm text-gray-600">{crew.job}</p>
                        )}
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
