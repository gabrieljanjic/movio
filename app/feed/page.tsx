import getMovies from "@/lib/api/external/movies/getMovies";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import RatingBadge from "@/components/RatingBadge";

const Feed = async () => {
  const data = await getMovies("popular", 1);
  console.log(data.results);
  return (
    <section className="grid gap-y-6 gap-x-2 [grid-template-columns:repeat(auto-fill,minmax(180px,180px))]">
      {data.results.map((movie: any) => (
        <div
          key={movie.id}
          className="w-44 rounded border custom-box-shadow relative cursor-pointer"
        >
          <div className="relative w-44 h-72">
            <Image
              src={`${process.env.TMDB_POSTER_PATH}/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="200px"
              className="object-cover rounded-t"
              priority
            />
            <RatingBadge movie={movie} />
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
