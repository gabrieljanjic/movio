import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import RatingBadge from "@/components/RatingBadge";

export default function MovieCardComponent({ data }: { data: any }) {
  return (
    <section className="px-3 sm:px-4">
      <div
        className="grid justify-center place-items-center gap-6
    [grid-template-columns:repeat(auto-fit,8rem)]
    sm:[grid-template-columns:repeat(auto-fit,10rem)]
    md:[grid-template-columns:repeat(auto-fit,12rem)]
  "
      >
        {data.results.map((movie: any) => {
          return (
            <div
              key={movie.id}
              className="w-fit h-full rounded bg-gray-50 border border-gray-300 relative cursor-pointer transform transition-all duration-300 hover:scale-102 sm:hover:scale-105 overflow-hidden shadow-sm hover:shadow-md"
            >
              <Link href={`/movies/${movie.id}`} className="group">
                <div className="relative w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72">
                  <Image
                    src={
                      movie.poster_path
                        ? `${process.env.TMDB_POSTER_PATH}/w500${movie.poster_path}`
                        : "/images/no-image-placeholder.png"
                    }
                    fill
                    alt={movie.title}
                    className="object-cover rounded-t"
                  />
                  <RatingBadge voteAverage={movie.vote_average} />
                </div>
                <div className="mt-3 md:mt-2 p-2 sm:p-3">
                  <p className="font-bold text-sm sm:text-base line-clamp-2 group-hover:text-blue-500">
                    {movie.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {formatDate(movie.release_date)}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
