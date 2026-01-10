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
              src={`${process.env.TMDB_POSTER_PATH}/w300${actor.profile_path}`}
              alt={actor.name}
              width={300}
              height={300}
              className="rounded"
            />
            <div className="p-1">
              <Link href={`/person/${actor.id}`}>
                <p className="px-1 font-semibold hover:underline">
                  {actor.name}
                </p>
              </Link>
              <p className="px-1 text-sm">{actor.character}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center ">
          <Link
            href={`/${type}/${id}/credits`}
            className="flex items-center whitespace-nowrap"
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
