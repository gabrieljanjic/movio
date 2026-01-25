import Link from "next/link";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";
import { CastMember } from "@/types/types";

const CreditsActors = ({
  dataCredits,
  id,
  type,
}: {
  dataCredits: { cast: CastMember[] };
  id: string;
  type: string;
}) => {
  return (
    <div className="flex flex-col p-4 sm:p-6 bg-white">
      <h1 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
        Top Billed Cast
      </h1>
      <div className="flex gap-3 overflow-x-auto py-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {dataCredits.cast.slice(0, 10).map((actor: CastMember) => (
          <div
            key={actor.id}
            className="flex flex-col flex-shrink-0 w-[110px] sm:w-[120px] custom-box-shadow-sm rounded"
          >
            <Image
              src={
                actor.profile_path
                  ? `${process.env.TMDB_POSTER_PATH}/w300${actor.profile_path}`
                  : "/images/portrait-placeholder.jpg"
              }
              alt={actor.name}
              width={300}
              height={300}
              className="rounded-t w-full h-auto"
            />
            <div className="p-2">
              <Link href={`/person/${actor.id}`}>
                <p className="text-gray-900 text-xs sm:text-sm font-semibold hover:text-blue-600 transition-all duration-300 line-clamp-2">
                  {actor.name}
                </p>
              </Link>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                {actor.character}
              </p>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center flex-shrink-0">
          <Link
            href={`/${type}/${id}/credits`}
            className="flex gap-1 items-center px-3 py-2 text-sm sm:text-base text-gray-900 hover:text-blue-600 transition-all duration-300 whitespace-nowrap"
          >
            View more <IoIosArrowRoundForward className="text-xl sm:text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreditsActors;
