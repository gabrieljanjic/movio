import CreditsActors from "@/components/CreditsActors";
import getExactMovie from "@/lib/api/external/getExactMovie";
import getExactMovieCast from "@/lib/api/external/getExactMovieCast";
import { formatDate, formatTime } from "@/lib/utils";
import Image from "next/image";

const SingleMovieView = async ({ params }: { params: { id: string } }) => {
  const data = await getExactMovie(params.id);
  const dataCredits = await getExactMovieCast(params.id);
  console.log(dataCredits.cast);
  return (
    <section>
      <div className="flex gap-8 p-6">
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
            width={800}
            height={1100}
            className="rounded-xl"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjE0IiBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
          />
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
            <div className="flex gap-2 mb-2">
              {data.release_date && (
                <span>{formatDate(data.release_date)}</span>
              )}
              {data.release_date && <span>•</span>}
              {data.runtime && <span>{formatTime(data.runtime)}</span>}
            </div>
            <div className="flex mb-5">
              {data.genres.length > 0 && (
                <div className="flex gap-2">
                  {data.genres.map((genre: any) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-800"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {data.tagline && <p className="italic mb-4">{data.tagline}</p>}
            <p className="text-xl font-bold">Overview</p>
            <p className="mb-3">{data.overview}</p>
            {data.homepage && (
              <a href={data.homepage} target="_blank" className="text-blue-700">
                Official website
              </a>
            )}
          </div>
        </div>
      </div>
      <CreditsActors dataCredits={dataCredits} id={params.id} />
    </section>
  );
};

export default SingleMovieView;
