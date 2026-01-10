import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

const ExactPersonKnownForComponent = ({
  data,
  id,
}: {
  data: any;
  id: string;
}) => {
  const sortedByPopularity = Array.from(
    new Map(
      data.cast.map((item: any) => [item.title || item.name, item])
    ).values()
  )
    .sort((a: any, b: any) => b.popularity - a.popularity)
    .slice(0, 10);
  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-3">Known for</h2>
      <div className="flex gap-6 overflow-x-scroll">
        {sortedByPopularity.map((cast: any) => {
          console.log("cccc", cast);
          return (
            <div key={cast.id} className="min-w-28 mb-2">
              <Image
                src={
                  cast.poster_path
                    ? `${process.env.TMDB_POSTER_PATH}/w500/${cast.poster_path}`
                    : "/images/no-image-placeholder.png"
                }
                alt={cast.title || cast.name}
                width={112}
                height={168}
                className="rounded-lg"
              />
              {cast.title && (
                <Link href={`/movies/${cast.id}`} className="hover:underline">
                  <p>{cast.title}</p>
                </Link>
              )}
              {cast.name && (
                <Link href={`/series/${cast.id}`} className="hover:underline">
                  <p>{cast.name}</p>
                </Link>
              )}
            </div>
          );
        })}
        <div className="flex items-center justify-center">
          <Link
            href={`/person/${id}/all-credits`}
            className="flex items-center whitespace-nowrap hover:underline"
          >
            View more <IoIosArrowRoundForward className="ms-1 text-xl " />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExactPersonKnownForComponent;
