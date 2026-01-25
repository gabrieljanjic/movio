import { formatYear } from "@/lib/utils";
import {
  AllCreditsExtended,
  ExtendedCastMember,
  ExtendedCrewMember,
} from "@/types/types";
import Link from "next/link";

const ExactPersonAllCreditsComponent = ({
  data,
}: {
  data: AllCreditsExtended;
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-10 mb-6 pb-6 mt-4 px-4 md:px-6">
      {data.cast.length > 0 && (
        <div className="w-full sm:w-1/2">
          <h1 className="text-xl md:text-2xl font-semibold mb-3 ml-2">Cast</h1>
          <div className="w-full rounded-lg flex flex-col gap-1">
            {data.cast.map((cast: ExtendedCastMember) => (
              <div
                key={cast.id}
                className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div className="px-3 py-2 flex gap-2">
                  <span className="text-gray-400 font-bold">•</span>
                  <div>
                    <div className="flex gap-2 items-center">
                      <Link
                        className="text-gray-900 hover:text-blue-600 transition-all"
                        href={
                          cast.name
                            ? `/series/${cast.id}`
                            : `/movies/${cast.id}`
                        }
                      >
                        <h3 className="font-normal text-sm md:font-semibold md:text-base">
                          {cast.title || cast.name}
                        </h3>
                      </Link>
                      <span className="text-gray-400">•</span>
                      {cast.first_air_date && (
                        <span className="text-sm text-gray-600">
                          {formatYear(cast.first_air_date)}
                        </span>
                      )}
                      {cast.release_date && (
                        <span className="text-xs sm:text-sm text-gray-600">
                          {formatYear(cast.release_date)}
                        </span>
                      )}
                    </div>
                    <div>
                      {cast.character && (
                        <p className="text-xs sm:text-sm text-gray-600">
                          as {cast.character}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      {cast.episode_count && (
                        <p className="text-sm text-gray-600">
                          {cast.episode_count}{" "}
                          {cast.episode_count === 1 ? "episode" : "episodes"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.crew.length > 0 && (
        <div className="w-full sm:w-1/2">
          <h1 className="text-xl md:text-2xl font-semibold mb-3 ml-2">Crew</h1>
          <div className="w-full rounded-lg flex flex-col gap-1">
            {data.crew.map((crew: ExtendedCrewMember) => (
              <div
                key={crew.id}
                className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div className="px-3 py-2 flex gap-2">
                  <span className="text-gray-400 font-bold">•</span>
                  <div>
                    <div className="flex flex-col ">
                      <div className="flex gap-2 items-center">
                        <Link
                          href={
                            crew.name
                              ? `/series/${crew.id}`
                              : `/movies/${crew.id}`
                          }
                          className=" text-gray-900 hover:text-blue-600 transition-all"
                        >
                          <h3 className="font-normal text-sm md:font-semibold md:text-base">
                            {crew.title || crew.name}
                          </h3>
                        </Link>
                        {crew.release_date && (
                          <span className="text-sm text-gray-600">•</span>
                        )}
                        {crew.release_date && (
                          <span className="text-xs sm:text-sm text-gray-600">
                            {formatYear(crew.release_date)}
                          </span>
                        )}
                      </div>
                      {crew.job && (
                        <span className="text-sm text-gray-600">
                          {crew.job}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExactPersonAllCreditsComponent;
