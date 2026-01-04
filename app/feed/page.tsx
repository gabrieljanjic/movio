import getMovies from "@/lib/api/external/getMovies";
import Image from "next/image";
import { formatDate, formRating, getColorByPercentage } from "@/lib/utils";
const Feed = async () => {
  const data = await getMovies("popular", 1);
  console.log(data.results);
  return (
    <section className="grid gap-y-6 gap-x-2 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
      {data.results.map((movie: any) => (
        <div
          key={movie.id}
          className="w-44 rounded border custom-box-shadow relative cursor-pointer"
        >
          <div className="relative w-44 h-72">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="200px"
              className="object-cover rounded-t"
              priority
            />
            <div
              className={`absolute -bottom-5 left-6 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-neutral-700 ${getColorByPercentage(
                movie.vote_average * 10
              )}`}
            >
              {formRating(movie.vote_average)}
              <span className="text-[8px]">%</span>
            </div>
          </div>
          <div className="pt-6 px-2 py-2">
            <p className="font-bold">{movie.title}</p>
            <p className="text-xs">{formatDate(movie.release_date)}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Feed;
