import { AllCredits, MovieDetail, SeriesDetail } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const AllCreditsActorsComponent = ({
  data,
  series,
  movie,
}: {
  data: AllCredits;
  series?: SeriesDetail;
  movie?: MovieDetail;
}) => {
  return (
    <div className="mt-4 mx-2">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-900">
        {movie?.title ?? series?.name}
      </h1>
      <p className="text-sm sm:text-base text-gray-800">
        {movie?.overview || "-"}
      </p>
      {series && (
        <div className="flex gap-2">
          <p>{series?.number_of_seasons} seasons</p>
          {series?.number_of_seasons && series?.number_of_episodes && <p>•</p>}
          <p>{series?.number_of_episodes} episodes</p>
        </div>
      )}
      <hr className="border-[1px] border-gray-300 my-2"></hr>
      <div className="flex flex-col sm:flex-row gap-10 mb-12">
        <div className="w-full sm:w-1/2">
          <h1 className="text-xl sm:text-2xl font-semibold mb-3 ml-2">Cast</h1>
          <div className="w-full rounded-lg flex flex-col gap-1">
            {data.cast.map((cast) => {
              return (
                <div
                  key={cast.id}
                  className="overflow-hidden bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative w-14 h-20 sm:w-16 sm:h-24">
                      <Image
                        fill
                        src={
                          cast.profile_path
                            ? `${process.env.TMDB_POSTER_PATH}/w200${cast.profile_path}`
                            : "/images/portrait-placeholder.jpg"
                        }
                        alt={cast.name}
                      />
                    </div>
                    <div className="px-2">
                      <Link
                        className="text-gray-900 hover:text-blue-600 transition-all"
                        href={`/person/${cast.id}`}
                      >
                        <h3 className="text-sm md:text-base font-semibold">
                          {cast.name}
                        </h3>
                      </Link>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">
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
        <div className="w-full sm:w-1/2">
          <h1 className="text-xl sm:text-2xl font-semibold mb-3 ml-2">Crew</h1>
          <div className="w-full rounded-lg flex flex-col gap-1">
            {data.crew.map((crew) => {
              return (
                <div
                  key={crew.id}
                  className="overflow-hidden bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative w-14 h-20 sm:w-16 sm:h-24">
                      <Image
                        fill
                        src={
                          crew.profile_path
                            ? `${process.env.TMDB_POSTER_PATH}/w200${crew.profile_path}`
                            : "/images/portrait-placeholder.jpg"
                        }
                        alt={crew.name}
                      />
                    </div>

                    <div className="px-2">
                      <Link
                        href={`/person/${crew.id}`}
                        className=" text-gray-900 hover:text-blue-600 transition-all"
                      >
                        <h3 className="text-sm md:text-base font-semibold">
                          {crew.name}
                        </h3>
                      </Link>
                      <div className="flex gap-2 text-xs sm:text-sm text-gray-600">
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
