import Link from "next/link";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";

const CreditsActors = ({
  dataCredits,
  id,
}: {
  dataCredits: any;
  id: string;
}) => {
  return (
    <div className="flex flex-col p-6">
      <h2 className="text-2xl font-bold">Top Billed Cast</h2>
      <div className="flex gap-4 overflow-x-auto py-2">
        {dataCredits.cast.slice(0, 10).map((actor: any) => (
          <div
            key={actor.id}
            className="flex flex-col  min-w-[120px] custom-box-shadow-sm ms-2"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
              alt={actor.name}
              width={300}
              height={300}
            />
            <p className="px-1 font-semibold">{actor.name}</p>
            <p className="px-1 text-sm">{actor.character}</p>
          </div>
        ))}
        <div className="flex items-center justify-center ">
          <Link
            href={`/movies/${id}/credits`}
            className="flex items-center whitespace-nowrap"
          >
            View more <IoIosArrowRoundForward className="ms-1 text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreditsActors;
