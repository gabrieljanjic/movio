import Link from "next/link";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";

const CreditsActors = ({
  dataCredits,
  id,
  type,
}: {
  dataCredits: any;
  id: string;
  type: string;
}) => {
  return (
    <div className="flex flex-col p-6 bg-white">
      <h1 className="text-2xl font-semibold mb-2">Top Billed Cast</h1>
      <div className="flex gap-2 overflow-x-auto py-2">
        {dataCredits.cast.slice(0, 10).map((actor: any) => (
          <div
            key={actor.id}
            className="flex flex-col min-w-[120px] max-w-[120px] custom-box-shadow-sm ms-2 mb-1 rounded"
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
              className="rounded"
            />
            <div className="p-2">
              <Link href={`/person/${actor.id}`}>
                <p className="text-gray-900 text-sm font-semibold hover:text-blue-600 transition-all duration-300">
                  {actor.name}
                </p>
              </Link>
              <p className="text-sm text-gray-600">{actor.character}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center ">
          <Link
            href={`/${type}/${id}/credits`}
            className="ml-2 flex gap-1 items-center px-2 py-1 text-gray-900 hover:text-blue-600 transition-all duration-300 text-nowrap"
          >
            View more{" "}
            <IoIosArrowRoundForward className="ms-1 text-xl hover:underline" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreditsActors;
